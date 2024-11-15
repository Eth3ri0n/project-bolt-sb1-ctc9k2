import React from 'react';
import { BookOpen, Calendar, MapPin } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: string;
  isbn: string;
  category: string;
  subcategory: string;
  language: string;
  pages: number;
  available: number;
  total: number;
  location: string;
  status: string;
  description: string;
  color: string;
  dueDate?: Date;
}

interface BookGridProps {
  books: Book[];
  searchQuery: string;
  selectedCategory: string;
}

export default function BookGrid({ 
  books, 
  searchQuery, 
  selectedCategory 
}: BookGridProps) {
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || 
      book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'borrowed':
        return {
          label: 'Emprunté',
          color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
        };
      case 'reserved':
        return {
          label: 'Réservé',
          color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
        };
      case 'available':
        return {
          label: 'Disponible',
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
        };
      default:
        return {
          label: status,
          color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
        };
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {filteredBooks.map((book) => (
        <div
          key={book.id}
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
        >
          <div className={`w-full aspect-[4/5] ${book.color} rounded-lg mb-4 flex items-center justify-center`}>
            <BookOpen className="w-16 h-16 text-white" />
          </div>
          
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {book.title}
              </h3>
              <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium ${getStatusConfig(book.status).color}`}>
                {getStatusConfig(book.status).label}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {book.author}
            </p>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {book.available}/{book.total} disponible(s)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {book.location}
                </span>
              </div>
            </div>

            {book.status === 'available' && (
              <button className="w-full mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                Réserver
              </button>
            )}
          </div>
        </div>
      ))}
      {filteredBooks.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
          Aucun ouvrage trouvé pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}