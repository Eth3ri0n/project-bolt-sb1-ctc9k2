import React from 'react';
import { Layers } from 'lucide-react';

interface FloorSelectorProps {
  selectedFloor: number;
  onFloorChange: (floor: number) => void;
}

export default function FloorSelector({ 
  selectedFloor, 
  onFloorChange 
}: FloorSelectorProps) {
  const floors = [
    { number: 2, label: '2e étage' },
    { number: 1, label: '1er étage' },
    { number: 0, label: 'RDC' },
    { number: -1, label: 'Sous-sol' }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <Layers className="w-5 h-5" />
        Étages
      </h3>
      <div className="space-y-2">
        {floors.map((floor) => (
          <button
            key={floor.number}
            onClick={() => onFloorChange(floor.number)}
            className={`w-full p-3 rounded-lg transition-colors ${
              selectedFloor === floor.number
                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            {floor.label}
          </button>
        ))}
      </div>
    </div>
  );
}