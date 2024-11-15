import React, { useState } from 'react';
import { Utensils, Star, Clock, Euro, CalendarDays, ChevronRight, ChevronLeft, Info } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { WidgetProps } from '../../types/widget';

interface MenuItem {
  name: string;
  description?: string;
  allergens?: string[];
  isVegetarian?: boolean;
  price?: number;
}

interface DailyMenu {
  date: Date;
  starters: MenuItem[];
  mains: MenuItem[];
  desserts: MenuItem[];
  openingHours: string;
  crowdLevel?: 'low' | 'medium' | 'high';
}

export default function RestaurantWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
  onModalOpen,
  onModalClose
}: WidgetProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const menus: DailyMenu[] = [
    {
      date: new Date(),
      starters: [
        { name: 'Oeuf mimosa', isVegetarian: true, price: 1.50 },
        { name: 'Petite salade', description: 'Salade verte, tomates, croûtons', isVegetarian: true, price: 1.20 },
        { name: 'Salade de pommes de terre', description: 'Pommes de terre, oignons, persil', isVegetarian: true, price: 1.50 }
      ],
      mains: [
        { 
          name: 'Poulet frit + frite/légumes sautés',
          description: 'Poulet croustillant, frites maison ou légumes de saison',
          price: 4.50,
          allergens: ['gluten']
        },
        {
          name: 'Blanc de poisson + frite/légumes sautés',
          description: 'Poisson du jour, accompagnement au choix',
          price: 4.80,
          allergens: ['poisson']
        }
      ],
      desserts: [
        { name: 'Compote de pomme', isVegetarian: true, price: 1.00 },
        { name: 'Fruits', isVegetarian: true, price: 0.80 },
        { name: 'Yaourt à la pêche/fraise', isVegetarian: true, price: 1.20 }
      ],
      openingHours: '11h30 - 14h00',
      crowdLevel: 'medium'
    }
  ];

  const getCrowdLevelInfo = (level?: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low':
        return { text: 'Peu d\'affluence', color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' };
      case 'medium':
        return { text: 'Affluence moyenne', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' };
      case 'high':
        return { text: 'Forte affluence', color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' };
      default:
        return { text: 'Pas d\'information', color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300' };
    }
  };

  const selectedMenu = menus[0]; // In real app, find menu by selectedDate

  return (
    <BaseWidget
      title="Restaurant universitaire"
      icon={<Utensils className="w-6 h-6 text-white" />}
      headerColor="bg-gradient-to-r from-red-600 to-red-500"
      onToggleFavorite={onToggleFavorite}
      isFavorite={isFavorite}
      notifications={notifications}
      onShowNotifications={onShowNotifications}
      notificationBtnRef={notificationBtnRef}
    >
      <div className="space-y-6">
        {/* Header with date navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(selectedDate.getDate() - 1);
                setSelectedDate(newDate);
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold">
              {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h3>
            <button
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(selectedDate.getDate() + 1);
                setSelectedDate(newDate);
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedMenu.openingHours}
            </span>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Statut actuel
            </span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${getCrowdLevelInfo(selectedMenu.crowdLevel).color}`}>
            {getCrowdLevelInfo(selectedMenu.crowdLevel).text}
          </span>
        </div>

        {/* Menu sections */}
        <div className="space-y-6">
          {/* Starters */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Entrées</h4>
            <div className="space-y-2">
              {selectedMenu.starters.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.name}</span>
                      {item.isVegetarian && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-xs">
                          Végétarien
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {item.price?.toFixed(2)} €
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Main courses */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Plats</h4>
            <div className="space-y-2">
              {selectedMenu.mains.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.name}</span>
                      {item.isVegetarian && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-xs">
                          Végétarien
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.description}
                      </p>
                    )}
                    {item.allergens && item.allergens.length > 0 && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                        Allergènes : {item.allergens.join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {item.price?.toFixed(2)} €
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Desserts */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Desserts</h4>
            <div className="space-y-2">
              {selectedMenu.desserts.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.name}</span>
                      {item.isVegetarian && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-xs">
                          Végétarien
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-medium">
                    {item.price?.toFixed(2)} €
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with additional info */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Euro className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-sm text-red-600 dark:text-red-400">
                Paiement par carte IZLY ou espèces
              </span>
            </div>
            <button className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium">
              Plus d'infos
            </button>
          </div>
        </div>
      </div>
    </BaseWidget>
  );
}