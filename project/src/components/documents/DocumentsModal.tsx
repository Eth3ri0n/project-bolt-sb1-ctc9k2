import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  FolderOpen,
  Search,
  Upload,
  Download,
  FileText,
  File,
  Folder,
  Filter,
  Grid,
  List,
  Trash2,
  Share2,
  Info,
  MoreVertical
} from 'lucide-react';
import DocumentList from './DocumentList';
import DocumentGrid from './DocumentGrid';
import DocumentUpload from './DocumentUpload';

interface DocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentsModal({ isOpen, onClose }: DocumentsModalProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'shared' | 'trash'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const documents = [
    {
      id: '1',
      name: 'Certificat de scolarité',
      type: 'pdf',
      size: '245 KB',
      category: 'Administratif',
      date: new Date(2024, 2, 15),
      color: 'bg-red-500',
      shared: false
    },
    {
      id: '2',
      name: 'Convention de stage',
      type: 'docx',
      size: '380 KB',
      category: 'Stages',
      date: new Date(2024, 2, 14),
      color: 'bg-blue-500',
      shared: true
    },
    {
      id: '3',
      name: 'Relevé de notes S1',
      type: 'pdf',
      size: '156 KB',
      category: 'Scolarité',
      date: new Date(2024, 2, 12),
      color: 'bg-green-500',
      shared: false
    }
  ];

  const folders = [
    {
      id: '1',
      name: 'Documents administratifs',
      count: 12,
      color: 'bg-red-500'
    },
    {
      id: '2',
      name: 'Stages et alternance',
      count: 8,
      color: 'bg-blue-500'
    },
    {
      id: '3',
      name: 'Relevés de notes',
      count: 6,
      color: 'bg-green-500'
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mes Documents" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'all'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              <span>Tous les documents</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('shared')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'shared'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              <span>Partagés</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('trash')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'trash'
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              <span>Corbeille</span>
            </div>
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un document..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400'
                  : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-400'
                  : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>Déposer</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Folders section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Dossiers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    selectedFolder === folder.id
                      ? 'ring-2 ring-indigo-500 dark:ring-indigo-400'
                      : ''
                  }`}
                >
                  <div className={`p-2 ${folder.color} rounded-lg`}>
                    <Folder className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {folder.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {folder.count} documents
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Documents section */}
          {viewMode === 'list' ? (
            <DocumentList 
              documents={documents}
              searchQuery={searchQuery}
              selectedFolder={selectedFolder}
              activeTab={activeTab}
            />
          ) : (
            <DocumentGrid 
              documents={documents}
              searchQuery={searchQuery}
              selectedFolder={selectedFolder}
              activeTab={activeTab}
            />
          )}
        </div>
      </div>

      <DocumentUpload 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </Modal>
  );
}