import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
  lastUpdated: Date;
}

interface QuestionListProps {
  questions: Question[];
  searchQuery: string;
  selectedCategory: string;
}

export default function QuestionList({ 
  questions, 
  searchQuery, 
  selectedCategory 
}: QuestionListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [votes, setVotes] = useState<Record<string, 'up' | 'down' | null>>({});

  const filteredQuestions = questions.filter(question => {
    const matchesSearch = 
      question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || 
      question.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const handleVote = (questionId: string, vote: 'up' | 'down') => {
    setVotes(prev => ({
      ...prev,
      [questionId]: prev[questionId] === vote ? null : vote
    }));
  };

  return (
    <div className="space-y-4">
      {filteredQuestions.map((question) => (
        <div
          key={question.id}
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
        >
          <div 
            className="flex items-start justify-between cursor-pointer"
            onClick={() => setExpandedId(expandedId === question.id ? null : question.id)}
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {question.question}
              </h3>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {question.category}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Mis à jour le {formatDate(question.lastUpdated)}</span>
                </div>
              </div>
            </div>
            {expandedId === question.id ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>

          {expandedId === question.id && (
            <div className="mt-4">
              <p className="text-gray-600 dark:text-gray-400">
                {question.answer}
              </p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Cette réponse vous a-t-elle aidé ?
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(question.id, 'up');
                    }}
                    className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                      votes[question.id] === 'up'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{question.helpful}</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVote(question.id, 'down');
                    }}
                    className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                      votes[question.id] === 'down'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>{question.notHelpful}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      {filteredQuestions.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Aucune question trouvée pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}