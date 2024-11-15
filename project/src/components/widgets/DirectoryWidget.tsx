import React, { useState } from 'react';
import { Users, ChevronRight, Search, Building2, GraduationCap, Phone } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';
import DirectoryModal from '../directory/DirectoryModal';

interface DirectoryWidgetProps {
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function DirectoryWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: DirectoryWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const quickContacts = [
    {
      name: 'Dr. Martin Dubois',
      role: 'Directeur du département Génie Mécanique',
      email: 'm.dubois@enit.fr',
      phone: '05 62 44 27 01',
      department: 'Génie Mécanique',
      color: 'bg-blue-500'
    },
    {
      name: 'Dr. Sophie Bernard',
      role: 'Responsable Relations Internationales',
      email: 's.bernard@enit.fr',
      phone: '05 62 44 27 02',
      department: 'Relations Internationales',
      color: 'bg-purple-500'
    },
    {
      name: 'Service Scolarité',
      role: 'Administration des étudiants',
      email: 'scolarite@enit.fr',
      phone: '05 62 44 27 03',
      department: 'Administration',
      color: 'bg-green-500'
    }
  ];

  return (
    <>
      <BaseWidget
        title="Annuaire universitaire"
        icon={<Users className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-blue-900 to-blue-800"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Contacts</h4>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1"
            >
              Annuaire complet
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une personne..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              onClick={() => setIsModalOpen(true)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Quick contacts */}
          <div className="space-y-3">
            {quickContacts.map((contact, index) => (
              <div
                key={index}
                onClick={() => setIsModalOpen(true)}
                className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className={`w-1 h-16 ${contact.color} rounded-full`} />
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900 dark:text-white">
                    {contact.name}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {contact.role}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {contact.department}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {contact.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-3">
              Services
            </h5>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                • Service Scolarité
              </button>
              <button className="w-full text-left text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                • Relations Internationales
              </button>
              <button className="w-full text-left text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                • Service Informatique
              </button>
            </div>
          </div>
        </div>
      </BaseWidget>

      <DirectoryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}