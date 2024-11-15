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

interface BookListProps {
  books: Book[];
  searchQuery: string;
  selectedCategory: string;
}

export default function BookList({ 
  books, 
  searchQuery, 
  selectedCategory 
}: BookListProps) {
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
    <div className="space-y-4">
      {filteredBooks.map((book) => (
        <div
          key={book.id}
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className={`w-1 h-full ${book.color} rounded-full`} />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {book.author}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusConfig(book.status).color}`}>
                  {getStatusConfig(book.status).label}
                </span>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mt-4">
                {book.description}
              </p>

              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {book.available} sur {book.total} disponible(s)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {book.location}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">ISBN:</span> {book.isbn}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Langue:</span> {book.language}
                  </p>
                </div>
              </div>

              {book.status === 'available' && (
                <button className="mt-4 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                  Réserver
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
      {filteredBooks.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Aucun ouvrage trouvé pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}