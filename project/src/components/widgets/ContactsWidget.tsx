import React from 'react';
import { Phone, Star, MapPin, Building2, Heart, Stethoscope, Shield } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { WidgetProps } from '../../types/widget';

interface Contact {
  id: string;
  name: string;
  address: string;
  phone: string;
  type: 'emergency' | 'medical' | 'police' | 'general';
  icon: React.ComponentType<any>;
}

export default function ContactsWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: WidgetProps) {
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Commissariat de police - 65000',
      address: '21 Rue Georges Clemenceau',
      phone: '05 81 75 23 00',
      type: 'police',
      icon: Shield
    },
    {
      id: '2',
      name: 'Centre hospitalier Tarbes-Lourdeslice',
      address: 'Bd du Général de Lattre de Tassigny',
      phone: '05 62 51 51 51',
      type: 'medical',
      icon: Heart
    },
    {
      id: '3',
      name: 'Centre de Secours Principal de Tarbes',
      address: '31 Bd Claude Debussy',
      phone: '112',
      type: 'emergency',
      icon: Shield
    },
    {
      id: '4',
      name: 'Cabinet de médecine générale de l\'Arsenal',
      address: '6 Av. des Forges',
      phone: '05 62 37 77 88',
      type: 'medical',
      icon: Stethoscope
    }
  ];

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d{2})(?=\d)/g, '$1 ');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/\s/g, '')}`;
  };

  return (
    <BaseWidget
      title="Contacts utiles"
      icon={<Phone className="w-6 h-6 text-white" />}
      headerColor="bg-gradient-to-r from-blue-700 to-blue-600"
      onToggleFavorite={onToggleFavorite}
      isFavorite={isFavorite}
      notifications={notifications}
      onShowNotifications={onShowNotifications}
      notificationBtnRef={notificationBtnRef}
    >
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="py-4 first:pt-0 last:pb-0"
          >
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg ${
                contact.type === 'emergency' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                contact.type === 'medical' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                contact.type === 'police' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' :
                'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400'
              }`}>
                <contact.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {contact.name}
                </h3>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{contact.address}</span>
                  </div>
                  <button
                    onClick={() => handleCall(contact.phone)}
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      contact.type === 'emergency'
                        ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    {formatPhoneNumber(contact.phone)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BaseWidget>
  );
}