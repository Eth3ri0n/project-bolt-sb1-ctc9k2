import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  Bike,
  Search,
  MapPin,
  Battery,
  Lock,
  Star,
  History,
  Calendar,
  Clock,
  QrCode,
  Navigation,
  Filter,
  Map,
  List,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

interface RentalVehicle {
  id: string;
  type: 'bike' | 'scooter';
  number: string;
  batteryLevel: number;
  distance: number;
  isAvailable: boolean;
  isElectric: boolean;
  location: {
    name: string;
    coordinates: [number, number];
  };
  pricePerHour: number;
  rating?: number;
  totalRides?: number;
}

interface BikeRentalModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedVehicle: RentalVehicle | null;
}

export default function BikeRentalModal({ 
  isOpen, 
  onClose,
  selectedVehicle 
}: BikeRentalModalProps) {
  const [activeTab, setActiveTab] = useState<'map' | 'list' | 'history'>('map');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'bike' | 'scooter'>('all');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Location de vélos" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'map'
                ? 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              <span>Carte</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'list'
                ? 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <List className="w-4 h-4" />
              <span>Liste</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'history'
                ? 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <History className="w-4 h-4" />
              <span>Historique</span>
            </div>
          </button>
        </div>

        {/* Search and filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une station..."
              className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as 'all' | 'bike' | 'scooter')}
            className="h-12 px-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:focus:ring-violet-400 focus:border-transparent"
          >
            <option value="all">Tous les véhicules</option>
            <option value="bike">Vélos uniquement</option>
            <option value="scooter">Trottinettes uniquement</option>
          </select>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'map' && (
            <div className="relative h-full bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden">
              <img
                src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/0.083333,43.233334,13,0/800x600@2x?access_token=YOUR_MAPBOX_TOKEN"
                alt="Carte des stations"
                className="w-full h-full object-cover"
              />
              {selectedVehicle && (
                <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                      <Bike className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {selectedVehicle.type === 'bike' ? 'Vélo' : 'Trottinette'} #{selectedVehicle.number}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Battery className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {selectedVehicle.batteryLevel}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            {selectedVehicle.location.name}
                          </span>
                        </div>
                        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors">
                          Louer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'list' && (
            <div className="space-y-4">
              {/* Vehicle list would go here */}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              {/* Rental history would go here */}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}