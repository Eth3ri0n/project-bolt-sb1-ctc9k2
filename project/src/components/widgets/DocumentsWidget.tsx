import React, { useState } from 'react';
import { FolderOpen, ChevronRight, Search, Upload, Download, FileText, File, Folder } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';
import DocumentsModal from '../documents/DocumentsModal';

interface DocumentsWidgetProps {
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function DocumentsWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: DocumentsWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recentDocuments = [
    {
      id: '1',
      name: 'Certificat de scolarité',
      type: 'pdf',
      size: '245 KB',
      category: 'Administratif',
      date: new Date(2024, 2, 15),
      color: 'bg-red-500'
    },
    {
      id: '2',
      name: 'Convention de stage',
      type: 'docx',
      size: '380 KB',
      category: 'Stages',
      date: new Date(2024, 2, 14),
      color: 'bg-blue-500'
    },
    {
      id: '3',
      name: 'Relevé de notes S1',
      type: 'pdf',
      size: '156 KB',
      category: 'Scolarité',
      date: new Date(2024, 2, 12),
      color: 'bg-green-500'
    }
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  return (
    <>
      <BaseWidget
        title="Mes Documents"
        icon={<FolderOpen className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-indigo-700 to-indigo-600"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Documents récents</h4>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium text-sm flex items-center gap-1"
            >
              Tous les documents
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick upload */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400 hover:border-indigo-500 hover:text-indigo-500 dark:hover:border-indigo-400 dark:hover:text-indigo-400 transition-colors"
          >
            <Upload className="w-5 h-5" />
            <span>Déposer un document</span>
          </button>

          {/* Recent documents */}
          <div className="space-y-3">
            {recentDocuments.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className={`p-2 ${doc.color} rounded-lg text-white`}>
                  {getFileIcon(doc.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-gray-900 dark:text-white truncate">
                    {doc.name}
                  </h5>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {doc.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {doc.size}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(doc.date)}
                    </span>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            ))}
          </div>

          {/* Quick access folders */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
            <h5 className="font-medium text-indigo-800 dark:text-indigo-200 mb-3">
              Dossiers rapides
            </h5>
            <div className="space-y-2">
              <button className="w-full text-left text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2">
                <Folder className="w-4 h-4" />
                <span>Documents administratifs</span>
              </button>
              <button className="w-full text-left text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2">
                <Folder className="w-4 h-4" />
                <span>Stages et alternance</span>
              </button>
              <button className="w-full text-left text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-2">
                <Folder className="w-4 h-4" />
                <span>Relevés de notes</span>
              </button>
            </div>
          </div>
        </div>
      </BaseWidget>

      <DocumentsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}