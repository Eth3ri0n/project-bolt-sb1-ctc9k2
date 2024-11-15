import React from 'react';
import { Building2, Users, MapPin, Phone } from 'lucide-react';

interface Department {
  name: string;
  head: string;
  description: string;
  location: string;
  contact: string;
}

interface DepartmentListProps {
  departments: Department[];
  searchQuery: string;
}

export default function DepartmentList({ departments, searchQuery }: DepartmentListProps) {
  const filteredDepartments = departments.filter(department =>
    department.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    department.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {filteredDepartments.map((department, index) => (
        <div
          key={index}
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {department.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {department.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Responsable : {department.head}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {department.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {department.contact}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {filteredDepartments.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Aucun département trouvé pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}