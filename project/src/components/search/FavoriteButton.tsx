import React from 'react';
import { Star } from 'lucide-react';

interface FavoriteButtonProps {
  isActive: boolean;
  onClick: () => void;
}

export default function FavoriteButton({ isActive, onClick }: FavoriteButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.08)] ${
        isActive 
          ? 'bg-primary text-white' 
          : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
      }`}
    >
      <Star className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
      <span className="hidden md:inline">Favoris</span>
    </button>
  );
}