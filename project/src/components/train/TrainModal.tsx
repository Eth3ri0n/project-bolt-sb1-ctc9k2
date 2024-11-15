import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  Train,
  Search,
  MapPin,
  Clock,
  Calendar,
  Star,
  AlertTriangle,
  Navigation,
  Euro,
  Filter,
  ChevronRight,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

interface TrainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrainModal({ isOpen, onClose }: TrainModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState<'1' | '2'>('2');

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Horaires de train" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Search form */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Départ
              </label>
              <input
                type="text"
                value="Tarbes"
                className="w-full h-12 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Arrivée
              </label>
              <input
                type="text"
                value="Toulouse"
                className="w-full h-12 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="w-full h-12 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Classe
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedClass('2')}
                  className={`flex-1 h-12 rounded-lg font-medium transition-colors ${
                    selectedClass === '2'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  2nde classe
                </button>
                <button
                  onClick={() => setSelectedClass('1')}
                  className={`flex-1 h-12 rounded-lg font-medium transition-colors ${
                    selectedClass === '1'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  1ère classe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {/* Journey summary */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Tarbes <ArrowRight className="inline w-5 h-5" /> Toulouse
                </h3>
                <span className="text-gray-500 dark:text-gray-400">
                  {formatDate(selectedDate)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Filter className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Train list */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">12:31</span>
                    <span className="text-sm text-gray-500">Voie 2</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">Toulouse</span>
                    <span className="text-sm text-gray-500">1h44 • Direct</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm">
                    À l'heure
                  </span>
                  <div className="mt-2 font-medium text-gray-900 dark:text-white">
                    19,80 €
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                  TER 874562
                </span>
                <span>• Places disponibles</span>
              </div>
            </div>

            {/* Service disruption */}
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <h3 className="font-medium text-red-900 dark:text-red-100">
                  Perturbation
                </h3>
              </div>
              <p className="text-red-600 dark:text-red-400">
                En raison de travaux sur les voies, des retards sont à prévoir sur cette ligne.
                Durée estimée jusqu'au 25 mars.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}