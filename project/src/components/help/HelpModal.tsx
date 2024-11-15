import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  HelpCircle,
  Search,
  Book,
  MessageSquare,
  Lightbulb,
  ChevronRight,
  FileText,
  Video,
  Download,
  Mail,
  Phone,
  Globe,
  ExternalLink,
  Play,
  Clock
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'faq' | 'tutorials' | 'contact'>('guide');
  const [searchQuery, setSearchQuery] = useState('');

  const guides = [
    {
      title: 'Guide de l\'étudiant',
      sections: [
        {
          title: 'Premiers pas',
          documents: [
            { name: 'Bienvenue à l\'ENIT', type: 'pdf', size: '2.4 MB' },
            { name: 'Services numériques', type: 'pdf', size: '1.8 MB' },
            { name: 'Vie sur le campus', type: 'pdf', size: '3.1 MB' }
          ]
        },
        {
          title: 'Scolarité',
          documents: [
            { name: 'Règlement des études', type: 'pdf', size: '4.2 MB' },
            { name: 'Calendrier universitaire', type: 'pdf', size: '1.2 MB' },
            { name: 'Guide des absences', type: 'pdf', size: '1.5 MB' }
          ]
        }
      ]
    }
  ];

  const tutorials = [
    {
      title: 'Outils numériques',
      items: [
        {
          title: 'Accéder à Moodle',
          duration: '5 min',
          type: 'video'
        },
        {
          title: 'Utiliser Microsoft Teams',
          duration: '8 min',
          type: 'video'
        },
        {
          title: 'Gérer son emploi du temps',
          duration: '6 min',
          type: 'video'
        }
      ]
    },
    {
      title: 'Procédures administratives',
      items: [
        {
          title: 'Justifier une absence',
          duration: '4 min',
          type: 'guide'
        },
        {
          title: 'Réserver du matériel',
          duration: '5 min',
          type: 'guide'
        },
        {
          title: 'Accéder à la bibliothèque',
          duration: '3 min',
          type: 'guide'
        }
      ]
    }
  ];

  const faqs = [
    {
      question: 'Comment accéder à mon emploi du temps ?',
      answer: 'Vous pouvez accéder à votre emploi du temps via le widget "Emploi du temps" sur votre tableau de bord ou dans la section "Scolarité".',
      category: 'Scolarité'
    },
    {
      question: 'Comment justifier une absence ?',
      answer: 'Les justificatifs d\'absence doivent être déposés via le widget "Absences & retards" dans les 48h suivant votre retour.',
      category: 'Scolarité'
    },
    {
      question: 'Comment réserver du matériel ?',
      answer: 'Utilisez le widget "Location de matériel" pour consulter les équipements disponibles et effectuer une réservation.',
      category: 'Services'
    }
  ];

  const contacts = [
    {
      title: 'Support technique',
      description: 'Pour toute question technique',
      email: 'support@enit.fr',
      phone: '05 62 44 27 00',
      hours: 'Lun-Ven: 9h-17h'
    },
    {
      title: 'Service scolarité',
      description: 'Questions administratives',
      email: 'scolarite@enit.fr',
      phone: '05 62 44 27 01',
      hours: 'Lun-Ven: 9h-12h, 14h-16h'
    },
    {
      title: 'Bibliothèque',
      description: 'Ressources documentaires',
      email: 'bibliotheque@enit.fr',
      phone: '05 62 44 27 02',
      hours: 'Lun-Ven: 8h30-18h'
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Centre d'aide" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'guide'
                ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Book className="w-4 h-4" />
              <span>Guide</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'faq'
                ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>FAQ</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('tutorials')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'tutorials'
                ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span>Tutoriels</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'contact'
                ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </div>
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher de l'aide..."
            className="w-full h-12 pl-12 pr-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'guide' && (
            <div className="space-y-8">
              {guides.map((guide, index) => (
                <div key={index} className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {guide.title}
                  </h3>
                  {guide.sections.map((section, sIndex) => (
                    <div key={sIndex} className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {section.title}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.documents.map((doc, dIndex) => (
                          <div
                            key={dIndex}
                            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-cyan-500" />
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white">
                                  {doc.name}
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {doc.size}
                                </p>
                              </div>
                            </div>
                            <Download className="w-5 h-5 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tutorials' && (
            <div className="space-y-8">
              {tutorials.map((category, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.items.map((item, iIndex) => (
                      <div
                        key={iIndex}
                        className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      >
                        <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
                          {item.type === 'video' ? (
                            <Play className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                          ) : (
                            <Book className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {item.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                  <span className="inline-block mt-3 px-3 py-1 bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 rounded-full text-sm">
                    {faq.category}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {contact.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {contact.description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                      >
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <a
                        href={`tel:${contact.phone.replace(/\s/g, '')}`}
                        className="text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                      >
                        {contact.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        {contact.hours}
                      </span>
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