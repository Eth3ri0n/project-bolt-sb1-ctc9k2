import React from 'react';
import { 
  Users, 
  BookOpen, 
  Coffee, 
  Printer,
  ArrowUpDown,
  Wifi,
  Heart,
  StepForward // Using StepForward instead of Stairs
} from 'lucide-react';

export default function MapLegend() {
  const items = [
    { icon: Users, label: 'Salles de cours', color: 'bg-blue-500' },
    { icon: BookOpen, label: 'Bibliothèque', color: 'bg-purple-500' },
    { icon: Coffee, label: 'Cafétéria', color: 'bg-orange-500' },
    { icon: Printer, label: 'Services', color: 'bg-green-500' },
    { icon: StepForward, label: 'Escaliers', color: 'bg-gray-500' },
    { icon: ArrowUpDown, label: 'Ascenseurs', color: 'bg-gray-500' },
    { icon: Wifi, label: 'WiFi', color: 'bg-sky-500' },
    { icon: Heart, label: 'Infirmerie', color: 'bg-red-500' }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Légende
      </h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 text-gray-700 dark:text-gray-300"
          >
            <div className={`p-1 rounded ${item.color}`}>
              <item.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}