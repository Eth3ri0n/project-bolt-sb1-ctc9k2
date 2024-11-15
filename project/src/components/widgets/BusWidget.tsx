import React, { useState } from 'react';
import { Bus, ChevronRight, Clock, MapPin, Navigation, Star, AlertCircle } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { WidgetProps } from '../../types/widget';
import BusModal from '../bus/BusModal';

interface BusLine {
  id: string;
  number: string;
  color: string;
  destination: string;
  nextDeparture: Date;
  status: 'on-time' | 'delayed' | 'disrupted';
  delay?: number;
  stopName: string;
  distance: number;
  isFavorite?: boolean;
}

export default function BusWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
  onModalOpen,
  onModalClose
}: WidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const busLines: BusLine[] = [
    {
      id: '1',
      number: 'T3',
      color: 'bg-orange-500',
      destination: 'ENIT',
      nextDeparture: new Date(Date.now() + 7 * 60000),
      status: 'on-time',
      stopName: 'Université',
      distance: 150,
      isFavorite: true
    },
    {
      id: '2',
      number: 'T2',
      color: 'bg-pink-500',
      destination: 'Centre-ville',
      nextDeparture: new Date(Date.now() + 3 * 60000),
      status: 'delayed',
      delay: 5,
      stopName: 'ENIT',
      distance: 50,
      isFavorite: true
    },
    {
      id: '3',
      number: 'T1',
      color: 'bg-blue-500',
      destination: 'Gare SNCF',
      nextDeparture: new Date(Date.now() + 15 * 60000),
      status: 'disrupted',
      stopName: 'Arsenal',
      distance: 300
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

  const getTimeUntil = (date: Date) => {
    const minutes = Math.round((date.getTime() - Date.now()) / 60000);
    return `${minutes} min`;
  };

  const getStatusConfig = (status: BusLine['status'], delay?: number) => {
    switch (status) {
      case 'on-time':
        return {
          label: 'À l\'heure',
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
        };
      case 'delayed':
        return {
          label: `+${delay} min`,
          color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
        };
      case 'disrupted':
        return {
          label: 'Perturbé',
          color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
        };
    }
  };

  return (
    <>
      <BaseWidget
        title="Horaires de bus"
        icon={<Bus className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-blue-700 to-blue-600"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Prochains passages</h4>
            <button 
              onClick={handleOpenModal}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1"
            >
              Tous les horaires
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Bus lines */}
          <div className="space-y-4">
            {busLines.map((line) => (
              <div
                key={line.id}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={handleOpenModal}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${line.color} rounded-xl flex items-center justify-center text-white font-bold text-xl`}>
                      {line.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-semibold text-gray-900 dark:text-white">
                          {line.destination}
                        </h5>
                        {line.isFavorite && (
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Arrêt {line.stopName}
                        </span>
                        <span className="text-sm text-gray-400 dark:text-gray-500">
                          • {line.distance}m
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {getTimeUntil(line.nextDeparture)}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      getStatusConfig(line.status, line.delay).color
                    }`}>
                      {getStatusConfig(line.status, line.delay).label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Service status */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200 mb-3">
              <AlertCircle className="w-5 h-5" />
              <h5 className="font-medium">Info trafic</h5>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Travaux sur la ligne T1 : circulation perturbée entre Arsenal et Gare SNCF jusqu'à 18h.
            </p>
          </div>
        </div>
      </BaseWidget>

      <BusModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}