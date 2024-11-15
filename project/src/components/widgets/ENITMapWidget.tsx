import React, { useState } from 'react';
import { MapPin, ChevronRight, Building2, Navigation, Search } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';
import ENITMapModal from '../enit-map/ENITMapModal';

interface ENITMapWidgetProps {
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function ENITMapWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: ENITMapWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quickAccess = [
    {
      name: 'Amphithéâtre Z',
      location: 'Bâtiment Z - RDC',
      type: 'Amphithéâtre',
      color: 'bg-blue-500'
    },
    {
      name: 'Bibliothèque',
      location: 'Bâtiment A - 1er étage',
      type: 'Service',
      color: 'bg-purple-500'
    },
    {
      name: 'Cafétéria',
      location: 'Bâtiment C - RDC',
      type: 'Service',
      color: 'bg-orange-500'
    },
    {
      name: 'Administration',
      location: 'Bâtiment A - RDC',
      type: 'Service',
      color: 'bg-green-500'
    }
  ];

  return (
    <>
      <BaseWidget
        title="Plan de l'ENIT"
        icon={<MapPin className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-red-600 to-red-700"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Navigation du campus</h4>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm flex items-center gap-1"
            >
              Plan détaillé
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un lieu..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent"
              onClick={() => setIsModalOpen(true)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Quick access locations */}
          <div className="space-y-3">
            {quickAccess.map((place, index) => (
              <div
                key={index}
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className={`w-1 h-12 ${place.color} rounded-full`} />
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white">
                    {place.name}
                  </h5>
                  <div className="flex items-center gap-2 mt-1">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {place.location}
                    </span>
                  </div>
                </div>
                <button className="ml-auto p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <Navigation className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </BaseWidget>

      <ENITMapModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}