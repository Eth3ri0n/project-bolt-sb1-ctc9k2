import { useState, useMemo } from 'react';
import { Widget } from '../types/widget';

type SearchFilters = {
  category?: string;
  showFavorites?: boolean;
};

export function useSearch(widgets: Widget[], filters: SearchFilters = {}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWidgets = useMemo(() => {
    return widgets.filter(widget => {
      // Search query filter
      const searchMatch = !searchQuery || 
        widget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        widget.type.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const categoryMatch = !filters.category || 
        widget.section === filters.category.toLowerCase();

      // Favorites filter
      const favoriteMatch = !filters.showFavorites || 
        widget.isFavorite;

      return searchMatch && categoryMatch && favoriteMatch;
    });
  }, [widgets, searchQuery, filters]);

  return {
    searchQuery,
    setSearchQuery,
    filteredWidgets
  };
}