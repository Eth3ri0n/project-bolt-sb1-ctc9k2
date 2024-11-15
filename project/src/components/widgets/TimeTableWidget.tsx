import React from 'react';
import { Calendar } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';

interface Course {
  time: string;
  endTime: string;
  subject: string;
  professor: string;
  room?: string;
  color: string;
  isCancelled?: boolean;
}

interface TimeTableWidgetProps {
  onToggleFavorite?: () => void;
  onOpenSettings?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function TimeTableWidget({ 
  onToggleFavorite, 
  onOpenSettings,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: TimeTableWidgetProps) {
  const courses: Course[] = [
    {
      time: '11h00',
      endTime: '12h30',
      subject: 'Mathématiques',
      professor: 'Dupond',
      room: 'Amphie Z',
      color: 'bg-emerald-500'
    },
    {
      time: '12h30',
      endTime: '13h30',
      subject: 'Pas de cours',
      professor: '',
      color: 'bg-gray-600',
      isCancelled: true
    },
    {
      time: '13h30',
      endTime: '15h00',
      subject: 'Physique',
      professor: 'Martinez',
      room: '7011',
      color: 'bg-red-500'
    },
    {
      time: '15h00',
      endTime: '16h30',
      subject: 'Électricité',
      professor: 'Marchand',
      room: '7100',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <BaseWidget
      title="Emploi du temps"
      icon={<Calendar className="w-6 h-6 text-white" />}
      headerColor="bg-[#C51162] dark:bg-[#880E4F]"
      onToggleFavorite={onToggleFavorite}
      onOpenSettings={onOpenSettings}
      isFavorite={isFavorite}
      notifications={notifications}
      onShowNotifications={onShowNotifications}
      notificationBtnRef={notificationBtnRef}
    >
      <div className="space-y-6">
        <h4 className="text-2xl font-bold mb-6 dark:text-white">3 prochains cours</h4>
        
        <div className="space-y-6">
          <h5 className="text-xl font-semibold dark:text-white">Aujourd'hui</h5>
          
          <div className="space-y-4">
            {courses.map((course, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-16 text-gray-600 dark:text-gray-400 font-medium">
                  {course.time}
                </div>
                
                <div className="relative flex-1">
                  <div className={`absolute left-0 top-0 w-1 h-full ${course.color} rounded-full`} />
                  <div className="pl-4">
                    <h6 className={`font-semibold text-lg ${
                      course.isCancelled ? 'text-gray-400 dark:text-gray-500' : 'dark:text-white'
                    }`}>
                      {course.subject}
                    </h6>
                    {!course.isCancelled && (
                      <div className="text-gray-600 dark:text-gray-400 space-y-1">
                        {course.professor && <p>{course.professor}</p>}
                        {course.room && <p>{course.room}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}