import React, { useState } from 'react';
import { Tag, ChevronRight, Percent, ShoppingBag, Coffee, Bus, Ticket, Star } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { WidgetProps } from '../../types/widget';

interface Deal {
  id: string;
  title: string;
  description: string;
  discount: string;
  category: 'food' | 'transport' | 'shopping' | 'entertainment';
  validUntil: Date;
  merchant: string;
  isExclusive?: boolean;
  isFavorite?: boolean;
  code?: string;
}

export default function DealsWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: WidgetProps) {
  const deals: Deal[] = [
    {
      id: '1',
      title: 'Réduction Restaurant Universitaire',
      description: '20% de réduction sur les menus du midi',
      discount: '-20%',
      category: 'food',
      validUntil: new Date(2024, 3, 30),
      merchant: 'CROUS',
      isExclusive: true,
      isFavorite: true
    },
    {
      id: '2',
      title: 'Transport gratuit',
      description: 'Bus gratuit sur présentation de la carte étudiante',
      discount: '100%',
      category: 'transport',
      validUntil: new Date(2024, 6, 30),
      merchant: 'Réseau Urbain',
      isFavorite: true
    },
    {
      id: '3',
      title: 'Cinéma étudiant',
      description: 'Tarif préférentiel pour les étudiants',
      discount: '-40%',
      category: 'entertainment',
      validUntil: new Date(2024, 12, 31),
      merchant: 'CinéCampus',
      code: 'ETUDIANT2024'
    }
  ];

  const getCategoryIcon = (category: Deal['category']) => {
    switch (category) {
      case 'food':
        return <Coffee className="w-5 h-5" />;
      case 'transport':
        return <Bus className="w-5 h-5" />;
      case 'shopping':
        return <ShoppingBag className="w-5 h-5" />;
      case 'entertainment':
        return <Ticket className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: Deal['category']) => {
    switch (category) {
      case 'food':
        return 'bg-orange-500';
      case 'transport':
        return 'bg-blue-500';
      case 'shopping':
        return 'bg-purple-500';
      case 'entertainment':
        return 'bg-pink-500';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  return (
    <BaseWidget
      title="Bons plans étudiants"
      icon={<Tag className="w-6 h-6 text-white" />}
      headerColor="bg-gradient-to-r from-purple-600 to-pink-600"
      onToggleFavorite={onToggleFavorite}
      isFavorite={isFavorite}
      notifications={notifications}
      onShowNotifications={onShowNotifications}
      notificationBtnRef={notificationBtnRef}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="text-2xl font-bold dark:text-white">Offres en cours</h4>
          <button 
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium text-sm flex items-center gap-1"
          >
            Voir tout
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Deals list */}
        <div className="space-y-4">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 ${getCategoryColor(deal.category)} rounded-lg text-white`}>
                  {getCategoryIcon(deal.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-semibold text-gray-900 dark:text-white">
                          {deal.title}
                        </h5>
                        {deal.isExclusive && (
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full text-xs">
                            Exclusif
                          </span>
                        )}
                        {deal.isFavorite && (
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {deal.description}
                      </p>
                    </div>
                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {deal.discount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{deal.merchant}</span>
                      <span>Jusqu'au {formatDate(deal.validUntil)}</span>
                    </div>
                    {deal.code && (
                      <button className="px-3 py-1 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/50 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg text-sm transition-colors">
                        Code: {deal.code}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded-full text-sm font-medium whitespace-nowrap">
            Tous les bons plans
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
            Restauration
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
            Transport
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium whitespace-nowrap transition-colors">
            Loisirs
          </button>
        </div>
      </div>
    </BaseWidget>
  );
}