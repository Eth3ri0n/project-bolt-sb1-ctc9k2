import React, { forwardRef } from 'react';
import { Bell } from 'lucide-react';
import { Notification } from '../../types/widget';

interface NotificationBadgeProps {
  notifications: Notification[];
  onClick: () => void;
}

const NotificationBadge = forwardRef<HTMLButtonElement, NotificationBadgeProps>(
  ({ notifications, onClick }, ref) => {
    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
      <button
        ref={ref}
        onClick={onClick}
        className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
        aria-label={`${unreadCount} unread notifications`}
      >
        <Bell className="w-5 h-5 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>
    );
  }
);

NotificationBadge.displayName = 'NotificationBadge';

export default NotificationBadge;