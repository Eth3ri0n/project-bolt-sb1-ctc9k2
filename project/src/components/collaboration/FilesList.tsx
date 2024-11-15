import React from 'react';
import { FileText, Download, Share2, MoreVertical, File } from 'lucide-react';

interface SharedFile {
  id: string;
  name: string;
  owner: string;
  lastModified: Date;
  size: string;
  type: 'document' | 'presentation' | 'spreadsheet';
}

interface FilesListProps {
  files: SharedFile[];
  searchQuery: string;
}

export default function FilesList({ files, searchQuery }: FilesListProps) {
  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getFileIcon = (type: SharedFile['type']) => {
    switch (type) {
      case 'document':
        return <FileText className="w-5 h-5" />;
      case 'presentation':
      case 'spreadsheet':
        return <File className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {filteredFiles.map((file) => (
        <div
          key={file.id}
          className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400">
            {getFileIcon(file.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="font-semibold text-gray-900 dark:text-white truncate">
              {file.name}
            </h5>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Propriétaire : {file.owner}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {file.size}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Modifié le {formatDate(file.lastModified)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
              <Download className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
              <Share2 className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      ))}
      {filteredFiles.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Aucun fichier trouvé pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}