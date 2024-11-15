import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  Bus,
  Search,
  MapPin,
  Clock,
  Calendar,
  Star,
  AlertTriangle,
  Navigation,
  Map,
  List,
  Filter,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

interface BusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BusModal({ isOpen, onClose }: BusModalProps) {
  const [activeTab, setActiveTab] = useState<'map' | 'schedule' | 'alerts'>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLine, setSelectedLine] = useState<string>('');

  const lines = [
    { id: 'T1', name: 'T1', color: 'bg-blue-500' },
    { id: 'T2', name: 'T2', color: 'bg-pink-500' },
    { id: 'T3', name: 'T3', color: 'bg-orange-500' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Horaires de bus" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'map'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              <span>Carte</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'schedule'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Horaires</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'alerts'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Perturbations</span>
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
              placeholder="Rechercher un arrêt..."
              className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <select
            value={selectedLine}
            onChange={(e) => setSelectedLine(e.target.value)}
            className="h-12 px-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
          >
            <option value="">Toutes les lignes</option>
            {lines.map((line) => (
              <option key={line.id} value={line.id}>
                Ligne {line.name}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'map' && (
            <div className="relative h-full bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden">
              <img
                src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/0.083333,43.233334,13,0/800x600@2x?access_token=YOUR_MAPBOX_TOKEN"
                alt="Carte des lignes de bus"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Légende</h3>
                <div className="space-y-2">
                  {lines.map((line) => (
                    <div key={line.id} className="flex items-center gap-2">
                      <div className={`w-4 h-4 ${line.color} rounded-full`}></div>
                      <span className="text-sm">Ligne {line.name}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <Bus className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Arrêt de bus</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-6">
              {lines.map((line) => (
                <div key={line.id} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${line.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                      {line.name}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Ligne {line.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        ENIT ↔ Centre-ville
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            ENIT
                          </h4>
                          <p className="text-sm text-gray-500">Direction Centre-ville</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Prochain départ:
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">
                          5 min
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <h3 className="font-medium text-red-900 dark:text-red-100">
                    Perturbation en cours
                  </h3>
                </div>
                <p className="text-red-600 dark:text-red-400">
                  Ligne T1 : Travaux sur la voirie. Circulation perturbée entre Arsenal et Gare SNCF.
                  Reprise estimée : 18h00
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}