import React, { useState } from 'react';
import { Users, ChevronRight, Calendar, Trophy, Heart, Music } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';
import StudentLifeModal from '../student-life/StudentLifeModal';

interface StudentLifeWidgetProps {
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function StudentLifeWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: StudentLifeWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const upcomingEvents = [
    {
      id: '1',
      title: 'Soirée d\'intégration',
      date: new Date(2024, 2, 20),
      type: 'social',
      icon: Music,
      color: 'bg-purple-500'
    },
    {
      id: '2',
      title: 'Tournoi sportif inter-écoles',
      date: new Date(2024, 2, 25),
      type: 'sport',
      icon: Trophy,
      color: 'bg-orange-500'
    },
    {
      id: '3',
      title: 'Don du sang',
      date: new Date(2024, 3, 1),
      type: 'health',
      icon: Heart,
      color: 'bg-red-500'
    }
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  return (
    <>
      <BaseWidget
        title="Vie étudiante"
        icon={<Users className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-yellow-400 to-yellow-500"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Actualités étudiantes</h4>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 font-medium text-sm flex items-center gap-1"
            >
              Voir tout
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-3">
            {upcomingEvents.map((event) => {
              const Icon = event.icon;
              return (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className={`p-2 ${event.color} rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      {event.title}
                    </h5>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(event.date)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Links */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
            <h5 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">
              Liens rapides
            </h5>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300">
                • Bureau des Étudiants (BDE)
              </button>
              <button className="w-full text-left text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300">
                • Associations étudiantes
              </button>
              <button className="w-full text-left text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300">
                • Services de santé
              </button>
            </div>
          </div>
        </div>
      </BaseWidget>

      <StudentLifeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}