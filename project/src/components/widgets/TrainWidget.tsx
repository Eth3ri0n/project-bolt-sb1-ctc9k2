import React, { useState } from 'react';
import { Train, ChevronRight, Clock, MapPin, Navigation, Star, AlertCircle, Calendar, Euro } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { WidgetProps } from '../../types/widget';
import TrainModal from '../train/TrainModal';

interface TrainRoute {
  id: string;
  trainNumber: string;
  type: 'TER' | 'Intercités' | 'TGV';
  departure: {
    station: string;
    time: Date;
    platform?: string;
  };
  arrival: {
    station: string;
    time: Date;
    platform?: string;
  };
  status: 'on-time' | 'delayed' | 'cancelled';
  delay?: number;
  price?: number;
  isFavorite?: boolean;
}

export default function TrainWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
  onModalOpen,
  onModalClose
}: WidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trainRoutes: TrainRoute[] = [
    {
      id: '1',
      trainNumber: '874562',
      type: 'TER',
      departure: {
        station: 'Tarbes',
        time: new Date(2024, 2, 20, 12, 31),
        platform: '2'
      },
      arrival: {
        station: 'Toulouse',
        time: new Date(2024, 2, 20, 14, 15),
        platform: '1'
      },
      status: 'on-time',
      price: 19.80,
      isFavorite: true
    },
    {
      id: '2',
      trainNumber: '874564',
      type: 'TER',
      departure: {
        station: 'Tarbes',
        time: new Date(2024, 2, 20, 14, 45),
        platform: '1'
      },
      arrival: {
        station: 'Toulouse',
        time: new Date(2024, 2, 20, 16, 30),
        platform: '3'
      },
      status: 'delayed',
      delay: 15,
      price: 19.80
    },
    {
      id: '3',
      trainNumber: '874566',
      type: 'Intercités',
      departure: {
        station: 'Tarbes',
        time: new Date(2024, 2, 20, 16, 20),
        platform: '3'
      },
      arrival: {
        station: 'Bordeaux',
        time: new Date(2024, 2, 20, 19, 45),
        platform: '4'
      },
      status: 'cancelled',
      price: 39.00
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

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDuration = (departure: Date, arrival: Date) => {
    const diff = arrival.getTime() - departure.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h${minutes.toString().padStart(2, '0')}`;
  };

  const getStatusConfig = (status: TrainRoute['status'], delay?: number) => {
    switch (status) {
      case 'on-time':
        return {
          label: 'À l\'heure',
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
        };
      case 'delayed':
        return {
          label: `Retard ${delay}min`,
          color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
        };
      case 'cancelled':
        return {
          label: 'Supprimé',
          color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
        };
    }
  };

  return (
    <>
      <BaseWidget
        title="Horaires de train"
        icon={<Train className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-purple-700 to-purple-600"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Gare de Tarbes</h4>
            <button 
              onClick={handleOpenModal}
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium text-sm flex items-center gap-1"
            >
              Tous les trains
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Train routes */}
          <div className="space-y-4">
            {trainRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={handleOpenModal}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatTime(route.departure.time)}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Voie {route.departure.platform}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h5 className="font-semibold text-gray-900 dark:text-white">
                          {route.arrival.station}
                        </h5>
                        {route.isFavorite && (
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-sm">
                          {route.type} {route.trainNumber}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          • {formatDuration(route.departure.time, route.arrival.time)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getStatusConfig(route.status, route.delay).color
                    }`}>
                      {getStatusConfig(route.status, route.delay).label}
                    </span>
                    {route.price && route.status !== 'cancelled' && (
                      <div className="mt-2 font-medium text-gray-900 dark:text-white">
                        {route.price.toFixed(2)} €
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service alerts */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-purple-800 dark:text-purple-200 mb-3">
              <AlertCircle className="w-5 h-5" />
              <h5 className="font-medium">Info trafic</h5>
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400">
              Travaux sur la ligne Tarbes-Toulouse : certains trains peuvent subir des retards.
              Durée estimée jusqu'au 25 mars.
            </p>
          </div>
        </div>
      </BaseWidget>

      <TrainModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}