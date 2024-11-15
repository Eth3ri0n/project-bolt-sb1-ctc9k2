import React, { useState, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import * as Icons from 'lucide-react';
import { Widget } from '../types/widget';
import TimeTableWidget from './widgets/TimeTableWidget';
import JobsWidget from './widgets/JobsWidget';
import MailWidget from './widgets/MailWidget';
import HomeworkWidget from './widgets/HomeworkWidget';
import AttendanceWidget from './widgets/AttendanceWidget';
import NotificationContainer from './notifications/NotificationContainer';
import ResultsWidget from './widgets/ResultsWidget';
import ENITInfoWidget from './widgets/ENITInfoWidget';
import ENITMapWidget from './widgets/ENITMapWidget';
import StudentLifeWidget from './widgets/StudentLifeWidget';
import MoodleWidget from './widgets/MoodleWidget';
import DirectoryWidget from './widgets/DirectoryWidget';
import DocumentsWidget from './widgets/DocumentsWidget';
import LibraryWidget from './widgets/LibraryWidget';
import CollaborationWidget from './widgets/CollaborationWidget';
import EquipmentWidget from './widgets/EquipmentWidget';
import FAQWidget from './widgets/FAQWidget';
import AccountSettingsWidget from './widgets/AccountSettingsWidget';
import HelpWidget from './widgets/HelpWidget';
import LogoutWidget from './widgets/LogoutWidget';
import RestaurantWidget from './widgets/RestaurantWidget';
import WeatherWidget from './widgets/WeatherWidget';
import SportsWidget from './widgets/SportsWidget';
import TrafficWidget from './widgets/TrafficWidget';
import ContactsWidget from './widgets/ContactsWidget';
import ParkingWidget from './widgets/ParkingWidget';
import BusWidget from './widgets/BusWidget';
import TrainWidget from './widgets/TrainWidget';
import CarpoolWidget from './widgets/CarpoolWidget';
import BikeRentalWidget from './widgets/BikeRentalWidget';
import CalendarWidget from '../components/widgets/CalendarWidget';
import StudentDealsWidget from '../components/widgets/StudentDealsWidget';

interface Props {
  widget: Widget;
  onRemove: (id: string) => void;
  onToggleFavorite: () => void;
  onNotification: (action: 'markAsRead' | 'markAsUnread' | 'delete', notificationId?: string) => void;
  isDraggingDisabled?: boolean;
  onModalOpen?: () => void;
  onModalClose?: () => void;
}

const WIDGET_COMPONENTS: Record<string, React.ComponentType<any>> = {
  homework: HomeworkWidget,
  timetable: TimeTableWidget,
  absences: AttendanceWidget,
  mail: MailWidget,
  jobs: JobsWidget,
  results: ResultsWidget,
  'enit-info': ENITInfoWidget,
  'enit-map': ENITMapWidget,
  'student-life': StudentLifeWidget,
  moodle: MoodleWidget,
  directory: DirectoryWidget,
  documents: DocumentsWidget,
  library: LibraryWidget,
  tools: CollaborationWidget,
  equipment: EquipmentWidget,
  faq: FAQWidget,
  settings: AccountSettingsWidget,
  help: HelpWidget,
  logout: LogoutWidget,
  restaurant: RestaurantWidget,
  weather: WeatherWidget,
  sports: SportsWidget,
  traffic: TrafficWidget,
  contacts: ContactsWidget,
  parking: ParkingWidget,
  bus: BusWidget,
  train: TrainWidget,
  carpool: CarpoolWidget,
  bike: BikeRentalWidget,
  calendar: CalendarWidget,
  deals: StudentDealsWidget,
};

export default function DroppableWidget({ 
  widget, 
  onRemove,
  onToggleFavorite,
  onNotification,
  isDraggingDisabled = false,
  onModalOpen,
  onModalClose
}: Props) {
  const [showNotifications, setShowNotifications] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const notificationBtnRef = useRef<HTMLButtonElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: widget.id,
    data: widget,
    disabled: isDraggingDisabled
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  const renderWidget = () => {
    const WidgetComponent = WIDGET_COMPONENTS[widget.type];
    if (WidgetComponent) {
      return (
        <WidgetComponent
          onToggleFavorite={onToggleFavorite}
          isFavorite={widget.isFavorite}
          notifications={widget.notifications || []}
          onShowNotifications={() => setShowNotifications(prev => !prev)}
          notificationBtnRef={notificationBtnRef}
          onModalOpen={onModalOpen}
          onModalClose={onModalClose}
        />
      );
    }

    // Fallback for unknown widget types
    const Icon = (Icons as any)[widget.icon] || Icons.Circle;
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Icon className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">{widget.title}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">Widget content for {widget.type}</p>
      </div>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group touch-none cursor-move"
    >
      <div ref={widgetRef} className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
        {renderWidget()}
        <NotificationContainer
          show={showNotifications}
          notifications={widget.notifications || []}
          onMarkAsRead={(id) => onNotification('markAsRead', id)}
          onMarkAsUnread={(id) => onNotification('markAsUnread', id)}
          onDelete={(id) => onNotification('delete', id)}
          onClose={() => setShowNotifications(false)}
          triggerRef={notificationBtnRef}
          parentRef={widgetRef}
        />
      </div>
      <button
        onClick={() => onRemove(widget.id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        aria-label="Remove widget"
      >
        <Icons.X className="w-4 h-4" />
      </button>
    </div>
  );
}