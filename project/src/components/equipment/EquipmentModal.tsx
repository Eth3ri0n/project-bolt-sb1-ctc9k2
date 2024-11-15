import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  Tool,
  Search,
  Filter,
  Package,
  Calendar,
  Clock,
  Grid,
  List,
  History,
  Settings
} from 'lucide-react';
import EquipmentList from './EquipmentList';
import EquipmentGrid from './EquipmentGrid';
import RentalHistory from './RentalHistory';

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EquipmentModal({ isOpen, onClose }: EquipmentModalProps) {
  const [activeTab, setActiveTab] = useState<'catalog' | 'rentals' | 'history'>('catalog');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const equipment = [
    {
      id: '1',
      name: 'Oscilloscope numérique',
      category: 'Électronique',
      description: 'Oscilloscope numérique 100MHz avec écran couleur',
      status: 'available',
      location: 'Salle TP-E1',
      nextAvailable: new Date(2024, 2, 20),
      specifications: {
        brand: 'Tektronix',
        model: 'TBS1000',
        bandwidth: '100 MHz',
        channels: 2
      },
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Kit Arduino',
      category: 'Programmation',
      description: 'Kit Arduino Uno R3 avec composants de base',
      status: 'borrowed',
      location: 'Salle TP-E2',
      nextAvailable: new Date(2024, 2, 22),
      specifications: {
        brand: 'Arduino',
        model: 'Uno R3',
        components: ['Carte Arduino', 'Breadboard', 'LEDs', 'Résistances']
      },
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=300&fit=crop',
      color: 'bg-purple-500'
    },
    {
      id: '3',
      name: 'Multimètre',
      category: 'Électronique',
      description: 'Multimètre numérique de précision',
      status: 'available',
      location: 'Salle TP-E1',
      nextAvailable: null,
      specifications: {
        brand: 'Fluke',
        model: '87V',
        precision: '0.05%',
        features: ['True RMS', 'Température', 'Capacité']
      },
      image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64926?w=400&h=300&fit=crop',
      color: 'bg-green-500'
    }
  ];

  const categories = [
    { id: '1', name: 'Électronique', count: 15 },
    { id: '2', name: 'Programmation', count: 8 },
    { id: '3', name: 'Mécanique', count: 12 },
    { id: '4', name: 'Mesure', count: 10 }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Location de matériel" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'catalog'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span>Catalogue</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('rentals')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'rentals'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Mes emprunts</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'history'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-100'
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
        {activeTab === 'catalog' && (
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un équipement..."
                className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 px-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400'
                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400'
                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'catalog' && viewMode === 'list' && (
            <EquipmentList 
              equipment={equipment}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          )}

          {activeTab === 'catalog' && viewMode === 'grid' && (
            <EquipmentGrid 
              equipment={equipment}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          )}

          {activeTab === 'rentals' && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Emprunts en cours à venir...
            </div>
          )}

          {activeTab === 'history' && (
            <RentalHistory />
          )}
        </div>
      </div>
    </Modal>
  );
}