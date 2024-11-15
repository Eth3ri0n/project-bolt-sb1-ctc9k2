import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  Car,
  Search,
  MapPin,
  Clock,
  Filter,
  Map,
  List,
  ChevronRight,
  AlertTriangle,
  Navigation,
  Star,
  History,
  Calendar
} from 'lucide-react';

interface ParkingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ParkingModal({ isOpen, onClose }: ParkingModalProps) {
  const [activeTab, setActiveTab] = useState<'map' | 'list' | 'history'>('map');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'student' | 'staff' | 'visitor'>('all');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Places de parking" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'map'
                ? 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-100'
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
                ? 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-100'
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
                ? 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-100'
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
              placeholder="Rechercher un parking..."
              className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as 'all' | 'student' | 'staff' | 'visitor')}
            className="h-12 px-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-transparent"
          >
            <option value="all">Tous les parkings</option>
            <option value="student">Étudiants</option>
            <option value="staff">Personnel</option>
            <option value="visitor">Visiteurs</option>
          </select>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'map' && (
            <div className="relative h-full bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden">
              <img
                src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/0.083333,43.233334,15,0/800x600@2x?access_token=YOUR_MAPBOX_TOKEN"
                alt="Carte des parkings"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Légende</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Disponible (&gt;30%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Limité (10-30%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Complet (&lt;10%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Favori</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'list' && (
            <div className="space-y-4">
              {/* Parking list would go here */}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              {/* Occupancy history charts would go here */}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}