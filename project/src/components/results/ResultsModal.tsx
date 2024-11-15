import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { Award, ChevronLeft, ChevronRight, Calendar, FileText } from 'lucide-react';
import GradesList from './GradesList';
import GradesStats from './GradesStats';

interface Grade {
  id: string;
  subject: string;
  score: number;
  date: Date;
  type: string;
  color: string;
  coefficient?: number;
  professor?: string;
  comments?: string;
}

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResultsModal({ isOpen, onClose }: ResultsModalProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'stats'>('list');
  const [selectedSemester, setSelectedSemester] = useState<1 | 2>(1);

  const grades: Grade[] = [
    {
      id: '1',
      subject: 'Électricité',
      score: 17.00,
      date: new Date(2024, 2, 15),
      type: 'Examen',
      color: 'bg-indigo-500',
      coefficient: 3,
      professor: 'Dr. Martin',
      comments: 'Excellent travail, continuez ainsi!'
    },
    {
      id: '2',
      subject: 'Mathématiques',
      score: 9.00,
      date: new Date(2024, 2, 14),
      type: 'Contrôle',
      color: 'bg-red-500',
      coefficient: 2,
      professor: 'Dr. Dubois',
      comments: 'Des difficultés sur les dérivées partielles. Revoir le chapitre 4.'
    },
    {
      id: '3',
      subject: 'Physique',
      score: 14.00,
      date: new Date(2024, 2, 12),
      type: 'TP',
      color: 'bg-green-500',
      coefficient: 1,
      professor: 'Dr. Bernard',
      comments: 'Bon rapport de TP, méthodologie bien appliquée.'
    },
    {
      id: '4',
      subject: 'Physique',
      score: 12.00,
      date: new Date(2024, 2, 10),
      type: 'Devoir',
      color: 'bg-yellow-500',
      coefficient: 1,
      professor: 'Dr. Bernard'
    }
  ];

  const stats = {
    average: 13.25,
    highest: 17.00,
    lowest: 9.00,
    totalCoefficients: 7,
    weightedAverage: 13.57,
    subjectAverages: {
      'Électricité': 17.00,
      'Mathématiques': 9.00,
      'Physique': 13.00
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mes Résultats" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Semester selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedSemester(1)}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedSemester === 1
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Semestre 1
            </button>
            <button
              onClick={() => setSelectedSemester(2)}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedSemester === 2
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Semestre 2
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'list'
                ? 'bg-brown-100 text-brown-700 dark:bg-brown-900 dark:text-brown-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Notes détaillées</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'stats'
                ? 'bg-brown-100 text-brown-700 dark:bg-brown-900 dark:text-brown-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Statistiques</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'list' && <GradesList grades={grades} />}
          {activeTab === 'stats' && <GradesStats stats={stats} />}
        </div>
      </div>
    </Modal>
  );
}