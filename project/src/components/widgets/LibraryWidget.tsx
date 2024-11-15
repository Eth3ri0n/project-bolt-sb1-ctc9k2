import React, { useState } from 'react';
import { Library, ChevronRight, Search, Clock, BookOpen, Calendar, ArrowUpDown } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';
import LibraryModal from '../library/LibraryModal';

interface LibraryWidgetProps {
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function LibraryWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: LibraryWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recentBooks = [
    {
      id: '1',
      title: 'Mécanique des fluides',
      author: 'Frank M. White',
      dueDate: new Date(2024, 2, 25),
      status: 'borrowed',
      category: 'Engineering',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      dueDate: new Date(2024, 2, 20),
      status: 'reserved',
      category: 'Computer Science',
      color: 'bg-purple-500'
    },
    {
      id: '3',
      title: 'Materials Science and Engineering',
      author: 'William D. Callister',
      status: 'available',
      category: 'Engineering',
      color: 'bg-green-500'
    }
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'borrowed':
        return {
          label: 'Emprunté',
          color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
        };
      case 'reserved':
        return {
          label: 'Réservé',
          color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
        };
      case 'available':
        return {
          label: 'Disponible',
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
        };
      default:
        return {
          label: status,
          color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
        };
    }
  };

  return (
    <>
      <BaseWidget
        title="Bibliothèque"
        icon={<Library className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-teal-600 to-teal-500"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Catalogue</h4>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium text-sm flex items-center gap-1"
            >
              Voir tout
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un ouvrage..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent"
              onClick={() => setIsModalOpen(true)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Recent books */}
          <div className="space-y-3">
            {recentBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => setIsModalOpen(true)}
                className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className={`w-1 h-16 ${book.color} rounded-full`} />
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 dark:text-white">
                    {book.title}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {book.author}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusConfig(book.status).color}`}>
                      {getStatusConfig(book.status).label}
                    </span>
                    {book.dueDate && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Retour le {formatDate(book.dueDate)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick stats */}
          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-4">
            <h5 className="font-medium text-teal-800 dark:text-teal-200 mb-3">
              Mes emprunts
            </h5>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">En cours</span>
                </div>
                <p className="text-2xl font-bold text-teal-700 dark:text-teal-300 mt-1">
                  2
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Réservations</span>
                </div>
                <p className="text-2xl font-bold text-teal-700 dark:text-teal-300 mt-1">
                  1
                </p>
              </div>
            </div>
          </div>
        </div>
      </BaseWidget>

      <LibraryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}