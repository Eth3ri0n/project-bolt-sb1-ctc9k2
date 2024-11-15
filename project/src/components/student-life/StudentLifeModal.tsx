import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  Users,
  Calendar,
  Trophy,
  Heart,
  Music,
  Utensils,
  Home,
  Bike,
  BookOpen,
  Briefcase,
  GraduationCap,
  Globe,
  MapPin,
  Mail
} from 'lucide-react';

// Rest of the file remains exactly the same
interface StudentLifeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentLifeModal({ isOpen, onClose }: StudentLifeModalProps) {
  const [activeTab, setActiveTab] = useState<'events' | 'associations' | 'services' | 'international'>('events');

  const events = [
    {
      id: '1',
      title: 'Soirée d\'intégration',
      date: new Date(2024, 2, 20),
      description: 'Soirée de bienvenue pour les nouveaux étudiants',
      location: 'Campus ENIT',
      type: 'social',
      icon: Music,
      color: 'bg-purple-500'
    },
    {
      id: '2',
      title: 'Tournoi sportif inter-écoles',
      date: new Date(2024, 2, 25),
      description: 'Compétitions sportives entre les écoles d\'ingénieurs',
      location: 'Complexe sportif',
      type: 'sport',
      icon: Trophy,
      color: 'bg-orange-500'
    },
    {
      id: '3',
      title: 'Don du sang',
      date: new Date(2024, 3, 1),
      description: 'Campagne de don du sang sur le campus',
      location: 'Infirmerie ENIT',
      type: 'health',
      icon: Heart,
      color: 'bg-red-500'
    }
  ];

  const associations = [
    {
      name: 'BDE - Bureau Des Étudiants',
      description: 'Organisation d\'événements et animation de la vie étudiante',
      contact: 'bde@enit.fr'
    },
    {
      name: 'BDS - Bureau Des Sports',
      description: 'Organisation des activités sportives',
      contact: 'bds@enit.fr'
    },
    {
      name: 'BDA - Bureau Des Arts',
      description: 'Promotion de la culture et des activités artistiques',
      contact: 'bda@enit.fr'
    },
    {
      name: 'Junior Entreprise',
      description: 'Réalisation de projets pour des clients professionnels',
      contact: 'je@enit.fr'
    }
  ];

  const services = [
    {
      icon: Heart,
      title: 'Santé',
      items: [
        'Service médical sur le campus',
        'Consultations psychologiques',
        'Médecine préventive'
      ]
    },
    {
      icon: Home,
      title: 'Logement',
      items: [
        'Résidences universitaires',
        'Aide au logement (CAF)',
        'Annonces de colocation'
      ]
    },
    {
      icon: Utensils,
      title: 'Restauration',
      items: [
        'Restaurant universitaire',
        'Cafétéria',
        'Points de restauration rapide'
      ]
    },
    {
      icon: Bike,
      title: 'Transport',
      items: [
        'Bus gratuit avec carte étudiante',
        'Location de vélos',
        'Covoiturage étudiant'
      ]
    }
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Vie étudiante" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'events'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Événements</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('associations')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'associations'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Associations</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'services'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Services</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('international')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'international'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>International</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'events' && (
            <div className="space-y-6">
              {events.map((event) => {
                const Icon = event.icon;
                return (
                  <div
                    key={event.id}
                    className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 ${event.color} rounded-xl`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {formatDate(event.date)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">
                              {event.location}
                            </span>
                          </div>
                        </div>
                        <p className="mt-3 text-gray-600 dark:text-gray-400">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'associations' && (
            <div className="space-y-6">
              {associations.map((association, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {association.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {association.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a
                      href={`mailto:${association.contact}`}
                      className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                    >
                      {association.contact}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'services' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                      <service.icon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {service.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'international' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Étudiants internationaux
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    L'ENIT accueille des étudiants du monde entier et propose des programmes d'échange avec plus de 50 universités partenaires.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Programmes d'échange
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Erasmus+</li>
                        <li>• FITEC</li>
                        <li>• Accords bilatéraux</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Services dédiés
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Aide aux démarches administratives</li>
                        <li>• Cours de français</li>
                        <li>• Parrainage étudiant</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Partir à l'étranger
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Opportunités pour les étudiants de l'ENIT souhaitant étudier à l'étranger.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Types de séjour
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Semestre d'études</li>
                        <li>• Double diplôme</li>
                        <li>• Stage à l'étranger</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Aides financières
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Bourse Erasmus+</li>
                        <li>• Aide à la mobilité</li>
                        <li>• Bourses régionales</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}