import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Users,
  MessageSquare,
  Download,
  Upload,
  CheckSquare,
  AlertCircle,
  Search,
  Filter
} from 'lucide-react';
import CourseList from './CourseList';
import AssignmentList from './AssignmentList';
import ResourceList from './ResourceList';

interface MoodleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MoodleModal({ isOpen, onClose }: MoodleModalProps) {
  const [activeTab, setActiveTab] = useState<'courses' | 'assignments' | 'resources'>('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<1 | 2>(1);

  const courses = [
    {
      id: '1',
      name: 'Mécanique des fluides',
      professor: 'Dr. Martin',
      schedule: 'Lundi 8h-10h',
      room: 'A204',
      progress: 75,
      color: 'bg-blue-500',
      resources: 12,
      assignments: 3,
      announcements: 2
    },
    {
      id: '2',
      name: 'Résistance des matériaux',
      professor: 'Dr. Dubois',
      schedule: 'Mardi 14h-16h',
      room: 'B102',
      progress: 60,
      color: 'bg-purple-500',
      resources: 8,
      assignments: 2,
      announcements: 1
    },
    {
      id: '3',
      name: 'Automatique',
      professor: 'Dr. Bernard',
      schedule: 'Jeudi 10h-12h',
      room: 'C305',
      progress: 45,
      color: 'bg-green-500',
      resources: 15,
      assignments: 4,
      announcements: 3
    }
  ];

  const assignments = [
    {
      id: '1',
      title: 'TP Mécanique des fluides',
      course: 'Mécanique des fluides',
      dueDate: new Date(2024, 2, 20),
      type: 'report',
      status: 'pending',
      grade: null,
      maxGrade: 20
    },
    {
      id: '2',
      title: 'Projet RDM',
      course: 'Résistance des matériaux',
      dueDate: new Date(2024, 2, 22),
      type: 'project',
      status: 'submitted',
      grade: 16,
      maxGrade: 20
    },
    {
      id: '3',
      title: 'QCM Automatique',
      course: 'Automatique',
      dueDate: new Date(2024, 2, 18),
      type: 'quiz',
      status: 'graded',
      grade: 15,
      maxGrade: 20
    }
  ];

  const resources = [
    {
      id: '1',
      title: 'Cours Mécanique des fluides - Chapitre 1',
      course: 'Mécanique des fluides',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: new Date(2024, 2, 10),
      downloads: 45
    },
    {
      id: '2',
      title: 'TD2 - Résistance des matériaux',
      course: 'Résistance des matériaux',
      type: 'pdf',
      size: '1.8 MB',
      uploadDate: new Date(2024, 2, 12),
      downloads: 32
    },
    {
      id: '3',
      title: 'Support TP Automatique',
      course: 'Automatique',
      type: 'pdf',
      size: '3.1 MB',
      uploadDate: new Date(2024, 2, 15),
      downloads: 28
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Moodle ENIT" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Semester selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedSemester(1)}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedSemester === 1
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              Semestre 1
            </button>
            <button
              onClick={() => setSelectedSemester(2)}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedSemester === 2
                  ? 'bg-orange-500 text-white'
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
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'courses'
                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Mes cours</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'assignments'
                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Devoirs</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'resources'
                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Ressources</span>
            </div>
          </button>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Rechercher des ${
              activeTab === 'courses' ? 'cours' :
              activeTab === 'assignments' ? 'devoirs' : 'ressources'
            }...`}
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'courses' && (
            <CourseList 
              courses={courses}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'assignments' && (
            <AssignmentList 
              assignments={assignments}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'resources' && (
            <ResourceList 
              resources={resources}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}