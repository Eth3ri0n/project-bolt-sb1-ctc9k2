import React, { forwardRef } from 'react';
import { Star, Settings } from 'lucide-react';
import NotificationBadge from '../notifications/NotificationBadge';
import { Notification } from '../../types/widget';

interface BaseWidgetProps {
  title: string;
  icon: React.ReactNode;
  headerColor: string;
  onToggleFavorite?: () => void;
  onOpenSettings?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
  children: React.ReactNode;
}

export default function BaseWidget({
  title,
  icon,
  headerColor,
  onToggleFavorite,
  onOpenSettings,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
  children
}: BaseWidgetProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
      <div className={`${headerColor} text-white p-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full p-2">
            {icon}
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <NotificationBadge
            ref={notificationBtnRef}
            notifications={notifications}
            onClick={onShowNotifications}
          />
          <button 
            onClick={onToggleFavorite}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Toggle favorite"
          >
            <Star className={`w-5 h-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white'}`} />
          </button>
          <button 
            onClick={onOpenSettings}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Open settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}