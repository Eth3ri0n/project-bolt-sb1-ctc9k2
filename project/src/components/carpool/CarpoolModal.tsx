import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  Car,
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
  Users,
  ArrowRight
} from 'lucide-react';

interface CarpoolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CarpoolModal({ isOpen, onClose }: CarpoolModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showRegularOnly, setShowRegularOnly] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Covoiturage" size="xl">
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
                value="ENIT"
                className="w-full h-12 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Arrivée
              </label>
              <input
                type="text"
                value="Centre-ville"
                className="w-full h-12 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
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
                className="w-full h-12 px-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Options
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRegularOnly(!showRegularOnly)}
                  className={`flex-1 h-12 rounded-lg font-medium transition-colors ${
                    showRegularOnly
                      ? 'bg-pink-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  Trajets réguliers
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
                  ENIT <ArrowRight className="inline w-5 h-5" /> Centre-ville
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

            {/* Example ride */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
                  alt="Driver"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Pierre Mola
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">4.8</span>
                          <span className="text-sm text-gray-500">(156)</span>
                        </div>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded text-xs">
                          Trajet régulier
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        2,50 €
                      </div>
                      <div className="text-sm text-gray-500">par personne</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Départ à 17:30
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          ENIT
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Arrivée à 17:45
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Centre-ville
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm">
                        Disponible
                      </span>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>2/4 places</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">
                      Réserver
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Create ride CTA */}
            <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Car className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                <h3 className="font-medium text-pink-900 dark:text-pink-100">
                  Aucun autre trajet disponible
                </h3>
              </div>
              <p className="text-pink-600 dark:text-pink-400 mb-4">
                Proposez votre trajet et partagez les frais avec d'autres étudiants !
              </p>
              <button className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">
                Créer une annonce
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}