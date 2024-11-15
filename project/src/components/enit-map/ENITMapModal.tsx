import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  MapPin,
  Search,
  Building2,
  Navigation,
  Layers,
  Info,
  ChevronRight,
  Wifi,
  Coffee,
  Library,
  Users,
  Printer,
  Utensils
} from 'lucide-react';
import LocationList from './LocationList';
import FloorSelector from './FloorSelector';
import MapLegend from './MapLegend';

interface ENITMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ENITMapModal({ isOpen, onClose }: ENITMapModalProps) {
  const [activeTab, setActiveTab] = useState<'map' | 'list' | 'info'>('map');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('');
  const [selectedFloor, setSelectedFloor] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const buildings = [
    { id: 'A', name: 'Bâtiment A', description: 'Administration et services' },
    { id: 'B', name: 'Bâtiment B', description: 'Salles de cours' },
    { id: 'C', name: 'Bâtiment C', description: 'Laboratoires' },
    { id: 'Z', name: 'Bâtiment Z', description: 'Amphithéâtres' }
  ];

  const locations = [
    {
      id: '1',
      name: 'Amphithéâtre Z',
      building: 'Z',
      floor: 0,
      type: 'classroom',
      icon: Users,
      description: 'Amphithéâtre principal, capacité 300 places'
    },
    {
      id: '2',
      name: 'Bibliothèque',
      building: 'A',
      floor: 1,
      type: 'service',
      icon: Library,
      description: 'Bibliothèque universitaire'
    },
    {
      id: '3',
      name: 'Cafétéria',
      building: 'C',
      floor: 0,
      type: 'service',
      icon: Coffee,
      description: 'Espace de restauration'
    },
    {
      id: '4',
      name: 'Reprographie',
      building: 'B',
      floor: 0,
      type: 'service',
      icon: Printer,
      description: 'Service d\'impression et photocopies'
    }
  ];

  const amenities = [
    { icon: Wifi, label: 'Points WiFi' },
    { icon: Coffee, label: 'Distributeurs' },
    { icon: Utensils, label: 'Restauration' },
    { icon: Printer, label: 'Impression' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Plan de l'ENIT" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('map')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'map'
                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Plan</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'list'
                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Recherche</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'info'
                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>Infos</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'map' && (
            <div className="flex gap-6">
              {/* Left sidebar */}
              <div className="w-64 shrink-0 space-y-6">
                {/* Building selector */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Bâtiments
                  </h3>
                  <div className="space-y-2">
                    {buildings.map((building) => (
                      <button
                        key={building.id}
                        onClick={() => setSelectedBuilding(building.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          selectedBuilding === building.id
                            ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Building2 className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">{building.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {building.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Floor selector */}
                {selectedBuilding && (
                  <FloorSelector
                    selectedFloor={selectedFloor}
                    onFloorChange={setSelectedFloor}
                  />
                )}

                {/* Legend */}
                <MapLegend />
              </div>

              {/* Map area */}
              <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                <div className="aspect-square w-full bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Plan interactif ici
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'list' && (
            <div className="space-y-6">
              {/* Search input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un lieu, une salle..."
                  className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Location list */}
              <LocationList 
                locations={locations}
                searchQuery={searchQuery}
                onLocationSelect={(id) => {
                  setActiveTab('map');
                  // Additional logic to focus the location on the map
                }}
              />
            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Amenities */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Services disponibles
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg"
                    >
                      <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <amenity.icon className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Access information */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Accès
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Transports</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Bus : Lignes T1, T2 - Arrêt "ENIT"<br />
                      Parking : Places disponibles devant les bâtiments A et C
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Horaires d'ouverture</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Lundi - Vendredi : 7h30 - 19h30<br />
                      Samedi : 8h00 - 12h00 (Bibliothèque uniquement)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}