import React, { useState } from 'react';
import { Share2, ChevronRight, Users, MessageSquare, Calendar, Video } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';
import CollaborationModal from '../collaboration/CollaborationModal';
import { TeamsIcon, OneDriveIcon } from '../icons/MicrosoftIcons';

interface CollaborationWidgetProps {
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function CollaborationWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: CollaborationWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quickTools = [
    {
      name: 'Teams',
      icon: TeamsIcon,
      description: 'Réunions et discussions',
      notifications: 3,
      color: 'bg-[#464EB8]',
      isCustomIcon: true
    },
    {
      name: 'OneDrive',
      icon: OneDriveIcon,
      description: 'Fichiers partagés',
      notifications: 1,
      color: 'bg-[#0364B8]',
      isCustomIcon: true
    },
    {
      name: 'Groupes de projet',
      icon: Users,
      description: '4 groupes actifs',
      notifications: 2,
      color: 'bg-emerald-500'
    }
  ];

  const upcomingMeetings = [
    {
      id: '1',
      title: 'Réunion de projet - Groupe 3',
      date: new Date(2024, 2, 20, 14, 30),
      type: 'teams',
      participants: 6
    },
    {
      id: '2',
      title: 'Point d\'avancement TP',
      date: new Date(2024, 2, 21, 10, 0),
      type: 'teams',
      participants: 4
    }
  ];

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <>
      <BaseWidget
        title="Outils de collaboration"
        icon={<Share2 className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-yellow-400 to-yellow-500"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Outils disponibles</h4>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300 font-medium text-sm flex items-center gap-1"
            >
              Voir tout
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick access tools */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickTools.map((tool, index) => (
              <button
                key={index}
                onClick={() => setIsModalOpen(true)}
                className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative group"
              >
                <div className={`p-3 ${tool.color} rounded-xl mb-3`}>
                  {tool.isCustomIcon ? (
                    <tool.icon />
                  ) : (
                    <tool.icon className="w-6 h-6 text-white" />
                  )}
                </div>
                <h5 className="font-semibold text-gray-900 dark:text-white">
                  {tool.name}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {tool.description}
                </p>
                {tool.notifications > 0 && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {tool.notifications}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Upcoming meetings */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200 mb-3">
              <Calendar className="w-5 h-5" />
              <h5 className="font-medium">Prochaines réunions</h5>
            </div>
            <div className="space-y-3">
              {upcomingMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                    <div>
                      <h6 className="font-medium text-gray-900 dark:text-white">
                        {meeting.title}
                      </h6>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                        <span>{formatTime(meeting.date)}</span>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{meeting.participants} participants</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/50 dark:hover:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-lg text-sm transition-colors">
                    Rejoindre
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BaseWidget>

      <CollaborationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}