import React, { useState } from 'react';
import { Award, Star, ChevronRight } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';
import ResultsModal from '../results/ResultsModal';

interface Grade {
  id: string;
  subject: string;
  score: number;
  date: Date;
  type: string;
  color: string;
}

interface ResultsWidgetProps {
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function ResultsWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: ResultsWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recentGrades: Grade[] = [
    {
      id: '1',
      subject: 'Électricité',
      score: 17.00,
      date: new Date(2024, 2, 15),
      type: 'Examen',
      color: 'bg-indigo-500'
    },
    {
      id: '2',
      subject: 'Mathématiques',
      score: 9.00,
      date: new Date(2024, 2, 14),
      type: 'Contrôle',
      color: 'bg-red-500'
    },
    {
      id: '3',
      subject: 'Physique',
      score: 14.00,
      date: new Date(2024, 2, 12),
      type: 'TP',
      color: 'bg-green-500'
    },
    {
      id: '4',
      subject: 'Physique',
      score: 12.00,
      date: new Date(2024, 2, 10),
      type: 'Devoir',
      color: 'bg-yellow-500'
    }
  ];

  const formatScore = (score: number) => {
    return score.toFixed(2).replace('.', ',');
  };

  const getScoreColor = (score: number) => {
    if (score >= 14) return 'text-green-600 dark:text-green-400';
    if (score >= 10) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <>
      <BaseWidget
        title="Mes Résultats"
        icon={<Award className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-[#3E2723] to-[#4E342E]"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Dernières notes</h4>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-brown-600 hover:text-brown-700 dark:text-brown-400 dark:hover:text-brown-300 font-medium text-sm flex items-center gap-1"
            >
              Voir tout
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {recentGrades.map((grade) => (
              <div
                key={grade.id}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-1 h-12 ${grade.color} rounded-full`} />
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white">
                        {grade.subject}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {grade.type}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${getScoreColor(grade.score)}`}>
                      {formatScore(grade.score)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      /20,00
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BaseWidget>

      <ResultsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}