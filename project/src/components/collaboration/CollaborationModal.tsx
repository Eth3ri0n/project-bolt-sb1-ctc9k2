import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  Share2,
  Users,
  MessageSquare,
  Calendar,
  Video,
  Search,
  Plus,
  Settings,
  FileText,
  Link2,
  Clock
} from 'lucide-react';
import { TeamsIcon, OneDriveIcon } from '../icons/MicrosoftIcons';
import TeamsList from './TeamsList';
import FilesList from './FilesList';
import MeetingsList from './MeetingsList';

interface CollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CollaborationModal({ isOpen, onClose }: CollaborationModalProps) {
  const [activeTab, setActiveTab] = useState<'teams' | 'files' | 'meetings'>('teams');
  const [searchQuery, setSearchQuery] = useState('');

  const teams = [
    {
      id: '1',
      name: 'Projet Mécanique - Groupe 3',
      members: 6,
      lastActivity: new Date(2024, 2, 15),
      unreadMessages: 3,
      type: 'project'
    },
    {
      id: '2',
      name: 'TP Automatique',
      members: 4,
      lastActivity: new Date(2024, 2, 16),
      unreadMessages: 1,
      type: 'course'
    },
    {
      id: '3',
      name: 'BDE ENIT',
      members: 25,
      lastActivity: new Date(2024, 2, 17),
      unreadMessages: 5,
      type: 'organization'
    }
  ];

  const files = [
    {
      id: '1',
      name: 'Rapport de projet - V1.docx',
      owner: 'Martin D.',
      lastModified: new Date(2024, 2, 15),
      size: '2.4 MB',
      type: 'document'
    },
    {
      id: '2',
      name: 'Présentation finale.pptx',
      owner: 'Sophie B.',
      lastModified: new Date(2024, 2, 16),
      size: '5.1 MB',
      type: 'presentation'
    },
    {
      id: '3',
      name: 'Données expérimentales.xlsx',
      owner: 'Philippe M.',
      lastModified: new Date(2024, 2, 17),
      size: '1.8 MB',
      type: 'spreadsheet'
    }
  ];

  const meetings = [
    {
      id: '1',
      title: 'Réunion de projet - Groupe 3',
      date: new Date(2024, 2, 20, 14, 30),
      duration: 60,
      organizer: 'Martin D.',
      participants: 6,
      type: 'teams'
    },
    {
      id: '2',
      title: 'Point d\'avancement TP',
      date: new Date(2024, 2, 21, 10, 0),
      duration: 45,
      organizer: 'Sophie B.',
      participants: 4,
      type: 'teams'
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Outils de collaboration" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('teams')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'teams'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Équipes</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'files'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Fichiers</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('meetings')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'meetings'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span>Réunions</span>
            </div>
          </button>
        </div>

        {/* Search and actions */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Rechercher ${
                activeTab === 'teams' ? 'une équipe' :
                activeTab === 'files' ? 'un fichier' :
                'une réunion'
              }...`}
              className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:focus:ring-yellow-400 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <button className="h-12 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            <span>{
              activeTab === 'teams' ? 'Nouvelle équipe' :
              activeTab === 'files' ? 'Nouveau fichier' :
              'Nouvelle réunion'
            }</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'teams' && (
            <TeamsList 
              teams={teams}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'files' && (
            <FilesList 
              files={files}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'meetings' && (
            <MeetingsList 
              meetings={meetings}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}