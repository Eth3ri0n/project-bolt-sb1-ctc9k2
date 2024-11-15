import React from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Que recherchez-vous ?" 
}: SearchInputProps) {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 pl-12 pr-4 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border-2 border-transparent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all dark:bg-gray-800 dark:text-white"
      />
      <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
}