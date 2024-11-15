import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory?: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    'Scolarité',
    'Organisation',
    'Administration',
    'Compte'
  ];

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <span className="text-gray-600 dark:text-gray-300">Catégories :</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 py-1.5 px-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <span className="font-medium text-gray-900 dark:text-white">
            {selectedCategory || 'Toutes'}
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-lg shadow-lg py-2 z-50 dark:bg-gray-800 dark:border dark:border-gray-700">
          <button
            onClick={() => handleCategorySelect('')}
            className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors dark:hover:bg-gray-700 ${
              !selectedCategory ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-200'
            }`}
          >
            Toutes
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors dark:hover:bg-gray-700 ${
                selectedCategory === category ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}