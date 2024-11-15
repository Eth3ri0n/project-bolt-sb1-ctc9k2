import React, { useState } from 'react';
import { Settings, ChevronRight, User, Lock, Bell, Globe, Shield, Key } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification, WidgetProps } from '../../types/widget';
import AccountSettingsModal from '../account/AccountSettingsModal';

export default function AccountSettingsWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
  onModalOpen,
  onModalClose
}: WidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const settingsCategories = [
    {
      icon: User,
      title: 'Informations personnelles',
      description: 'Gérez vos informations de profil',
      color: 'bg-blue-500'
    },
    {
      icon: Lock,
      title: 'Sécurité',
      description: 'Mot de passe et authentification',
      color: 'bg-red-500'
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Préférences de notification',
      color: 'bg-yellow-500'
    },
    {
      icon: Globe,
      title: 'Langue et région',
      description: 'Paramètres régionaux',
      color: 'bg-green-500'
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
        title="Paramètres du compte"
        icon={<Settings className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-gray-800 to-gray-700"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          {/* Profile summary */}
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop&q=80"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="text-xl font-bold dark:text-white">Doe Eylona</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Étudiante en 2ème année
              </p>
            </div>
          </div>

          {/* Quick settings */}
          <div className="space-y-3">
            {settingsCategories.map((category, index) => (
              <button
                key={index}
                onClick={handleOpenModal}
                className="w-full flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              >
                <div className={`p-2 ${category.color} rounded-lg`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>

          {/* Account security status */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 mb-3">
              <Shield className="w-5 h-5" />
              <h5 className="font-medium">Sécurité du compte</h5>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Double authentification
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-xs">
                  Activée
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Dernière connexion
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Aujourd'hui, 10:30
                </span>
              </div>
            </div>
          </div>
        </div>
      </BaseWidget>

      <AccountSettingsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}