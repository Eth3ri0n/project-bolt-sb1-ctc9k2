import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  Users,
  Search,
  Building2,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Filter,
  ChevronRight,
  BookOpen,
  Briefcase,
  Globe
} from 'lucide-react';
import ContactList from './ContactList';
import DepartmentList from './DepartmentList';
import ServiceList from './ServiceList';

interface DirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DirectoryModal({ isOpen, onClose }: DirectoryModalProps) {
  const [activeTab, setActiveTab] = useState<'contacts' | 'departments' | 'services'>('contacts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

  const contacts = [
    {
      id: '1',
      name: 'Dr. Martin Dubois',
      role: 'Directeur du département Génie Mécanique',
      department: 'Génie Mécanique',
      email: 'm.dubois@enit.fr',
      phone: '05 62 44 27 01',
      office: 'B204',
      subjects: ['Mécanique des fluides', 'Thermodynamique'],
      consultationHours: 'Mardi 14h-16h'
    },
    {
      id: '2',
      name: 'Dr. Sophie Bernard',
      role: 'Responsable Relations Internationales',
      department: 'Relations Internationales',
      email: 's.bernard@enit.fr',
      phone: '05 62 44 27 02',
      office: 'A105',
      consultationHours: 'Lundi et Jeudi 9h-12h'
    },
    {
      id: '3',
      name: 'Dr. Philippe Martin',
      role: 'Professeur - Génie Industriel',
      department: 'Génie Industriel',
      email: 'p.martin@enit.fr',
      phone: '05 62 44 27 03',
      office: 'C304',
      subjects: ['Gestion de production', 'Qualité'],
      consultationHours: 'Mercredi 10h-12h'
    }
  ];

  const departments = [
    {
      name: 'Génie Mécanique',
      head: 'Dr. Martin Dubois',
      description: 'Formation en conception mécanique et matériaux',
      location: 'Bâtiment B',
      contact: '05 62 44 27 01'
    },
    {
      name: 'Génie Industriel',
      head: 'Dr. Philippe Martin',
      description: 'Formation en gestion de production et qualité',
      location: 'Bâtiment C',
      contact: '05 62 44 27 03'
    },
    {
      name: 'Relations Internationales',
      head: 'Dr. Sophie Bernard',
      description: 'Gestion des échanges et partenariats internationaux',
      location: 'Bâtiment A',
      contact: '05 62 44 27 02'
    }
  ];

  const services = [
    {
      name: 'Service Scolarité',
      description: 'Gestion administrative des étudiants',
      location: 'Bâtiment A - RDC',
      contact: 'scolarite@enit.fr',
      hours: 'Lun-Ven: 9h-12h, 14h-16h'
    },
    {
      name: 'Service Informatique',
      description: 'Support technique et maintenance',
      location: 'Bâtiment B - 1er étage',
      contact: 'support@enit.fr',
      hours: 'Lun-Ven: 8h-18h'
    },
    {
      name: 'Bibliothèque',
      description: 'Centre de documentation et ressources',
      location: 'Bâtiment C - RDC',
      contact: 'bibliotheque@enit.fr',
      hours: 'Lun-Ven: 8h30-19h'
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Annuaire universitaire" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'contacts'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Personnel</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'departments'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Départements</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'services'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Services</span>
            </div>
          </button>
        </div>

        {/* Search and filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Rechercher ${
                activeTab === 'contacts' ? 'une personne' :
                activeTab === 'departments' ? 'un département' :
                'un service'
              }...`}
              className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          {activeTab === 'contacts' && (
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="h-12 px-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            >
              <option value="">Tous les départements</option>
              {departments.map((dept) => (
                <option key={dept.name} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'contacts' && (
            <ContactList 
              contacts={contacts}
              searchQuery={searchQuery}
              selectedDepartment={selectedDepartment}
            />
          )}

          {activeTab === 'departments' && (
            <DepartmentList 
              departments={departments}
              searchQuery={searchQuery}
            />
          )}

          {activeTab === 'services' && (
            <ServiceList 
              services={services}
              searchQuery={searchQuery}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}