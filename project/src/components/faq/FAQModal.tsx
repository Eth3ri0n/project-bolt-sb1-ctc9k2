import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  HelpCircle,
  Search,
  Filter,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  ChevronDown,
  Tag,
  Clock,
  Bookmark
} from 'lucide-react';
import QuestionList from './QuestionList';
import CategoryList from './CategoryList';
import ContactSupport from './ContactSupport';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FAQModal({ isOpen, onClose }: FAQModalProps) {
  const [activeTab, setActiveTab] = useState<'browse' | 'categories' | 'contact'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const questions = [
    {
      id: '1',
      question: 'Comment accéder à mon emploi du temps ?',
      answer: 'Vous pouvez accéder à votre emploi du temps via le widget "Emploi du temps" sur votre tableau de bord ou dans la section "Scolarité". L\'emploi du temps est mis à jour en temps réel et vous pouvez le synchroniser avec votre calendrier personnel.',
      category: 'Scolarité',
      helpful: 45,
      notHelpful: 3,
      lastUpdated: new Date(2024, 2, 15)
    },
    {
      id: '2',
      question: 'Comment réserver du matériel ?',
      answer: 'Utilisez le widget "Location de matériel" pour consulter les équipements disponibles et effectuer une réservation. Vous pouvez voir la disponibilité en temps réel, réserver jusqu\'à 2 semaines à l\'avance et prolonger votre réservation si nécessaire.',
      category: 'Équipement',
      helpful: 32,
      notHelpful: 5,
      lastUpdated: new Date(2024, 2, 14)
    },
    {
      id: '3',
      question: 'Comment justifier une absence ?',
      answer: 'Les justificatifs d\'absence doivent être déposés via le widget "Absences & retards" dans les 48h suivant votre retour. Les documents acceptés sont : certificats médicaux, convocations officielles, etc. Un email de confirmation vous sera envoyé une fois le justificatif validé.',
      category: 'Scolarité',
      helpful: 28,
      notHelpful: 2,
      lastUpdated: new Date(2024, 2, 12)
    }
  ];

  const categories = [
    { id: '1', name: 'Scolarité', count: 15 },
    { id: '2', name: 'Équipement', count: 8 },
    { id: '3', name: 'Bibliothèque', count: 12 },
    { id: '4', name: 'Vie étudiante', count: 10 }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="FAQ" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'browse'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>Questions</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'categories'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>Catégories</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'contact'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Contact</span>
            </div>
          </button>
        </div>

        {/* Search and filters */}
        {activeTab === 'browse' && (
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une question..."
                className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 px-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'browse' && (
            <QuestionList 
              questions={questions}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          )}

          {activeTab === 'categories' && (
            <CategoryList 
              categories={categories}
              onCategorySelect={setSelectedCategory}
            />
          )}

          {activeTab === 'contact' && (
            <ContactSupport />
          )}
        </div>
      </div>
    </Modal>
  );
}