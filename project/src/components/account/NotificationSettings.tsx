import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Calendar, BookOpen, Clock } from 'lucide-react';

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: {
      absences: true,
      grades: true,
      homework: true,
      events: false
    },
    push: {
      absences: true,
      grades: false,
      homework: true,
      events: true
    }
  });

  const handleToggle = (channel: 'email' | 'push', type: string) => {
    setNotifications(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: !prev[channel][type as keyof typeof prev.email]
      }
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Email notifications */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Notifications par email
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Envoyées à {notifications.email ? 'doe.eylona@enit.student.fr' : ''}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications.email).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {key === 'absences' && <Clock className="w-5 h-5 text-gray-400" />}
                {key === 'grades' && <BookOpen className="w-5 h-5 text-gray-400" />}
                {key === 'homework' && <Calendar className="w-5 h-5 text-gray-400" />}
                {key === 'events' && <Bell className="w-5 h-5 text-gray-400" />}
                <span className="text-gray-700 dark:text-gray-300">
                  {key === 'absences' && 'Absences et retards'}
                  {key === 'grades' && 'Nouvelles notes'}
                  {key === 'homework' && 'Devoirs à rendre'}
                  {key === 'events' && 'Événements'}
                </span>
              </div>
              <button
                onClick={() => handleToggle('email', key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Push notifications */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Notifications push
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sur votre navigateur et appareil mobile
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications.push).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {key === 'absences' && <Clock className="w-5 h-5 text-gray-400" />}
                {key === 'grades' && <BookOpen className="w-5 h-5 text-gray-400" />}
                {key === 'homework' && <Calendar className="w-5 h-5 text-gray-400" />}
                {key === 'events' && <Bell className="w-5 h-5 text-gray-400" />}
                <span className="text-gray-700 dark:text-gray-300">
                  {key === 'absences' && 'Absences et retards'}
                  {key === 'grades' && 'Nouvelles notes'}
                  {key === 'homework' && 'Devoirs à rendre'}
                  {key === 'events' && 'Événements'}
                </span>
              </div>
              <button
                onClick={() => handleToggle('push', key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}