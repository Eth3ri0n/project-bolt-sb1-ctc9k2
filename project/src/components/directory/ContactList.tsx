import React from 'react';
import { Mail, Phone, MapPin, Clock, BookOpen } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  subjects?: string[];
  consultationHours: string;
}

interface ContactListProps {
  contacts: Contact[];
  searchQuery: string;
  selectedDepartment: string;
}

export default function ContactList({ 
  contacts, 
  searchQuery, 
  selectedDepartment 
}: ContactListProps) {
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = !selectedDepartment || 
      contact.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {filteredContacts.map((contact) => (
        <div
          key={contact.id}
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {contact.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {contact.role}
              </p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-sm">
              {contact.department}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <a 
                  href={`mailto:${contact.email}`}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  {contact.phone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  Bureau {contact.office}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  {contact.consultationHours}
                </span>
              </div>
              {contact.subjects && (
                <div className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-gray-400 mt-1" />
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 block mb-1">
                      Matières enseignées :
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {contact.subjects.map((subject, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm text-gray-600 dark:text-gray-400"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {filteredContacts.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Aucun contact trouvé pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}