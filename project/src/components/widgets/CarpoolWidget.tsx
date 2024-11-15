import React, { useState } from 'react';
import { Car, ChevronRight, MapPin, Calendar, Clock, Users, Star, AlertCircle } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { WidgetProps } from '../../types/widget';
import CarpoolModal from '../carpool/CarpoolModal';

interface CarpoolRide {
  id: string;
  driver: {
    name: string;
    rating: number;
    totalRides: number;
    avatar?: string;
  };
  departure: {
    location: string;
    time: Date;
  };
  arrival: {
    location: string;
    time: Date;
  };
  availableSeats: number;
  totalSeats: number;
  price: number;
  status: 'available' | 'full' | 'cancelled';
  isFavorite?: boolean;
  regularTrip?: boolean;
}

export default function CarpoolWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
  onModalOpen,
  onModalClose
}: WidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const carpoolRides: CarpoolRide[] = [
    {
      id: '1',
      driver: {
        name: 'Pierre Mola',
        rating: 4.8,
        totalRides: 156,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      },
      departure: {
        location: 'ENIT',
        time: new Date(2024, 2, 20, 17, 30)
      },
      arrival: {
        location: 'Centre-ville',
        time: new Date(2024, 2, 20, 17, 45)
      },
      availableSeats: 2,
      totalSeats: 4,
      price: 2.50,
      status: 'available',
      regularTrip: true,
      isFavorite: true
    },
    {
      id: '2',
      driver: {
        name: 'Pascal Preaux',
        rating: 4.6,
        totalRides: 89,
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=32&h=32&fit=crop&crop=face'
      },
      departure: {
        location: 'ENIT',
        time: new Date(2024, 2, 20, 18, 0)
      },
      arrival: {
        location: 'Gare SNCF',
        time: new Date(2024, 2, 20, 18, 20)
      },
      availableSeats: 3,
      totalSeats: 4,
      price: 3.00,
      status: 'available'
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

  const getStatusConfig = (status: CarpoolRide['status']) => {
    switch (status) {
      case 'available':
        return {
          label: 'Disponible',
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
        };
      case 'full':
        return {
          label: 'Complet',
          color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
        };
      case 'cancelled':
        return {
          label: 'Annulé',
          color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
        };
    }
  };

  return (
    <>
      <BaseWidget
        title="Covoiturage"
        icon={<Car className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-pink-600 to-pink-500"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Trajets disponibles</h4>
            <button 
              onClick={handleOpenModal}
              className="text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 font-medium text-sm flex items-center gap-1"
            >
              Tous les trajets
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Carpool rides */}
          <div className="space-y-4">
            {carpoolRides.map((ride) => (
              <div
                key={ride.id}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={handleOpenModal}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={ride.driver.avatar}
                    alt={ride.driver.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h5 className="font-semibold text-gray-900 dark:text-white">
                          {ride.driver.name}
                        </h5>
                        {ride.isFavorite && (
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        )}
                        {ride.regularTrip && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded text-xs">
                            Régulier
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{ride.driver.rating}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({ride.driver.totalRides})
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(ride.departure.time)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{ride.departure.location}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(ride.arrival.time)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{ride.arrival.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getStatusConfig(ride.status).color
                        }`}>
                          {getStatusConfig(ride.status).label}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                          <Users className="w-4 h-4" />
                          <span>{ride.availableSeats}/{ride.totalSeats} places</span>
                        </div>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {ride.price.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-pink-800 dark:text-pink-200 mb-3">
              <AlertCircle className="w-5 h-5" />
              <h5 className="font-medium">Proposer un trajet</h5>
            </div>
            <p className="text-sm text-pink-600 dark:text-pink-400 mb-3">
              Vous faites régulièrement le trajet ENIT ↔ Centre-ville ? 
              Proposez votre trajet et partagez les frais !
            </p>
            <button className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">
              Créer une annonce
            </button>
          </div>
        </div>
      </BaseWidget>

      <CarpoolModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}