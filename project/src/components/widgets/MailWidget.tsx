import React from 'react';
import { Mail, Paperclip } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';

interface Email {
  id: string;
  sender: {
    name: string;
    email: string;
  };
  subject: string;
  preview: string;
  date: string;
  hasAttachment?: boolean;
  isRead: boolean;
}

interface MailWidgetProps {
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function MailWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: MailWidgetProps) {
  const emails: Email[] = [
    {
      id: '1',
      sender: {
        name: 'Danielle Bartharès',
        email: 'd.barthares@univ.fr'
      },
      subject: 'Cours de yoga étudiants / places',
      preview: 'Chères et chers étudiants, Stress, tension...',
      date: 'ven. 08/11',
      isRead: false
    },
    {
      id: '2',
      sender: {
        name: 'BENTAYOU Patrick',
        email: 'p.bentayou@univ.fr'
      },
      subject: 'Programme sport erratum',
      preview: 'Le lundi est férié ...le gymnase sera fermé...',
      date: 'ven. 08/11',
      isRead: true
    },
    {
      id: '3',
      sender: {
        name: 'BENTAYOU Patrick',
        email: 'p.bentayou@univ.fr'
      },
      subject: 'programme semaine 46',
      preview: 'Bonjour Voici le programme pour la sem...',
      date: 'ven. 08/11',
      hasAttachment: true,
      isRead: true
    }
  ];

  return (
    <BaseWidget
      title="Mail"
      icon={<Mail className="w-6 h-6 text-white" />}
      headerColor="bg-gradient-to-r from-[#0078D4] to-[#00B0FF]"
      onToggleFavorite={onToggleFavorite}
      isFavorite={isFavorite}
      notifications={notifications}
      onShowNotifications={onShowNotifications}
      notificationBtnRef={notificationBtnRef}
    >
      <div className="space-y-2">
        <h3 className="text-[28px] font-normal mb-8 dark:text-white">Boîte de réception</h3>
        <div className="space-y-px">
          {emails.map((email) => (
            <div
              key={email.id}
              className="px-6 py-4 cursor-pointer transition-colors hover:bg-gray-50/80 dark:hover:bg-gray-700/50"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-[17px] font-normal text-gray-900 dark:text-white">
                    {email.sender.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    {email.hasAttachment && (
                      <Paperclip className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    )}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {email.date}
                    </span>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[15px] text-blue-600 dark:text-blue-400 font-normal">
                    {email.subject}
                  </p>
                  <p className="text-[15px] text-gray-600 dark:text-gray-400 line-clamp-1">
                    {email.preview}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseWidget>
  );
}