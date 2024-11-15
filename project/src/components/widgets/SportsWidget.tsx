import React, { useState } from 'react';
import { Activity, Calendar, Clock, MapPin, Users, Trophy, ChevronRight, Search } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { WidgetProps } from '../../types/widget';
import SportsModal from '../sports/SportsModal';

interface Sport {
  id: string;
  name: string;
  icon: string;
  schedule: {
    day: string;
    time: string;
    location: string;
  }[];
  instructor?: string;
  level: 'all' | 'beginner' | 'intermediate' | 'advanced';
  participants: number;
  maxParticipants: number;
  description: string;
  equipment?: string[];
  nextSession: Date;
  isRegistered?: boolean;
}

export default function SportsWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
  onModalOpen,
  onModalClose
}: WidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  const sports: Sport[] = [
    {
      id: '1',
      name: 'Course à pied',
      icon: '🏃',
      schedule: [
        { day: 'Lundi', time: '18h00-19h30', location: 'Stade' },
        { day: 'Jeudi', time: '17h30-19h00', location: 'Stade' }
      ],
      instructor: 'Marc Dupont',
      level: 'all',
      participants: 15,
      maxParticipants: 30,
      description: 'Entraînement de course à pied pour tous niveaux',
      nextSession: new Date(Date.now() + 1000 * 60 * 60 * 24),
      isRegistered: true
    },
    {
      id: '2',
      name: 'Football',
      icon: '⚽',
      schedule: [
        { day: 'Mardi', time: '19h00-21h00', location: 'Terrain synthétique' }
      ],
      instructor: 'Sophie Martin',
      level: 'intermediate',
      participants: 22,
      maxParticipants: 24,
      description: 'Entraînement et matchs de football',
      equipment: ['Chaussures de foot', 'Protège-tibias'],
      nextSession: new Date(Date.now() + 1000 * 60 * 60 * 48)
    },
    {
      id: '3',
      name: 'Badminton',
      icon: '🏸',
      schedule: [
        { day: 'Mercredi', time: '12h30-14h00', location: 'Gymnase' },
        { day: 'Vendredi', time: '17h00-19h00', location: 'Gymnase' }
      ],
      level: 'all',
      participants: 12,
      maxParticipants: 16,
      description: 'Sessions libres de badminton',
      equipment: ['Raquette'],
      nextSession: new Date(Date.now() + 1000 * 60 * 60 * 72)
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const getLevelBadge = (level: Sport['level']) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getLevelText = (level: Sport['level']) => {
    switch (level) {
      case 'beginner':
        return 'Débutant';
      case 'intermediate':
        return 'Intermédiaire';
      case 'advanced':
        return 'Avancé';
      default:
        return 'Tous niveaux';
    }
  };

  return (
    <>
      <BaseWidget
        title="Activités sportives"
        icon={<Activity className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-amber-400 to-amber-500"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Sports disponibles</h4>
            <button 
              onClick={handleOpenModal}
              className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 font-medium text-sm flex items-center gap-1"
            >
              Voir tout
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une activité..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
              onClick={handleOpenModal}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Sports grid */}
          <div className="grid grid-cols-2 gap-4">
            {sports.slice(0, 4).map((sport) => (
              <div
                key={sport.id}
                onClick={() => {
                  setSelectedSport(sport);
                  handleOpenModal();
                }}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{sport.icon}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadge(sport.level)}`}>
                    {getLevelText(sport.level)}
                  </span>
                </div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {sport.name}
                </h5>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Prochaine séance : {formatDate(sport.nextSession)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{sport.participants}/{sport.maxParticipants} participants</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick stats */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 mb-3">
              <Trophy className="w-5 h-5" />
              <h5 className="font-medium">Mes activités</h5>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-amber-600 dark:text-amber-400">
                  Inscriptions actives
                </div>
                <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                  {sports.filter(s => s.isRegistered).length}
                </p>
              </div>
              <div>
                <div className="text-sm text-amber-600 dark:text-amber-400">
                  Prochaine séance
                </div>
                <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  {sports
                    .filter(s => s.isRegistered)
                    .sort((a, b) => a.nextSession.getTime() - b.nextSession.getTime())[0]?.name || 'Aucune'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </BaseWidget>

      <SportsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedSport={selectedSport}
      />
    </>
  );
}