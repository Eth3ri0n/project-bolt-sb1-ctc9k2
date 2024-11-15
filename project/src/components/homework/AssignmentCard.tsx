import React from 'react';
import { Calendar, Clock, AlertCircle, BookMarked, CheckCircle2, Star } from 'lucide-react';

interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  type: 'devoir' | 'projet' | 'lecture';
  isCompleted?: boolean;
}

interface AssignmentCardProps {
  assignment: Assignment;
  onClick: () => void;
  onToggleComplete: (id: string) => void;
  onChangePriority: (id: string, priority: Assignment['priority']) => void;
}

export default function AssignmentCard({ 
  assignment, 
  onClick, 
  onToggleComplete,
  onChangePriority 
}: AssignmentCardProps) {
  const getPriorityColor = (priority: Assignment['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityLabel = (priority: Assignment['priority']) => {
    switch (priority) {
      case 'high': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
    }
  };

  const getTypeIcon = (type: Assignment['type']) => {
    switch (type) {
      case 'devoir':
        return <BookMarked className="w-4 h-4" />;
      case 'projet':
        return <AlertCircle className="w-4 h-4" />;
      case 'lecture':
        return <Clock className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatDueDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Aujourd\'hui';
    if (diffDays === 1) return 'Demain';
    if (diffDays <= 7) return `Dans ${diffDays} jours`;
    
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  const handlePriorityChange = (e: React.MouseEvent<HTMLDivElement>, priority: Assignment['priority']) => {
    e.stopPropagation();
    onChangePriority(assignment.id, priority);
  };

  const handleToggleComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggleComplete(assignment.id);
  };

  return (
    <div
      onClick={onClick}
      className={`bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer relative ${
        assignment.isCompleted ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative">
              <div 
                className={`w-2 h-2 rounded-full ${getPriorityColor(assignment.priority)} hover:ring-2 hover:ring-offset-2 hover:ring-gray-300 dark:hover:ring-gray-600 transition-all cursor-pointer`}
                aria-label="Change priority"
              >
                <div className="peer absolute inset-0" />
                <div className="absolute left-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 invisible opacity-0 peer-hover:visible peer-hover:opacity-100 hover:visible hover:opacity-100 transition-all z-10 min-w-[120px]">
                  {(['high', 'medium', 'low'] as const).map((priority) => (
                    <div
                      key={priority}
                      onClick={(e) => handlePriorityChange(e, priority)}
                      className="flex items-center gap-2 w-full px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm cursor-pointer"
                    >
                      <span className={`w-2 h-2 rounded-full ${getPriorityColor(priority)}`} />
                      <span className="text-gray-700 dark:text-gray-200">{getPriorityLabel(priority)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {assignment.subject}
            </span>
          </div>
          <h5 className={`font-semibold text-gray-900 dark:text-white mb-2 ${
            assignment.isCompleted ? 'line-through' : ''
          }`}>
            {assignment.title}
          </h5>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDueDate(assignment.dueDate)}</span>
            </div>
            <div className="flex items-center gap-1">
              {getTypeIcon(assignment.type)}
              <span className="capitalize">{assignment.type}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleToggleComplete}
          className={`shrink-0 p-1.5 rounded-full transition-colors ${
            assignment.isCompleted
              ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
              : 'bg-gray-100 text-gray-400 hover:text-gray-600 dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-300'
          }`}
          aria-label={assignment.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <CheckCircle2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}