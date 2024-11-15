import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  Activity,
  Search,
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  Filter,
  Grid,
  List,
  ChevronRight,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

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

interface SportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSport: Sport | null;
}

export default function SportsModal({ 
  isOpen, 
  onClose,
  selectedSport
}: SportsModalProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'registered' | 'schedule'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<Sport['level'] | ''>('');

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
    },
    {
      id: '4',
      name: 'Basketball',
      icon: '🏀',
      schedule: [
        { day: 'Lundi', time: '20h00-22h00', location: 'Gymnase' }
      ],
      level: 'intermediate',
      participants: 18,
      maxParticipants: 20,
      description: 'Entraînement et matchs de basketball',
      nextSession: new Date(Date.now() + 1000 * 60 * 60 * 96)
    },
    {
      id: '5',
      name: 'Volleyball',
      icon: '🏐',
      schedule: [
        { day: 'Mercredi', time: '19h00-21h00', location: 'Gymnase' }
      ],
      level: 'beginner',
      participants: 10,
      maxParticipants: 12,
      description: 'Initiation et pratique du volleyball',
      nextSession: new Date(Date.now() + 1000 * 60 * 60 * 120)
    },
    {
      id: '6',
      name: 'Tennis',
      icon: '🎾',
      schedule: [
        { day: 'Mardi', time: '12h00-14h00', location: 'Courts de tennis' },
        { day: 'Jeudi', time: '17h00-19h00', location: 'Courts de tennis' }
      ],
      instructor: 'Julie Bernard',
      level: 'all',
      participants: 8,
      maxParticipants: 8,
      description: 'Cours de tennis tous niveaux',
      equipment: ['Raquette', 'Balles'],
      nextSession: new Date(Date.now() + 1000 * 60 * 60 * 144)
    }
  ];

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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const filteredSports = sports
    .filter(sport => {
      const matchesSearch = sport.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = !selectedLevel || sport.level === selectedLevel;
      const matchesTab = activeTab === 'all' || 
        (activeTab === 'registered' && sport.isRegistered);
      return matchesSearch && matchesLevel && matchesTab;
    });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Activités sportives" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'all'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span>Tous les sports</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('registered')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'registered'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Mes inscriptions</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'schedule'
                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Planning</span>
            </div>
          </button>
        </div>

        {/* Search and filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une activité..."
              className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value as Sport['level'] | '')}
            className="h-12 px-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent"
          >
            <option value="">Tous les niveaux</option>
            <option value="beginner">Débutant</option>
            <option value="intermediate">Intermédiaire</option>
            <option value="advanced">Avancé</option>
            <option value="all">Tous niveaux</option>
          </select>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400'
                  : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400'
                  : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab !== 'schedule' ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredSports.map((sport) => (
                  <div
                    key={sport.id}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{sport.icon}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadge(sport.level)}`}>
                        {getLevelText(sport.level)}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {sport.name}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{sport.participants}/{sport.maxParticipants} participants</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>Prochaine séance : {formatDate(sport.nextSession)}</span>
                      </div>
                    </div>
                    <button
                      className={`w-full py-2 px-4 rounded-lg transition-colors ${
                        sport.isRegistered
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                          : 'bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700'
                      }`}
                    >
                      {sport.isRegistered ? 'Inscrit' : 'S\'inscrire'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSports.map((sport) => (
                  <div
                    key={sport.id}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-start gap-6">
                      <div className="text-4xl">{sport.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {sport.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                              {sport.description}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelBadge(sport.level)}`}>
                            {getLevelText(sport.level)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">
                                {sport.participants}/{sport.maxParticipants} participants
                              </span>
                            </div>
                            {sport.instructor && (
                              <div className="flex items-center gap-2">
                                <Trophy className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-400">
                                  {sport.instructor}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="space-y-2">
                            {sport.schedule.map((s, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-600 dark:text-gray-400">
                                  {s.day} {s.time}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {sport.equipment && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                              Équipement requis
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {sport.equipment.map((item, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <button
                          className={`py-2 px-6 rounded-lg transition-colors ${
                            sport.isRegistered
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300'
                              : 'bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700'
                          }`}
                        >
                          {sport.isRegistered ? 'Inscrit' : 'S\'inscrire'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="space-y-6">
              {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'].map((day) => (
                <div key={day}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {day}
                  </h3>
                  <div className="space-y-2">
                    {sports
                      .filter(sport => 
                        sport.schedule.some(s => s.day === day)
                      )
                      .map(sport => (
                        sport.schedule
                          .filter(s => s.day === day)
                          .map((schedule, index) => (
                            <div
                              key={`${sport.id}-${index}`}
                              className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                            >
                              <div className="text-2xl">{sport.icon}</div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 dark:text-white">
                                  {sport.name}
                                </h4>
                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{schedule.time}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{schedule.location}</span>
                                  </div>
                                </div>
                              </div>
                              {sport.isRegistered && (
                                <span className="px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 rounded-full text- sm font-medium">
                                  Inscrit
                                </span>
                              )}
                            </div>
                          ))
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}