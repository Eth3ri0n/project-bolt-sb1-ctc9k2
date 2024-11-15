import React, { useState } from 'react';
import { HelpCircle, ChevronRight, Search, Book, MessageSquare, Lightbulb, ExternalLink, Phone, Mail, Globe } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification, WidgetProps } from '../../types/widget';
import HelpModal from '../help/HelpModal';

export default function HelpWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
  onModalOpen,
  onModalClose
}: WidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quickLinks = [
    {
      icon: Book,
      title: 'Guide étudiant',
      description: 'Tout savoir sur la vie à l\'ENIT',
      color: 'bg-cyan-500'
    },
    {
      icon: MessageSquare,
      title: 'FAQ',
      description: 'Questions fréquentes',
      color: 'bg-purple-500'
    },
    {
      icon: Lightbulb,
      title: 'Tutoriels',
      description: 'Guides pas à pas',
      color: 'bg-amber-500'
    }
  ];

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: 'support@enit.fr',
      type: 'email'
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '05 62 44 27 00',
      type: 'phone'
    },
    {
      icon: Globe,
      label: 'Site web',
      value: 'www.enit.fr',
      type: 'link'
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

  return (
    <>
      <BaseWidget
        title="Aide"
        icon={<HelpCircle className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-cyan-600 to-cyan-500"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Centre d'aide</h4>
            <button 
              onClick={handleOpenModal}
              className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 font-medium text-sm flex items-center gap-1"
            >
              Tout voir
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Comment pouvons-nous vous aider ?"
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent"
              onClick={handleOpenModal}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={handleOpenModal}
                className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center"
              >
                <div className={`p-3 ${link.color} rounded-xl mb-3`}>
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 dark:text-white">
                  {link.title}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {link.description}
                </p>
              </button>
            ))}
          </div>

          {/* Contact information */}
          <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-4">
            <h5 className="font-medium text-cyan-800 dark:text-cyan-200 mb-3">
              Besoin d'aide ?
            </h5>
            <div className="space-y-3">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-center gap-3">
                  <contact.icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-cyan-800 dark:text-cyan-200">
                      {contact.label}:
                    </span>
                    {contact.type === 'email' && (
                      <a
                        href={`mailto:${contact.value}`}
                        className="text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                      >
                        {contact.value}
                      </a>
                    )}
                    {contact.type === 'phone' && (
                      <a
                        href={`tel:${contact.value.replace(/\s/g, '')}`}
                        className="text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                      >
                        {contact.value}
                      </a>
                    )}
                    {contact.type === 'link' && (
                      <a
                        href={`https://${contact.value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300 flex items-center gap-1"
                      >
                        {contact.value}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BaseWidget>

      <HelpModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}