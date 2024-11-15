import React, { useState } from 'react';
import { Info, MapPin, Bus, Car, AlertTriangle, Clock, ChevronRight, Search, Navigation } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { WidgetProps } from '../../types/widget';
import TrafficModal from '../traffic/TrafficModal';

interface TrafficAlert {
  id: string;
  type: 'accident' | 'roadwork' | 'closure' | 'event';
  location: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  severity: 'low' | 'medium' | 'high';
  affectedLines?: string[];
}

interface BusLine {
  id: string;
  number: string;
  status: 'normal' | 'delayed' | 'disrupted';
  delay?: number;
  nextDeparture: Date;
  destination: string;
}

export default function TrafficWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
  onModalOpen,
  onModalClose
}: WidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const trafficAlerts: TrafficAlert[] = [
    {
      id: '1',
      type: 'roadwork',
      location: 'Avenue d\'Azereix',
      description: 'Travaux de voirie - circulation alternée',
      startTime: new Date(2024, 2, 15, 8, 0),
      endTime: new Date(2024, 2, 20, 18, 0),
      severity: 'medium',
      affectedLines: ['T1', 'T3']
    },
    {
      id: '2',
      type: 'event',
      location: 'Place de Verdun',
      description: 'Marché hebdomadaire - rues fermées',
      startTime: new Date(2024, 2, 18, 6, 0),
      endTime: new Date(2024, 2, 18, 14, 0),
      severity: 'low'
    }
  ];

  const busLines: BusLine[] = [
    {
      id: '1',
      number: 'T1',
      status: 'delayed',
      delay: 5,
      nextDeparture: new Date(Date.now() + 5 * 60000),
      destination: 'Centre-ville'
    },
    {
      id: '2',
      number: 'T3',
      status: 'normal',
      nextDeparture: new Date(Date.now() + 12 * 60000),
      destination: 'Université'
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

  const getSeverityColor = (severity: TrafficAlert['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'medium':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      case 'low':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    }
  };

  const getStatusColor = (status: BusLine['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'delayed':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
      case 'disrupted':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getTimeUntil = (date: Date) => {
    const minutes = Math.round((date.getTime() - Date.now()) / 60000);
    return `${minutes} min`;
  };

  return (
    <>
      <BaseWidget
        title="Infos trafic"
        icon={<Info className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-pink-600 to-pink-500"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">État du trafic</h4>
            <button 
              onClick={handleOpenModal}
              className="text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 font-medium text-sm flex items-center gap-1"
            >
              Voir tout
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une ligne ou une adresse..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
              onClick={handleOpenModal}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Traffic alerts */}
          <div>
            <h5 className="font-medium text-gray-900 dark:text-white mb-3">
              Perturbations en cours
            </h5>
            <div className="space-y-3">
              {trafficAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`w-5 h-5 ${
                      alert.severity === 'high' ? 'text-red-500' :
                      alert.severity === 'medium' ? 'text-orange-500' :
                      'text-yellow-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h6 className="font-medium text-gray-900 dark:text-white">
                          {alert.location}
                        </h6>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.type === 'roadwork' ? 'Travaux' :
                           alert.type === 'accident' ? 'Accident' :
                           alert.type === 'closure' ? 'Route barrée' :
                           'Événement'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {alert.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {formatTime(alert.startTime)}
                            {alert.endTime && ` - ${formatTime(alert.endTime)}`}
                          </span>
                        </div>
                        {alert.affectedLines && (
                          <div className="flex items-center gap-1">
                            <Bus className="w-4 h-4" />
                            <span>Lignes {alert.affectedLines.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bus lines */}
          <div>
            <h5 className="font-medium text-gray-900 dark:text-white mb-3">
              Prochains passages
            </h5>
            <div className="grid grid-cols-2 gap-3">
              {busLines.map((line) => (
                <div
                  key={line.id}
                  className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xl text-gray-900 dark:text-white">
                        {line.number}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(line.status)}`}>
                        {line.status === 'normal' ? 'À l\'heure' :
                         line.status === 'delayed' ? `+${line.delay} min` :
                         'Perturbé'}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {getTimeUntil(line.nextDeparture)}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTime(line.nextDeparture)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Navigation className="w-4 h-4" />
                    <span>{line.destination}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map preview */}
          <div className="relative h-48 bg-gray-100 dark:bg-gray-900 rounded-xl overflow-hidden">
            <img
              src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/0.083333,43.233334,13,0/400x200@2x?access_token=YOUR_MAPBOX_TOKEN"
              alt="Carte du trafic"
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-3 right-3 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium">
              Ouvrir la carte
            </button>
          </div>
        </div>
      </BaseWidget>

      <TrafficModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}