import React from 'react';
import { Calendar, FileText, CheckSquare, AlertCircle } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: Date;
  type: string;
  status: 'pending' | 'submitted' | 'graded';
  grade: number | null;
  maxGrade: number;
}

interface AssignmentListProps {
  assignments: Assignment[];
  searchQuery: string;
}

export default function AssignmentList({ assignments, searchQuery }: AssignmentListProps) {
  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getStatusConfig = (status: Assignment['status']) => {
    switch (status) {
      case 'pending':
        return {
          color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
          icon: AlertCircle,
          label: 'À rendre'
        };
      case 'submitted':
        return {
          color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
          icon: CheckSquare,
          label: 'Rendu'
        };
      case 'graded':
        return {
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
          icon: CheckSquare,
          label: 'Noté'
        };
    }
  };

  return (
    <div className="space-y-4">
      {filteredAssignments.map((assignment) => {
        const statusConfig = getStatusConfig(assignment.status);
        const StatusIcon = statusConfig.icon;

        return (
          <div
            key={assignment.id}
            className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {assignment.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {assignment.course}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${statusConfig.color}`}>
                <StatusIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{statusConfig.label}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  À rendre le {formatDate(assignment.dueDate)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {assignment.type}
                </span>
              </div>
            </div>

            {assignment.grade !== null && (
              <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg inline-block">
                <div className="text-sm text-gray-600 dark:text-gray-400">Note</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {assignment.grade}/{assignment.maxGrade}
                </div>
              </div>
            )}
          </div>
        );
      })}
      {filteredAssignments.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Aucun devoir trouvé pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}