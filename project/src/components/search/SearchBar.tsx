import React, { useState } from 'react';
import SearchInput from './SearchInput';
import FilterButton from './FilterButton';
import FavoriteButton from './FavoriteButton';
import CategoryFilter from './CategoryFilter';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onToggleFavorites: (enabled: boolean) => void;
  searchQuery: string;
  selectedCategory?: string;
  showFavorites: boolean;
}

export default function SearchBar({ 
  onSearch, 
  onCategoryChange, 
  onToggleFavorites,
  searchQuery,
  selectedCategory,
  showFavorites
}: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <SearchInput 
          value={searchQuery}
          onChange={onSearch}
        />

        <div className="flex items-center gap-4">
          <FilterButton 
            isActive={showFilters} 
            onClick={() => setShowFilters(!showFilters)} 
          />
          <FavoriteButton 
            isActive={showFavorites} 
            onClick={() => onToggleFavorites(!showFavorites)} 
          />
        </div>
      </div>

      {showFilters && (
        <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)] space-y-4 dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange} 
            />
          </div>
        </div>
      )}
    </div>
  );
}