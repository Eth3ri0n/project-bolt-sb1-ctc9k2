import React from 'react';
import { BookOpen, Calendar, MapPin, AlertCircle } from 'lucide-react';

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

interface BorrowedBooksProps {
  books: Book[];
}

export default function BorrowedBooks({ books }: BorrowedBooksProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getDaysUntilDue = (dueDate: Date) => {
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
            <BookOpen className="w-5 h-5" />
            <span>Emprunts en cours</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {books.length}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
            <Calendar className="w-5 h-5" />
            <span>À rendre bientôt</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {books.filter(b => b.dueDate && getDaysUntilDue(b.dueDate) <= 7).length}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
            <AlertCircle className="w-5 h-5" />
            <span>En retard</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {books.filter(b => b.dueDate && getDaysUntilDue(b.dueDate) < 0).length}
          </p>
        </div>
      </div>

      {/* Book list */}
      <div className="space-y-4">
        {books.map((book) => {
          const daysUntilDue = book.dueDate ? getDaysUntilDue(book.dueDate) : null;
          const isLate = daysUntilDue !== null && daysUntilDue < 0;
          const isCloseToDue = daysUntilDue !== null && daysUntilDue <= 7 && daysUntilDue >= 0;

          return (
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
                    {book.dueDate && (
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isLate
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                          : isCloseToDue
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {isLate
                          ? `En retard de ${Math.abs(daysUntilDue)} jours`
                          : `À rendre dans ${daysUntilDue} jours`}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Date de retour : {book.dueDate ? formatDate(book.dueDate) : 'Non définie'}
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

                  {book.dueDate && (
                    <div className="mt-4 flex gap-2">
                      <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors">
                        Prolonger l'emprunt
                      </button>
                      <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
                        Déclarer un retour
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {books.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Aucun emprunt en cours
          </div>
        )}
      </div>
    </div>
  );
}