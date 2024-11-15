import React from 'react';
import { Package, Calendar, Clock } from 'lucide-react';

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

interface EquipmentGridProps {
  equipment: Equipment[];
  searchQuery: string;
  selectedCategory: string;
}

export default function EquipmentGrid({ 
  equipment, 
  searchQuery, 
  selectedCategory 
}: EquipmentGridProps) {
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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {filteredEquipment.map((item) => (
        <div
          key={item.id}
          className="bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium ${getStatusConfig(item.status).color}`}>
                {getStatusConfig(item.status).label}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
              {item.description}
            </p>

            <div className="mt-4 space-y-2">
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

            {item.status === 'available' && (
              <button className="w-full mt-4 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors">
                Réserver
              </button>
            )}
          </div>
        </div>
      ))}
      {filteredEquipment.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
          Aucun équipement trouvé pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}