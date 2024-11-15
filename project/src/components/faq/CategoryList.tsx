import React from 'react';
import { Tag, ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  count: number;
}

interface CategoryListProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
}

export default function CategoryList({ categories, onCategorySelect }: CategoryListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {category.count} questions
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      ))}
    </div>
  );
}