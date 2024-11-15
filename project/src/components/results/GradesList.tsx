import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';

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

interface GradesListProps {
  grades: Grade[];
}

export default function GradesList({ grades }: GradesListProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const formatScore = (score: number) => {
    return score.toFixed(2).replace('.', ',');
  };

  const getScoreColor = (score: number) => {
    if (score >= 14) return 'text-green-600 dark:text-green-400';
    if (score >= 10) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-6">
      {grades.map((grade) => (
        <div
          key={grade.id}
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 space-y-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-1 h-12 ${grade.color} rounded-full`} />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {grade.subject}
                </h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {grade.type}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(grade.date)}
                  </span>
                  {grade.coefficient && (
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Coefficient {grade.coefficient}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-3xl font-bold ${getScoreColor(grade.score)}`}>
                {formatScore(grade.score)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                /20,00
              </p>
            </div>
          </div>

          {(grade.professor || grade.comments) && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {grade.professor && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span className="font-medium">Professeur :</span> {grade.professor}
                </p>
              )}
              {grade.comments && (
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>{grade.comments}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}