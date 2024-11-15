import React from 'react';
import { Package, Calendar, Clock, Settings } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  category: string;
  description: string;
  status: string;
  location: string;
  nextAvailable: Date | null;
  specifications: Record<string, any>;
  image: string;
  color: string;
}

interface EquipmentListProps {
  equipment: Equipment[];
  searchQuery: string;
  selectedCategory: string;
}

export default function EquipmentList({ 
  equipment, 
  searchQuery, 
  selectedCategory 
}: EquipmentListProps) {
  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || 
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long'
    }).format(date);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'available':
        return {
          label: 'Disponible',
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
        };
      case 'borrowed':
        return {
          label: 'Emprunté',
          color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
        };
      default:
        return {
          label: status,
          color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
        };
    }
  };

  return (
    <div className="space-y-6">
      {filteredEquipment.map((item) => (
        <div
          key={item.id}
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
        >
          <div className="flex items-start gap-6">
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {item.description}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusConfig(item.status).color}`}>
                  {getStatusConfig(item.status).label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.location}
                    </span>
                  </div>
                  {item.nextAvailable && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Disponible le {formatDate(item.nextAvailable)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {Object.entries(item.specifications).map(([key, value]) => (
                    <p key={key} className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">{key}:</span>{' '}
                      {Array.isArray(value) ? value.join(', ') : value}
                    </p>
                  ))}
                </div>
              </div>

              {item.status === 'available' && (
                <button className="mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
                  Réserver
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      {filteredEquipment.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Aucun équipement trouvé pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}