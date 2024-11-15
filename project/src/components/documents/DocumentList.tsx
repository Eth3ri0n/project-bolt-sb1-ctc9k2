import React from 'react';
import { FileText, File, Download, Share2, Trash2, MoreVertical } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  category: string;
  date: Date;
  color: string;
  shared: boolean;
}

interface DocumentListProps {
  documents: Document[];
  searchQuery: string;
  selectedFolder: string;
  activeTab: 'all' | 'shared' | 'trash';
}

export default function DocumentList({ 
  documents, 
  searchQuery, 
  selectedFolder,
  activeTab 
}: DocumentListProps) {
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'shared' && doc.shared) ||
      (activeTab === 'trash' && false); // Add trash logic here

    return matchesSearch && matchesTab;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
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
    <div className="space-y-3">
      {filteredDocuments.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
              <Download className="w-4 h-4 text-gray-400" />
            </button>
            {doc.shared && (
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                <Share2 className="w-4 h-4 text-gray-400" />
              </button>
            )}
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      ))}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Aucun document trouvé pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}