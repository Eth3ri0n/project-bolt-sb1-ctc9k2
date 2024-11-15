import React from 'react';
import { Users, MessageSquare, Calendar, Settings, FileText, Video } from 'lucide-react';

interface Team {
  id: string;
  name: string;
  members: number;
  lastActivity: Date;
  unreadMessages: number;
  type: 'project' | 'course' | 'organization';
}

interface TeamsListProps {
  teams: Team[];
  searchQuery: string;
}

export default function TeamsList({ teams, searchQuery }: TeamsListProps) {
  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  const getTypeConfig = (type: Team['type']) => {
    switch (type) {
      case 'project':
        return {
          label: 'Projet',
          color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
        };
      case 'course':
        return {
          label: 'Cours',
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
        };
      case 'organization':
        return {
          label: 'Organisation',
          color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
        };
    }
  };

  return (
    <div className="space-y-4">
      {filteredTeams.map((team) => {
        const typeConfig = getTypeConfig(team.type);

        return (
          <div
            key={team.id}
            className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {team.name}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeConfig.color}`}>
                    {typeConfig.label}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{team.members} membres</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Dernière activité le {formatDate(team.lastActivity)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {team.unreadMessages > 0 && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 rounded-full text-xs font-medium">
                    {team.unreadMessages} messages
                  </span>
                )}
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <Settings className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <button className="p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <MessageSquare className="w-4 h-4" />
                <span>Discussions</span>
              </button>
              <button className="p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <FileText className="w-4 h-4" />
                <span>Fichiers</span>
              </button>
              <button className="p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Video className="w-4 h-4" />
                <span>Réunion</span>
              </button>
            </div>
          </div>
        );
      })}
      {filteredTeams.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Aucune équipe trouvée pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}