import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
}

export default function FilterButton({ isActive, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative group flex items-center justify-center w-12 h-12 rounded-full transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.08)] ${
        isActive 
          ? 'bg-primary text-white' 
          : 'bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
      }`}
      aria-label="Toggle filters"
    >
      <SlidersHorizontal className="w-5 h-5" />
      <div className="absolute left-full ml-2 py-1 px-2 bg-gray-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Filtres de recherche
      </div>
    </button>
  );
}