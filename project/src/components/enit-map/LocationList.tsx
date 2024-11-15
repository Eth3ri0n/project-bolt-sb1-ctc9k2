import React from 'react';
import { Building2, Navigation } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  building: string;
  floor: number;
  type: string;
  icon: any;
  description: string;
}

interface LocationListProps {
  locations: Location[];
  searchQuery: string;
  onLocationSelect: (id: string) => void;
}

export default function LocationList({ 
  locations, 
  searchQuery, 
  onLocationSelect 
}: LocationListProps) {
  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    location.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {filteredLocations.map((location) => {
        const Icon = location.icon;
        return (
          <div
            key={location.id}
            onClick={() => onLocationSelect(location.id)}
            className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Icon className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-gray-900 dark:text-white">
                {location.name}
              </h5>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Bâtiment {location.building} - {location.floor === 0 ? 'RDC' : `${location.floor}e étage`}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {location.description}
              </p>
            </div>
            <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
              <Navigation className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        );
      })}
      {filteredLocations.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Aucun résultat trouvé pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}