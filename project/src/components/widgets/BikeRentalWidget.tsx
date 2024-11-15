import React, { useState } from 'react';
import { Bike, ChevronRight, Battery, MapPin, Lock, Star, AlertCircle } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { WidgetProps } from '../../types/widget';
import BikeRentalModal from '../bike-rental/BikeRentalModal';

interface RentalVehicle {
  id: string;
  type: 'bike' | 'scooter';
  number: string;
  batteryLevel: number;
  distance: number;
  isAvailable: boolean;
  isElectric: boolean;
  location: {
    name: string;
    coordinates: [number, number];
  };
  pricePerHour: number;
  rating?: number;
  totalRides?: number;
}

export default function BikeRentalWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
  onModalOpen,
  onModalClose
}: WidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<RentalVehicle | null>(null);

  const vehicles: RentalVehicle[] = [
    {
      id: '600',
      type: 'bike',
      number: '600',
      batteryLevel: 72,
      distance: 14,
      isAvailable: true,
      isElectric: true,
      location: {
        name: 'Station ENIT',
        coordinates: [43.2333, 0.0833]
      },
      pricePerHour: 2.50,
      rating: 4.8,
      totalRides: 156
    },
    {
      id: '601',
      type: 'bike',
      number: '601',
      batteryLevel: 100,
      distance: 20,
      isAvailable: true,
      isElectric: true,
      location: {
        name: 'Place de Verdun',
        coordinates: [43.2333, 0.0833]
      },
      pricePerHour: 2.50,
      rating: 4.6,
      totalRides: 89
    },
    {
      id: '610',
      type: 'scooter',
      number: '610',
      batteryLevel: 50,
      distance: 10,
      isAvailable: true,
      isElectric: true,
      location: {
        name: 'Gare SNCF',
        coordinates: [43.2333, 0.0833]
      },
      pricePerHour: 3.50,
      rating: 4.7,
      totalRides: 234
    }
  ];

  const handleOpenModal = (vehicle?: RentalVehicle) => {
    if (vehicle) {
      setSelectedVehicle(vehicle);
    }
    setIsModalOpen(true);
    onModalOpen?.();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVehicle(null);
    onModalClose?.();
  };

  const formatDistance = (km: number) => {
    return km < 1 ? `${(km * 1000).toFixed(0)}m` : `${km.toFixed(1)}km`;
  };

  return (
    <>
      <BaseWidget
        title="Location (vélo)"
        icon={<Bike className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-violet-600 to-violet-500"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Véhicules disponibles</h4>
            <button 
              onClick={() => handleOpenModal()}
              className="text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 font-medium text-sm flex items-center gap-1"
            >
              Voir tout
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Available vehicles */}
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                onClick={() => handleOpenModal(vehicle)}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                    <Bike className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h5 className="font-semibold text-gray-900 dark:text-white">
                          {vehicle.type === 'bike' ? 'Vélo' : 'Trottinette'} #{vehicle.number}
                        </h5>
                        {vehicle.isElectric && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded text-xs">
                            Électrique
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{vehicle.rating}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({vehicle.totalRides})
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{vehicle.location.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Battery className="w-4 h-4" />
                          <span>{vehicle.batteryLevel}%</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Lock className="w-4 h-4" />
                          <span>{vehicle.isAvailable ? 'Disponible' : 'Indisponible'}</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {formatDistance(vehicle.distance)} • {vehicle.pricePerHour.toFixed(2)}€/h
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick info */}
          <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-violet-800 dark:text-violet-200 mb-3">
              <AlertCircle className="w-5 h-5" />
              <h5 className="font-medium">Comment ça marche ?</h5>
            </div>
            <div className="space-y-2 text-sm text-violet-600 dark:text-violet-400">
              <p>1. Sélectionnez un véhicule disponible</p>
              <p>2. Scannez le QR code pour déverrouiller</p>
              <p>3. Profitez de votre trajet !</p>
            </div>
          </div>
        </div>
      </BaseWidget>

      <BikeRentalModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedVehicle={selectedVehicle}
      />
    </>
  );
}