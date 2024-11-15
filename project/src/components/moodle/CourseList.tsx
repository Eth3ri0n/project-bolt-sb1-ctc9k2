import React from 'react';
import { Users, MessageSquare, FileText, Clock, MapPin } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  professor: string;
  schedule: string;
  room: string;
  progress: number;
  color: string;
  resources: number;
  assignments: number;
  announcements: number;
}

interface CourseListProps {
  courses: Course[];
  searchQuery: string;
}

export default function CourseList({ courses, searchQuery }: CourseListProps) {
  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.professor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {filteredCourses.map((course) => (
        <div
          key={course.id}
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className={`w-1 h-full ${course.color} rounded-full`} />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {course.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {course.professor}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      Progression
                    </div>
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {course.progress}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {course.schedule}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Salle {course.room}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Ressources</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                    {course.resources}
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">Devoirs</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                    {course.assignments}
                  </div>
                </div>
                <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">Annonces</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                    {course.announcements}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {filteredCourses.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Aucun cours trouvé pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}