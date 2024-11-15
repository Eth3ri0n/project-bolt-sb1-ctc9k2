import React, { useState } from 'react';
import { HelpCircle, ChevronRight, Search, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';
import FAQModal from '../faq/FAQModal';

interface FAQWidgetProps {
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function FAQWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: FAQWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const popularQuestions = [
    {
      id: '1',
      question: 'Comment accéder à mon emploi du temps ?',
      answer: 'Vous pouvez accéder à votre emploi du temps via le widget "Emploi du temps" sur votre tableau de bord ou dans la section "Scolarité".',
      category: 'Scolarité',
      helpful: 45,
      color: 'bg-purple-500'
    },
    {
      id: '2',
      question: 'Comment réserver du matériel ?',
      answer: 'Utilisez le widget "Location de matériel" pour consulter les équipements disponibles et effectuer une réservation.',
      category: 'Équipement',
      helpful: 32,
      color: 'bg-amber-500'
    },
    {
      id: '3',
      question: 'Comment justifier une absence ?',
      answer: 'Les justificatifs d\'absence doivent être déposés via le widget "Absences & retards" dans les 48h suivant votre retour.',
      category: 'Scolarité',
      helpful: 28,
      color: 'bg-purple-500'
    }
  ];

  return (
    <>
      <BaseWidget
        title="FAQ"
        icon={<HelpCircle className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-purple-700 to-purple-600"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Questions fréquentes</h4>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium text-sm flex items-center gap-1"
            >
              Toutes les questions
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher une question..."
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
              onClick={() => setIsModalOpen(true)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          {/* Popular questions */}
          <div className="space-y-3">
            {popularQuestions.map((question) => (
              <div
                key={question.id}
                onClick={() => setIsModalOpen(true)}
                className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-1 h-full ${question.color} rounded-full`} />
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      {question.question}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {question.answer}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {question.category}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{question.helpful}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact support */}
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-purple-800 dark:text-purple-200 mb-3">
              <MessageSquare className="w-5 h-5" />
              <h5 className="font-medium">Besoin d'aide ?</h5>
            </div>
            <p className="text-sm text-purple-600 dark:text-purple-400 mb-3">
              Vous ne trouvez pas la réponse à votre question ? Contactez le support étudiant.
            </p>
            <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              Contacter le support
            </button>
          </div>
        </div>
      </BaseWidget>

      <FAQModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}