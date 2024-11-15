export interface Widget {
  id: string;
  type: string;
  title: string;
  icon: string;
  section: string;
  isFavorite?: boolean;
  notifications?: Notification[];
}

export interface DraggableMenuItem {
  id: string;
  label: string;
  icon: string;
  section: string;
  widgetType: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface WidgetProps {
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
  onModalOpen?: () => void;
  onModalClose?: () => void;
}