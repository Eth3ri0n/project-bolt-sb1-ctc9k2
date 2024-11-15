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

interface DocumentGridProps {
  documents: Document[];
  searchQuery: string;
  selectedFolder: string;
  activeTab: 'all' | 'shared' | 'trash';
}

export default function DocumentGrid({ 
  documents, 
  searchQuery, 
  selectedFolder,
  activeTab 
}: DocumentGridProps) {
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
      month: 'long'
    }).format(date);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-8 h-8" />;
      default:
        return <File className="w-8 h-8" />;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {filteredDocuments.map((doc) => (
        <div
          key={doc.id}
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
        >
          <div className="relative mb-4">
            <div className={`w-full aspect-square ${doc.color} rounded-lg flex items-center justify-center text-white`}>
              {getFileIcon(doc.type)}
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-1">
                <button className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Download className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
                {doc.shared && (
                  <button className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Share2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </button>
                )}
                <button className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
          <h5 className="font-semibold text-gray-900 dark:text-white truncate mb-1">
            {doc.name}
          </h5>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>{doc.size}</span>
            <span>{formatDate(doc.date)}</span>
          </div>
        </div>
      ))}
      {filteredDocuments.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
          Aucun document trouvé pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}