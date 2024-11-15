import React from 'react';
import { Bell, Check, Trash2, X, RotateCcw } from 'lucide-react';
import { Notification } from '../../types/widget';

interface NotificationPanelProps {
  notifications: Notification[];
  onMarkAsRead: (id?: string) => void;
  onMarkAsUnread: (id?: string) => void;
  onDelete: (id?: string) => void;
  onClose: () => void;
}

export default function NotificationPanel({
  notifications,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  onClose
}: NotificationPanelProps) {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'À l\'instant';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Il y a ${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${Math.floor(hours / 24)}j`;
  };

  return (
    <div className="notification-panel w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col max-h-[80vh]">
      {/* Fixed Header */}
      <div className="p-3 bg-gray-50 dark:bg-gray-700 flex items-center justify-between border-b border-gray-200 dark:border-gray-600 shrink-0">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4" />
          <span className="font-medium">Notifications</span>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={() => onMarkAsRead()}
              className="text-xs text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Tout marquer comme lu
            </button>
          )}
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Notifications List */}
      <div className="overflow-y-auto overscroll-contain">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            Aucune notification
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 ${
                  notification.isRead ? 'bg-white dark:bg-gray-800' : 'bg-blue-50 dark:bg-gray-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {notification.message}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
                      {getTimeAgo(notification.timestamp)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {notification.isRead ? (
                      <button
                        onClick={() => onMarkAsUnread(notification.id)}
                        className="p-1 text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400"
                        title="Marquer comme non lu"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onMarkAsRead(notification.id)}
                        className="p-1 text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400"
                        title="Marquer comme lu"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(notification.id)}
                      className="p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Footer */}
      {notifications.length > 0 && (
        <div className="p-3 bg-gray-50 dark:bg-gray-700 flex justify-end border-t border-gray-200 dark:border-gray-600 shrink-0">
          <button
            onClick={() => onDelete()}
            className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            Tout supprimer
          </button>
        </div>
      )}
    </div>
  );
}