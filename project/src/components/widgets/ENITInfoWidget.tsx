import React, { useState } from 'react';
import { School, ChevronRight, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification, WidgetProps } from '../../types/widget';
import ENITInfoModal from '../enit/ENITInfoModal';

export default function ENITInfoWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
  onModalOpen,
  onModalClose
}: WidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quickInfo = [
    {
      icon: MapPin,
      label: 'Adresse',
      value: '47 Avenue d\'Azereix, 65000 Tarbes'
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '05 62 44 27 00'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@enit.fr'
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

  return (
    <>
      <BaseWidget
        title="Information ENIT"
        icon={
          <div className="bg-white/20 rounded-lg p-1.5">
            <School className="w-6 h-6 text-white" />
          </div>
        }
        headerColor="bg-gradient-to-r from-[#004D6A] to-[#003144]"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">École Nationale d'Ingénieurs de Tarbes</h4>
            <button 
              onClick={handleOpenModal}
              className="text-primary hover:text-primary/90 dark:text-primary-light dark:hover:text-primary-light/90 font-medium text-sm flex items-center gap-1"
            >
              En savoir plus
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickInfo.map((info, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                    <info.icon className="w-5 h-5 text-primary dark:text-primary-light" />
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white">
                      {info.label}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {info.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4">
            <div className="flex items-center gap-2 text-primary dark:text-primary-light mb-2">
              <Calendar className="w-5 h-5" />
              <h5 className="font-medium">Prochains événements</h5>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-primary/80 dark:text-primary-light/80">
                • Journée Portes Ouvertes - 15 mars 2024
              </p>
              <p className="text-sm text-primary/80 dark:text-primary-light/80">
                • Forum Entreprises - 22 mars 2024
              </p>
            </div>
          </div>
        </div>
      </BaseWidget>

      <ENITInfoModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}