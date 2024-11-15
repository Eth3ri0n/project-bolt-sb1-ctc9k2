import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  course: string;
  type: string;
  size: string;
  uploadDate: Date;
  downloads: number;
}

interface ResourceListProps {
  resources: Resource[];
  searchQuery: string;
}

export default function ResourceList({ resources, searchQuery }: ResourceListProps) {
  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {filteredResources.map((resource) => (
        <div
          key={resource.id}
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {resource.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {resource.course}
              </p>

              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Ajouté le {formatDate(resource.uploadDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {resource.downloads} téléchargements
                  </span>
                </div>
              </div>
            </div>
            <button className="p-2 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 rounded-lg transition-colors">
              <Download className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </button>
          </div>
        </div>
      ))}
      {filteredResources.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Aucune ressource trouvée pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}