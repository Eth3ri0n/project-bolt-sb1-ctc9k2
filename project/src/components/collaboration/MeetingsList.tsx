import React from 'react';
import { Video, Users, Clock, Calendar, FileText, Settings } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: Date;
  duration: number;
  organizer: string;
  participants: number;
  type: string;
}

interface MeetingsListProps {
  meetings: Meeting[];
  searchQuery: string;
}

export default function MeetingsList({ meetings, searchQuery }: MeetingsListProps) {
  const filteredMeetings = meetings.filter(meeting =>
    meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {filteredMeetings.map((meeting) => (
        <div
          key={meeting.id}
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {meeting.title}
              </h3>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(meeting.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{meeting.duration} minutes</span>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{meeting.participants} participants</span>
                </div>
                <span>Organisateur : {meeting.organizer}</span>
              </div>
            </div>
            <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span>Rejoindre</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <button className="p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <FileText className="w-4 h-4" />
              <span>Documents partagés</span>
            </button>
            <button className="p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Users className="w-4 h-4" />
              <span>Participants</span>
            </button>
            <button className="p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <Settings className="w-4 h-4" />
              <span>Paramètres</span>
            </button>
          </div>
        </div>
      ))}
      {filteredMeetings.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Aucune réunion trouvée pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}