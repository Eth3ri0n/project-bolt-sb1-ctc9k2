import React, { useState } from 'react';
import { Wrench, ChevronRight, Search, Calendar, Package, Clock } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';
import EquipmentModal from '../equipment/EquipmentModal';

interface EquipmentWidgetProps {
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function EquipmentWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: EquipmentWidgetProps) {
  // Rest of the component remains exactly the same, just replace Tool with Wrench in the BaseWidget
  const [isModalOpen, setIsModalOpen] = useState(false);

  const availableEquipment = [
    {
      id: '1',
      name: 'Oscilloscope numérique',
      category: 'Électronique',
      status: 'available',
      location: 'Salle TP-E1',
      nextAvailable: new Date(2024, 2, 20),
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Kit Arduino',
      category: 'Programmation',
      status: 'borrowed',
      location: 'Salle TP-E2',
      nextAvailable: new Date(2024, 2, 22),
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=300&fit=crop',
      color: 'bg-purple-500'
    },
    {
      id: '3',
      name: 'Multimètre',
      category: 'Électronique',
      status: 'available',
      location: 'Salle TP-E1',
      nextAvailable: null,
      image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64926?w=400&h=300&fit=crop',
      color: 'bg-green-500'
    }
  ];

  const myRentals = [
    {
      id: '1',
      name: 'Kit Arduino',
      dueDate: new Date(2024, 2, 22),
      status: 'active'
    }
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          label: 'Disponible',
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
        };
      case 'borrowed':
        return {
          label: 'Emprunté',
          color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
        };
      default:
        return {
          label: status,
          color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
        };
    }
  };

  return (
    <>
      <BaseWidget
        title="Location de matériel"
        icon={<Wrench className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-amber-500 to-amber-600"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Équipements</h4>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 font-medium text-sm flex items-center gap-1"
            >
              Catalogue complet
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un équipement..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
              onClick={() => setIsModalOpen(true)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Available equipment */}
          <div className="space-y-3">
            {availableEquipment.map((equipment) => (
              <div
                key={equipment.id}
                onClick={() => setIsModalOpen(true)}
                className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <img
                  src={equipment.image}
                  alt={equipment.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white">
                        {equipment.name}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {equipment.category}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusConfig(equipment.status).color}`}>
                      {getStatusConfig(equipment.status).label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Package className="w-4 h-4" />
                      <span>{equipment.location}</span>
                    </div>
                    {equipment.nextAvailable && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>Disponible le {formatDate(equipment.nextAvailable)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* My rentals */}
          {myRentals.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 mb-3">
                <Clock className="w-5 h-5" />
                <h5 className="font-medium">Mes emprunts en cours</h5>
              </div>
              <div className="space-y-3">
                {myRentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <h6 className="font-medium text-gray-900 dark:text-white">
                        {rental.name}
                      </h6>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        À rendre le {formatDate(rental.dueDate)}
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/50 dark:hover:bg-amber-900 text-amber-700 dark:text-amber-300 rounded-lg text-sm transition-colors">
                      Prolonger
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </BaseWidget>

      <EquipmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}