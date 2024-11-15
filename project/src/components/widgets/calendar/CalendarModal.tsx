import React, { useState } from 'react';
import Modal from '../../shared/Modal';
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Tag
} from 'lucide-react';
import Calendar from 'react-calendar';

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

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  events: Event[];
}

export default function CalendarModal({ 
  isOpen, 
  onClose,
  selectedDate,
  events 
}: CalendarModalProps) {
  const [activeTab, setActiveTab] = useState<'calendar' | 'list'>('calendar');
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'personal' | 'school' | 'deadline'>('all');

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agenda" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'calendar'
                ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>Calendrier</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'list'
                ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <List className="w-4 h-4" />
              <span>Liste</span>
            </div>
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un événement..."
              className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as typeof selectedType)}
            className="h-12 px-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent"
          >
            <option value="all">Tous les types</option>
            <option value="personal">Personnel</option>
            <option value="school">École</option>
            <option value="deadline">Échéances</option>
          </select>

          <button className="h-12 px-4 bg-primary hover:bg-primary-light text-white rounded-lg transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>Nouvel événement</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              {/* View mode selector */}
              <div className="flex justify-center space-x-2 mb-6">
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-4 py-2 rounded-lg ${
                    viewMode === 'month'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  Mois
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 rounded-lg ${
                    viewMode === 'week'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  Semaine
                </button>
                <button
                  onClick={() => setViewMode('day')}
                  className={`px-4 py-2 rounded-lg ${
                    viewMode === 'day'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  Jour
                </button>
              </div>

              {/* Calendar */}
              <Calendar
                value={selectedDate}
                view={viewMode === 'month' ? 'month' : 'week'}
                prevLabel={<ChevronLeft className="w-4 h-4" />}
                nextLabel={<ChevronRight className="w-4 h-4" />}
                className="w-full rounded-xl border-none shadow-sm"
              />
            </div>
          )}

          {activeTab === 'list' && (
            <div className="space-y-4">
              {events
                .filter(event => {
                  const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
                  const matchesType = selectedType === 'all' || event.type === selectedType;
                  return matchesSearch && matchesType;
                })
                .map((event) => (
                  <div
                    key={event.id}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {event.title}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getTypeConfig(event.type).color
                          }`}>
                            {getTypeConfig(event.type).label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {formatTime(event.date)}
                              {event.endDate && ` - ${formatTime(event.endDate)}`}
                            </span>
                          </div>
                          {event.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">
                                {event.location}
                              </span>
                            </div>
                          )}
                        </div>
                        {event.attendees && (
                          <div className="flex items-center gap-2 mt-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {event.attendees.join(', ')}
                            </span>
                          </div>
                        )}
                      </div>
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