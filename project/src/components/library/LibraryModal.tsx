import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  Library,
  Search,
  Filter,
  BookOpen,
  Clock,
  Calendar,
  ArrowUpDown,
  BookMarked,
  History,
  Grid,
  List
} from 'lucide-react';
import BookList from './BookList';
import BookGrid from './BookGrid';
import BorrowedBooks from './BorrowedBooks';

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LibraryModal({ isOpen, onClose }: LibraryModalProps) {
  const [activeTab, setActiveTab] = useState<'catalog' | 'borrowed' | 'history'>('catalog');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const books = [
    {
      id: '1',
      title: 'Mécanique des fluides',
      author: 'Frank M. White',
      publisher: 'McGraw-Hill Education',
      year: '2015',
      isbn: '978-0073398273',
      category: 'Engineering',
      subcategory: 'Mechanical',
      language: 'Français',
      pages: 864,
      available: 2,
      total: 3,
      location: 'Section A, Étagère 3',
      dueDate: new Date(2024, 2, 25),
      status: 'borrowed',
      description: 'Un ouvrage de référence en mécanique des fluides, couvrant les principes fondamentaux et les applications pratiques.',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      publisher: 'MIT Press',
      year: '2009',
      isbn: '978-0262033848',
      category: 'Computer Science',
      subcategory: 'Algorithms',
      language: 'Anglais',
      pages: 1312,
      available: 1,
      total: 2,
      location: 'Section B, Étagère 1',
      status: 'reserved',
      description: 'Une référence complète sur les algorithmes, utilisée dans de nombreuses universités.',
      color: 'bg-purple-500'
    },
    {
      id: '3',
      title: 'Materials Science and Engineering',
      author: 'William D. Callister',
      publisher: 'Wiley',
      year: '2013',
      isbn: '978-1118324578',
      category: 'Engineering',
      subcategory: 'Materials',
      language: 'Anglais',
      pages: 992,
      available: 3,
      total: 3,
      location: 'Section A, Étagère 5',
      status: 'available',
      description: 'Une introduction complète à la science des matériaux et à l\'ingénierie.',
      color: 'bg-green-500'
    }
  ];

  const categories = [
    { id: '1', name: 'Engineering', count: 156 },
    { id: '2', name: 'Computer Science', count: 89 },
    { id: '3', name: 'Mathematics', count: 124 },
    { id: '4', name: 'Physics', count: 78 }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Bibliothèque universitaire" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'catalog'
                ? 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Catalogue</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('borrowed')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'borrowed'
                ? 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookMarked className="w-4 h-4" />
              <span>Mes emprunts</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'history'
                ? 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <History className="w-4 h-4" />
              <span>Historique</span>
            </div>
          </button>
        </div>

        {/* Search and filters */}
        {activeTab === 'catalog' && (
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par titre, auteur, ISBN..."
                className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 px-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:border-transparent"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-400'
                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-400'
                    : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'catalog' && viewMode === 'list' && (
            <BookList 
              books={books}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          )}

          {activeTab === 'catalog' && viewMode === 'grid' && (
            <BookGrid 
              books={books}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          )}

          {activeTab === 'borrowed' && (
            <BorrowedBooks books={books.filter(b => b.status === 'borrowed')} />
          )}

          {activeTab === 'history' && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Historique des emprunts à venir...
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}