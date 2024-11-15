import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronRight, Clock, MapPin, Users, Plus } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { WidgetProps } from '../../types/widget';
import CalendarModal from './calendar/CalendarModal';

interface Event {
  id: string;
  title: string;
  date: Date;
  endDate?: Date;
  location?: string;
  description?: string;
  type: 'personal' | 'school' | 'deadline';
  attendees?: string[];
  color: string;
}

export default function CalendarWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
  onModalOpen,
  onModalClose
}: WidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const events: Event[] = [
    {
      id: '1',
      title: 'Réunion de projet',
      date: new Date(2024, 2, 20, 14, 30),
      endDate: new Date(2024, 2, 20, 16, 0),
      location: 'Salle B204',
      type: 'school',
      attendees: ['Martin D.', 'Sophie B.', 'Thomas L.'],
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Rendu TP Mécanique',
      date: new Date(2024, 2, 22, 23, 59),
      type: 'deadline',
      color: 'bg-red-500'
    },
    {
      id: '3',
      title: 'Séance sport',
      date: new Date(2024, 2, 21, 18, 0),
      endDate: new Date(2024, 2, 21, 19, 30),
      location: 'Gymnase',
      type: 'personal',
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

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  const getTypeConfig = (type: Event['type']) => {
    switch (type) {
      case 'personal':
        return {
          label: 'Personnel',
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
        };
      case 'school':
        return {
          label: 'École',
          color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
        };
      case 'deadline':
        return {
          label: 'Échéance',
          color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
        };
    }
  };

  // Filter today's events
  const todayEvents = events
    .filter(event => event.date.toDateString() === new Date().toDateString())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <>
      <BaseWidget
        title="Agenda personnel"
        icon={<CalendarIcon className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-primary to-primary-light"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">
              {formatDate(new Date())}
            </h4>
            <button 
              onClick={handleOpenModal}
              className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter</span>
            </button>
          </div>

          {/* Today's events */}
          <div className="space-y-4">
            {todayEvents.length > 0 ? (
              todayEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={handleOpenModal}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-1 h-full ${event.color} rounded-full`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-900 dark:text-white">
                          {event.title}
                        </h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeConfig(event.type).color}`}>
                          {getTypeConfig(event.type).label}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>
                              {formatTime(event.date)}
                              {event.endDate && ` - ${formatTime(event.endDate)}`}
                            </span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                        {event.attendees && (
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees.length} participants</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Aucun événement aujourd'hui
              </div>
            )}
          </div>

          {/* Quick actions */}
          <button
            onClick={handleOpenModal}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 text-primary dark:text-primary-light rounded-xl transition-colors text-sm font-medium"
          >
            <CalendarIcon className="w-4 h-4" />
            <span>Voir tout le calendrier</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </BaseWidget>

      <CalendarModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedDate={selectedDate}
        events={events}
      />
    </>
  );
}