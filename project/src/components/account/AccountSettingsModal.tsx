import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  User,
  Lock,
  Bell,
  Globe,
  Shield,
  Key,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Book,
  Smartphone,
  LogOut
} from 'lucide-react';
import PersonalInfo from './PersonalInfo';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import RegionalSettings from './RegionalSettings';

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountSettingsModal({ isOpen, onClose }: AccountSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'personal' | 'security' | 'notifications' | 'regional'>('personal');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Paramètres du compte" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'personal'
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Informations personnelles</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'security'
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Sécurité</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'notifications'
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('regional')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'regional'
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Langue et région</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'personal' && <PersonalInfo />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'regional' && <RegionalSettings />}
        </div>
      </div>
    </Modal>
  );
}