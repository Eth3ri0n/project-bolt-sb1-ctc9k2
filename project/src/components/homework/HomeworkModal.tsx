import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, BookMarked, GraduationCap, Clock, AlertCircle } from 'lucide-react';
import Modal from '../shared/Modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
  isSubmitted?: boolean;
}

interface Exam {
  id: string;
  subject: string;
  date: Date;
  duration: string;
  topics: string[];
  location: string;
  notes?: string;
  requirements?: string[];
}

interface HomeworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'assignments' | 'exams' | 'calendar';
  selectedAssignment?: Assignment | null;
}

export default function HomeworkModal({ 
  isOpen, 
  onClose, 
  initialTab = 'calendar',
  selectedAssignment 
}: HomeworkModalProps) {
  const [activeTab, setActiveTab] = useState<'assignments' | 'exams' | 'calendar'>(initialTab);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    if (selectedAssignment) {
      setActiveTab('assignments');
    } else {
      setActiveTab(initialTab);
    }
  }, [selectedAssignment, initialTab]);

  const assignments: Assignment[] = [
    {
      id: '1',
      subject: 'Mathématiques',
      title: 'Exercices sur les matrices',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      priority: 'high',
      type: 'devoir',
      requirements: 'Résoudre les exercices 1 à 10 du chapitre 3',
      instructions: 'Montrer tous les calculs intermédiaires',
      submissionGuidelines: 'Format PDF, une seule page par exercice'
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
      submissionGuidelines: 'Format Word ou PDF, max 10 pages'
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
      submissionGuidelines: 'Quiz en ligne à compléter après la lecture'
    }
  ];

  const exams: Exam[] = [
    {
      id: '1',
      subject: 'Mathématiques',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      duration: '3h',
      topics: ['Matrices', 'Déterminants', 'Systèmes linéaires'],
      location: 'Amphithéâtre A',
      notes: 'Calculatrice autorisée',
      requirements: [
        'Calculatrice scientifique',
        'Règle graduée',
        'Stylos bleu et rouge'
      ]
    },
    {
      id: '2',
      subject: 'Physique',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
      duration: '2h',
      topics: ['Mécanique des fluides', 'Thermodynamique'],
      location: 'Salle 201',
      notes: 'Documents non autorisés',
      requirements: [
        'Calculatrice scientifique',
        'Table de conversion',
        'Matériel d\'écriture standard'
      ]
    }
  ];

  useEffect(() => {
    if (selectedAssignment) {
      setSelectedDate(selectedAssignment.dueDate);
    }
  }, [selectedAssignment]);

  const getPriorityColor = (priority: Assignment['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
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

  const getTileClassName = ({ date }: { date: Date }) => {
    const hasAssignment = assignments.some(a => 
      a.dueDate.toDateString() === date.toDateString()
    );
    const hasExam = exams.some(e => 
      e.date.toDateString() === date.toDateString()
    );

    let classes = 'relative';

    if (hasAssignment && hasExam) {
      classes += ' bg-purple-200 dark:bg-purple-900';
    } else if (hasAssignment) {
      classes += ' bg-blue-200 dark:bg-blue-900';
    } else if (hasExam) {
      classes += ' bg-red-200 dark:bg-red-900';
    }

    return classes;
  };

  const getTileContent = ({ date }: { date: Date }) => {
    const dayAssignments = assignments.filter(a => 
      a.dueDate.toDateString() === date.toDateString()
    );
    const dayExams = exams.filter(e => 
      e.date.toDateString() === date.toDateString()
    );

    if (!dayAssignments.length && !dayExams.length) return null;

    return (
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 pb-1">
        {dayAssignments.length > 0 && (
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
        )}
        {dayExams.length > 0 && (
          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
        )}
      </div>
    );
  };

  const displayedAssignments = selectedAssignment 
    ? assignments.filter(a => a.id === selectedAssignment.id)
    : assignments;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Planning académique" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'calendar'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>Calendrier</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'assignments'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookMarked className="w-4 h-4" />
              <span>Devoirs</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('exams')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'exams'
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Examens</span>
            </div>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === 'calendar' && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-7/12">
                <Calendar
                  onChange={setSelectedDate}
                  value={selectedDate}
                  tileClassName={getTileClassName}
                  tileContent={getTileContent}
                  prevLabel={<ChevronLeft className="w-4 h-4" />}
                  nextLabel={<ChevronRight className="w-4 h-4" />}
                  className="w-full rounded-xl border-none shadow-sm"
                />
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-200 dark:bg-blue-900" />
                    <span>Devoirs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-200 dark:bg-red-900" />
                    <span>Examens</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-200 dark:bg-purple-900" />
                    <span>Les deux</span>
                  </div>
                </div>
              </div>

              <div className="md:w-5/12">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    {formatDate(selectedDate)}
                  </h3>
                  
                  {assignments.some(a => a.dueDate.toDateString() === selectedDate.toDateString()) && (
                    <div className="mb-8">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                        Devoirs à rendre
                      </h4>
                      <div className="space-y-4">
                        {assignments
                          .filter(a => a.dueDate.toDateString() === selectedDate.toDateString())
                          .map(assignment => (
                            <div
                              key={assignment.id}
                              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`w-2 h-2 rounded-full ${getPriorityColor(assignment.priority)}`} />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                  {assignment.subject}
                                </span>
                              </div>
                              <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                {assignment.title}
                              </h5>
                              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <p><strong>Consignes :</strong> {assignment.requirements}</p>
                                <p><strong>Instructions :</strong> {assignment.instructions}</p>
                                <p><strong>Soumission :</strong> {assignment.submissionGuidelines}</p>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}

                  {exams.some(e => e.date.toDateString() === selectedDate.toDateString()) && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                        Examens prévus
                      </h4>
                      <div className="space-y-4">
                        {exams
                          .filter(e => e.date.toDateString() === selectedDate.toDateString())
                          .map(exam => (
                            <div
                              key={exam.id}
                              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                                  {exam.subject}
                                </h5>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {exam.duration}
                                </span>
                              </div>
                              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                <div>
                                  <strong>Lieu :</strong> {exam.location}
                                </div>
                                <div>
                                  <strong>Sujets couverts :</strong>
                                  <ul className="list-disc list-inside mt-1 ml-2">
                                    {exam.topics.map((topic, index) => (
                                      <li key={index}>{topic}</li>
                                    ))}
                                  </ul>
                                </div>
                                {exam.requirements && (
                                  <div>
                                    <strong>Matériel requis :</strong>
                                    <ul className="list-disc list-inside mt-1 ml-2">
                                      {exam.requirements.map((req, index) => (
                                        <li key={index}>{req}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {exam.notes && (
                                  <div>
                                    <strong>Notes :</strong> {exam.notes}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}

                  {!assignments.some(a => a.dueDate.toDateString() === selectedDate.toDateString()) &&
                   !exams.some(e => e.date.toDateString() === selectedDate.toDateString()) && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Aucun événement prévu pour cette date
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-6">
              {displayedAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2 h-2 rounded-full ${getPriorityColor(assignment.priority)}`} />
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {assignment.subject}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {assignment.title}
                      </h3>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Pour le {formatDate(assignment.dueDate)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Consignes</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {assignment.requirements}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Instructions</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {assignment.instructions}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Soumission</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {assignment.submissionGuidelines}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'exams' && (
            <div className="space-y-6">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {exam.subject}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                        Examen - {formatDate(exam.date)}
                      </h3>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Durée : {exam.duration}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Sujets couverts
                      </h4>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm space-y-1">
                        {exam.topics.map((topic, index) => (
                          <li key={index}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Informations pratiques
                      </h4>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <p>Lieu : {exam.location}</p>
                        {exam.notes && <p>Notes : {exam.notes}</p>}
                        {exam.requirements && (
                          <div>
                            <p className="font-medium mb-1">Matériel requis :</p>
                            <ul className="list-disc list-inside ml-2">
                              {exam.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}