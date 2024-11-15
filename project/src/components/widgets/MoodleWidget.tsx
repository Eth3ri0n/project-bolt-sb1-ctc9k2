import React, { useState } from 'react';
import { BookOpen, ChevronRight, Clock, Calendar, FileText, Bell } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';
import MoodleModal from '../moodle/MoodleModal';

interface MoodleWidgetProps {
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function MoodleWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: MoodleWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recentCourses = [
    {
      id: '1',
      name: 'Mécanique des fluides',
      professor: 'Dr. Martin',
      lastAccessed: new Date(2024, 2, 15),
      hasNewContent: true,
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Résistance des matériaux',
      professor: 'Dr. Dubois',
      lastAccessed: new Date(2024, 2, 14),
      hasNewContent: false,
      color: 'bg-purple-500'
    },
    {
      id: '3',
      name: 'Automatique',
      professor: 'Dr. Bernard',
      lastAccessed: new Date(2024, 2, 13),
      hasNewContent: true,
      color: 'bg-green-500'
    }
  ];

  const upcomingDeadlines = [
    {
      id: '1',
      title: 'TP Mécanique des fluides',
      course: 'Mécanique des fluides',
      dueDate: new Date(2024, 2, 20),
      type: 'report'
    },
    {
      id: '2',
      title: 'Projet RDM',
      course: 'Résistance des matériaux',
      dueDate: new Date(2024, 2, 22),
      type: 'project'
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
        title="Moodle"
        icon={<BookOpen className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-orange-500 to-orange-600"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Mes cours</h4>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-medium text-sm flex items-center gap-1"
            >
              Voir tout
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recent Courses */}
          <div className="space-y-3">
            {recentCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className={`w-1 h-12 ${course.color} rounded-full`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      {course.name}
                    </h5>
                    {course.hasNewContent && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300 rounded-full">
                        Nouveau
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <span>{course.professor}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Dernier accès le {formatDate(course.lastAccessed)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300 mb-3">
              <Calendar className="w-5 h-5" />
              <h5 className="font-medium">Échéances à venir</h5>
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {deadline.title}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {deadline.course}
                      </p>
                    </div>
                  </div>
                  <span className="text-orange-600 dark:text-orange-400">
                    {formatDate(deadline.dueDate)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BaseWidget>

      <MoodleModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}