import React, { useEffect, useRef } from 'react';
import { Notification } from '../../types/widget';
import NotificationPanel from './NotificationPanel';

interface NotificationContainerProps {
  show: boolean;
  notifications: Notification[];
  onMarkAsRead: (id?: string) => void;
  onMarkAsUnread: (id?: string) => void;
  onDelete: (id?: string) => void;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  parentRef: React.RefObject<HTMLDivElement>;
}

export default function NotificationContainer({
  show,
  notifications,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
  onClose,
  triggerRef,
  parentRef
}: NotificationContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && containerRef.current && triggerRef.current && parentRef.current) {
      const container = containerRef.current;
      const trigger = triggerRef.current;
      const parent = parentRef.current;
      const triggerRect = trigger.getBoundingClientRect();
      const parentRect = parent.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Calculate positions relative to the parent widget
      const triggerTop = triggerRect.top - parentRect.top;
      const triggerRight = parentRect.right - triggerRect.right;
      
      // Reset any previous positioning
      container.style.position = 'absolute';
      container.style.top = '';
      container.style.bottom = '';
      container.style.left = '';
      container.style.right = '';

      // Position the container relative to the trigger button
      container.style.top = `${triggerTop + triggerRect.height + 8}px`;
      container.style.right = `${triggerRight}px`;

      // Adjust vertical position if it overflows the parent
      const bottomOverflow = (triggerTop + triggerRect.height + 8 + containerRect.height) - parentRect.height;
      if (bottomOverflow > 0) {
        // Position above the trigger if there's not enough space below
        container.style.top = '';
        container.style.bottom = `${parentRect.height - triggerTop + 8}px`;
      }

      // Ensure the container doesn't overflow horizontally
      const rightOverflow = containerRect.width - (parentRect.width - triggerRight);
      if (rightOverflow > 0) {
        container.style.right = `${Math.max(8, triggerRight - rightOverflow)}px`;
      }
    }
  }, [show]);

  if (!show) return null;

  return (
    <div 
      ref={containerRef}
      className="absolute z-50"
      style={{
        opacity: show ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
      }}
    >
      <NotificationPanel
        notifications={notifications}
        onMarkAsRead={onMarkAsRead}
        onMarkAsUnread={onMarkAsUnread}
        onDelete={onDelete}
        onClose={onClose}
      />
    </div>
  );
}