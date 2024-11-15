import {
  ExternalLink,
  MapPin,
  Percent,
  Tag,
  ThumbsUp,
  Timer,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { WidgetProps } from '../../types/widget';
import BaseWidget from './BaseWidget';

interface Deal {
  id: string;
  title: string;
  description: string;
  category: 'shopping' | 'food' | 'entertainment' | 'transport' | 'culture';
  discount: string;
  location?: string;
  validUntil: Date;
  likes: number;
  participantsCount: number;
  link: string;
}

export default function StudentDealsWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
}: WidgetProps) {
  // État pour le filtre des catégories
  const [selectedCategory, setSelectedCategory] = useState<
    Deal['category'] | 'all'
  >('all');

  // Données simulées des bons plans
  const deals: Deal[] = [
    {
      id: '1',
      title: 'Réduction Restaurant Universitaire',
      description: '-50% sur le menu étudiant le vendredi',
      category: 'food',
      discount: '50%',
      location: 'RU Campus',
      validUntil: new Date(2024, 11, 31),
      likes: 245,
      participantsCount: 89,
      link: '#',
    },
    {
      id: '2',
      title: 'Cinéma à prix réduit',
      description: 'Place à 5€ sur présentation de la carte étudiante',
      category: 'entertainment',
      discount: '5€',
      location: 'Cinéma du Centre',
      validUntil: new Date(2024, 5, 30),
      likes: 189,
      participantsCount: 67,
      link: '#',
    },
    {
      id: '3',
      title: 'Abonnement transport',
      description: "Tarif préférentiel sur l'abonnement annuel",
      category: 'transport',
      discount: '30%',
      validUntil: new Date(2024, 8, 1),
      likes: 156,
      participantsCount: 234,
      link: '#',
    },
  ];

  const getCategoryConfig = (category: Deal['category']) => {
    switch (category) {
      case 'shopping':
        return {
          label: 'Shopping',
          color:
            'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
        };
      case 'food':
        return {
          label: 'Restauration',
          color:
            'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
        };
      case 'entertainment':
        return {
          label: 'Loisirs',
          color:
            'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
        };
      case 'transport':
        return {
          label: 'Transport',
          color:
            'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        };
      case 'culture':
        return {
          label: 'Culture',
          color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
        };
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  // Filtrer les bons plans selon la catégorie sélectionnée
  const filteredDeals =
    selectedCategory === 'all'
      ? deals
      : deals.filter((deal) => deal.category === selectedCategory);

  return (
    <BaseWidget
      title="Bons plans étudiants"
      icon={<Tag className="w-6 h-6 text-white" />}
      headerColor="bg-gradient-to-r from-purple-600 to-purple-400"
      onToggleFavorite={onToggleFavorite}
      isFavorite={isFavorite}
      notifications={notifications}
      onShowNotifications={onShowNotifications}
      notificationBtnRef={notificationBtnRef}
    >
      <div className="space-y-6">
        {/* Filtres de catégories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            Tous
          </button>
          {['shopping', 'food', 'entertainment', 'transport', 'culture'].map(
            (category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category as Deal['category'])
                }
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? getCategoryConfig(category as Deal['category']).color
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {getCategoryConfig(category as Deal['category']).label}
              </button>
            )
          )}
        </div>

        {/* Liste des bons plans */}
        <div className="space-y-4">
          {filteredDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {deal.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getCategoryConfig(deal.category).color
                        }`}
                      >
                        {getCategoryConfig(deal.category).label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {deal.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-bold">
                    <Percent className="w-4 h-4" />
                    <span>{deal.discount}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  {deal.location && (
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{deal.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                    <Timer className="w-4 h-4" />
                    <span>Jusqu'au {formatDate(deal.validUntil)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{deal.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{deal.participantsCount} participants</span>
                    </div>
                  </div>
                  <a
                    href={deal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                  >
                    <span>Voir l'offre</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}
