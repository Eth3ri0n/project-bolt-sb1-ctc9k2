import React from 'react';
import { LogOut, AlertTriangle } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';

interface LogoutWidgetProps {
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function LogoutWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: LogoutWidgetProps) {
  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
  };

  return (
    <BaseWidget
      title="Se déconnecter"
      icon={<LogOut className="w-6 h-6 text-white" />}
      headerColor="bg-gradient-to-r from-gray-700 to-gray-600"
      onToggleFavorite={onToggleFavorite}
      isFavorite={isFavorite}
      notifications={notifications}
      onShowNotifications={onShowNotifications}
      notificationBtnRef={notificationBtnRef}
    >
      <div className="space-y-6">
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-900 dark:text-amber-100 mb-1">
                Confirmation de déconnexion
              </h3>
              <p className="text-sm text-amber-600 dark:text-amber-400">
                Êtes-vous sûr de vouloir vous déconnecter ? Toutes les données non enregistrées seront perdues.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Se déconnecter</span>
          </button>
        </div>
      </div>
    </BaseWidget>
  );
}