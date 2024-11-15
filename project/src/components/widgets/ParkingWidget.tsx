import React, { useState } from 'react';
import { Car, ChevronRight, MapPin, Clock, AlertTriangle, Navigation, Percent } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { WidgetProps } from '../../types/widget';
import ParkingModal from '../parking/ParkingModal';

interface ParkingLot {
  id: string;
  name: string;
  location: string;
  totalSpaces: number;
  availableSpaces: number;
  type: 'student' | 'staff' | 'visitor';
  distance: number; // in meters
  restrictions?: string[];
  openingHours: string;
  isFavorite?: boolean;
  lastUpdated: Date;
}

export default function ParkingWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
  onModalOpen,
  onModalClose
}: WidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const parkingLots: ParkingLot[] = [
    {
      id: '1',
      name: 'Parking Nord',
      location: 'Avenue d\'Azereix',
      totalSpaces: 150,
      availableSpaces: 45,
      type: 'student',
      distance: 250,
      openingHours: '7h00-20h00',
      lastUpdated: new Date(),
      isFavorite: true
    },
    {
      id: '2',
      name: 'Parking Sud',
      location: 'Rue des Forges',
      totalSpaces: 80,
      availableSpaces: 12,
      type: 'student',
      distance: 400,
      restrictions: ['Badge requis'],
      openingHours: '7h00-20h00',
      lastUpdated: new Date()
    },
    {
      id: '3',
      name: 'Parking Est',
      location: 'Boulevard du Président Kennedy',
      totalSpaces: 100,
      availableSpaces: 68,
      type: 'student',
      distance: 350,
      openingHours: '7h00-20h00',
      lastUpdated: new Date()
    }
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
    onModalOpen?.();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onModalClose?.();
  };

  const getOccupancyColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 30) return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    if (percentage > 10) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
  };

  const formatDistance = (meters: number) => {
    return meters < 1000 ? `${meters}m` : `${(meters / 1000).toFixed(1)}km`;
  };

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((new Date().getTime() - date.getTime()) / 60000);
    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes}min`;
    return `Il y a ${Math.floor(minutes / 60)}h`;
  };

  return (
    <>
      <BaseWidget
        title="Places de parking"
        icon={<Car className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-slate-700 to-slate-600"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Parkings disponibles</h4>
            <button 
              onClick={handleOpenModal}
              className="text-slate-600 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 font-medium text-sm flex items-center gap-1"
            >
              Voir tout
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Overall status */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Places libres</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {parkingLots.reduce((sum, lot) => sum + lot.availableSpaces, 0)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total places</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {parkingLots.reduce((sum, lot) => sum + lot.totalSpaces, 0)}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Taux occupation</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {Math.round((1 - parkingLots.reduce((sum, lot) => sum + lot.availableSpaces, 0) / 
                  parkingLots.reduce((sum, lot) => sum + lot.totalSpaces, 0)) * 100)}%
              </div>
            </div>
          </div>

          {/* Parking lots list */}
          <div className="space-y-4">
            {parkingLots.map((lot) => (
              <div
                key={lot.id}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={handleOpenModal}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        {lot.name}
                        {lot.isFavorite && (
                          <span className="text-yellow-500">★</span>
                        )}
                      </h5>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        getOccupancyColor(lot.availableSpaces, lot.totalSpaces)
                      }`}>
                        {lot.availableSpaces} places
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{lot.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{lot.openingHours}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Navigation className="w-4 h-4" />
                          <span>{formatDistance(lot.distance)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Percent className="w-4 h-4" />
                          <span>{Math.round((lot.availableSpaces / lot.totalSpaces) * 100)}% libre</span>
                        </div>
                      </div>
                    </div>

                    {lot.restrictions && (
                      <div className="mt-2 flex items-start gap-2 text-sm text-amber-600 dark:text-amber-400">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{lot.restrictions.join(', ')}</span>
                      </div>
                    )}

                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Mis à jour {formatTimeAgo(lot.lastUpdated)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map preview */}
          <div className="relative h-48 bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden">
            <img
              src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/0.083333,43.233334,15,0/400x200@2x?access_token=YOUR_MAPBOX_TOKEN"
              alt="Carte des parkings"
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-3 right-3 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
              Ouvrir la carte
            </button>
          </div>
        </div>
      </BaseWidget>

      <ParkingModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}