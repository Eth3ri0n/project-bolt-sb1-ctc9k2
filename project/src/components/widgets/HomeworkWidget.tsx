import React, { useState } from 'react';
import { BookMarked, Calendar, Clock, AlertCircle } from 'lucide-react';
import BaseWidget from './BaseWidget';
import HomeworkModal from '../homework/HomeworkModal';
import { Notification } from '../../types/widget';
import AssignmentCard from '../homework/AssignmentCard';

interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  type: 'devoir' | 'projet' | 'lecture';
  requirements?: string;
  instructions?: string;
  submissionGuidelines?: string;
  isCompleted?: boolean;
}

interface HomeworkWidgetProps {
  onToggleFavorite?: () => void;
  onOpenSettings?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function HomeworkWidget({
  onToggleFavorite,
  onOpenSettings,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: HomeworkWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      subject: 'Mathématiques',
      title: 'Exercices sur les matrices',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      priority: 'high',
      type: 'devoir',
      requirements: 'Résoudre les exercices 1 à 10 du chapitre 3',
      instructions: 'Montrer tous les calculs intermédiaires',
      submissionGuidelines: 'Format PDF, une seule page par exercice',
      isCompleted: false
    },
    {
      id: '2',
      subject: 'Physique',
      title: 'Rapport de TP - Mécanique des fluides',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      priority: 'medium',
      type: 'projet',
      requirements: 'Analyse complète des données expérimentales',
      instructions: 'Inclure graphiques et tableaux de mesures',
      submissionGuidelines: 'Format Word ou PDF, max 10 pages',
      isCompleted: false
    },
    {
      id: '3',
      subject: 'Informatique',
      title: 'Lecture - Introduction à l\'IA',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
      priority: 'low',
      type: 'lecture',
      requirements: 'Chapitres 1-3 du livre de cours',
      instructions: 'Préparer un résumé des points clés',
      submissionGuidelines: 'Quiz en ligne à compléter après la lecture',
      isCompleted: false
    }
  ]);

  const handleAssignmentClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleToggleComplete = (id: string) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === id 
        ? { ...assignment, isCompleted: !assignment.isCompleted }
        : assignment
    ));
  };

  const handleChangePriority = (id: string, priority: Assignment['priority']) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === id 
        ? { ...assignment, priority }
        : assignment
    ));
  };

  // Sort assignments by priority (high -> medium -> low) and completion status
  const sortedAssignments = [...assignments].sort((a, b) => {
    if (a.isCompleted && !b.isCompleted) return 1;
    if (!a.isCompleted && b.isCompleted) return -1;
    
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <>
      <BaseWidget
        title="Travail à faire"
        icon={<BookMarked className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-purple-700 to-purple-900"
        onToggleFavorite={onToggleFavorite}
        onOpenSettings={onOpenSettings}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Devoirs à rendre</h4>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium text-sm"
            >
              Voir tout
            </button>
          </div>

          <div className="space-y-4">
            {sortedAssignments.map((assignment) => (
              <AssignmentCard
                key={assignment.id}
                assignment={assignment}
                onClick={() => handleAssignmentClick(assignment)}
                onToggleComplete={handleToggleComplete}
                onChangePriority={handleChangePriority}
              />
            ))}
          </div>
        </div>
      </BaseWidget>

      <HomeworkModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAssignment(null);
        }}
        initialTab={selectedAssignment ? 'assignments' : 'calendar'}
        selectedAssignment={selectedAssignment}
      />
    </>
  );
}