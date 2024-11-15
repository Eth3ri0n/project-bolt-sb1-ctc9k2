import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  Info,
  Search,
  MapPin,
  Bus,
  Car,
  AlertTriangle,
  Clock,
  Calendar,
  Navigation,
  Filter,
  Map,
  List,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

interface TrafficModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrafficModal({ isOpen, onClose }: TrafficModalProps) {
  const [activeTab, setActiveTab] = useState<'map' | 'alerts' | 'buses'>('map');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Infos trafic" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'map'
                ? 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              <span>Carte</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'alerts'
                ? 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Perturbations</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('buses')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'buses'
                ? 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bus className="w-4 h-4" />
              <span>Bus</span>
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
              placeholder={
                activeTab === 'map' ? 'Rechercher une adresse...' :
                activeTab === 'alerts' ? 'Rechercher une perturbation...' :
                'Rechercher une ligne de bus...'
              }
              className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {activeTab === 'alerts' && (
            <select
              className="h-12 px-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
            >
              <option value="">Tous les types</option>
              <option value="roadwork">Travaux</option>
              <option value="accident">Accidents</option>
              <option value="closure">Routes barrées</option>
              <option value="event">Événements</option>
            </select>
          )}

          {activeTab === 'buses' && (
            <select
              className="h-12 px-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
            >
              <option value="">Toutes les lignes</option>
              <option value="T1">T1</option>
              <option value="T2">T2</option>
              <option value="T3">T3</option>
            </select>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'map' && (
            <div className="relative h-full bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden">
              <img
                src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/0.083333,43.233334,13,0/800x600@2x?access_token=YOUR_MAPBOX_TOKEN"
                alt="Carte du trafic"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Légende</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Trafic fluide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Trafic modéré</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Trafic dense</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Travaux</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bus className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Arrêt de bus</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-4">
              {/* Alert cards would go here */}
            </div>
          )}

          {activeTab === 'buses' && (
            <div className="space-y-6">
              {/* Bus line information would go here */}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}