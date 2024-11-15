import React, { useState } from 'react';
import Modal from '../shared/Modal';
import { 
  GraduationCap, 
  Building2, 
  Users, 
  Globe, 
  BookOpen,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  ChevronRight
} from 'lucide-react';

interface ENITInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ENITInfoModal({ isOpen, onClose }: ENITInfoModalProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'programs' | 'campus' | 'contact'>('general');

  const programs = [
    {
      name: 'Génie Mécanique',
      description: 'Formation en conception mécanique, fabrication et industrialisation',
      duration: '3 ans',
      options: ['Conception', 'Production', 'Matériaux et Structures']
    },
    {
      name: 'Génie Industriel',
      description: 'Formation en organisation et gestion de la production',
      duration: '3 ans',
      options: ['Management de Projet', 'Qualité', 'Supply Chain']
    },
    {
      name: 'Génie des Systèmes de Production',
      description: 'Formation en automatisation et systèmes industriels',
      duration: '3 ans',
      options: ['Automatisation', 'Robotique', 'Maintenance']
    }
  ];

  const facilities = [
    {
      name: 'Bibliothèque Universitaire',
      description: 'Plus de 20 000 ouvrages techniques et scientifiques',
      hours: '8h30-19h00'
    },
    {
      name: 'Laboratoires de Recherche',
      description: 'Équipements de pointe pour la recherche',
      areas: ['LGP - Laboratoire Génie de Production']
    },
    {
      name: 'Installations Sportives',
      description: 'Complexe sportif complet',
      facilities: ['Gymnase', 'Terrains extérieurs', 'Salle de musculation']
    },
    {
      name: 'Restaurant Universitaire',
      description: 'Service de restauration sur le campus',
      hours: '11h30-14h00'
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Information ENIT" size="xl">
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'general'
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Présentation</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('programs')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'programs'
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Formations</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('campus')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'campus'
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>Campus</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'contact'
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  À propos de l'ENIT
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  L'École Nationale d'Ingénieurs de Tarbes (ENIT) est une école d'ingénieurs publique créée en 1963.
                  Elle forme des ingénieurs généralistes en génie mécanique et génie industriel, 
                  capables de gérer des projets industriels complexes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Étudiants</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Plus de 1200 étudiants</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">International</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Plus de 50 partenariats</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Actualités
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg shrink-0">
                      <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Journée Portes Ouvertes
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Venez découvrir l'ENIT le 15 mars 2024. Au programme : visites guidées,
                        rencontres avec les enseignants et étudiants, démonstrations dans les laboratoires.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg shrink-0">
                      <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Forum Entreprises
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Le 22 mars 2024, rencontrez plus de 50 entreprises sur le campus.
                        Opportunités de stages, alternances et emplois à la clé.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'programs' && (
            <div className="space-y-6">
              {programs.map((program, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {program.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {program.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>Durée : {program.duration}</span>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                          Options de spécialisation
                        </h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          {program.options.map((option, idx) => (
                            <li key={idx}>{option}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'campus' && (
            <div className="space-y-6">
              {facilities.map((facility, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <Building2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {facility.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {facility.description}
                      </p>
                      {facility.hours && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>Horaires : {facility.hours}</span>
                        </div>
                      )}
                      {facility.areas && (
                        <div className="mt-2">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            Domaines de recherche
                          </h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                            {facility.areas.map((area, idx) => (
                              <li key={idx}>{area}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {facility.facilities && (
                        <div className="mt-2">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            Équipements disponibles
                          </h4>
                          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                            {facility.facilities.map((f, idx) => (
                              <li key={idx}>{f}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Coordonnées
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Adresse</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        47 Avenue d'Azereix<br />
                        65000 Tarbes<br />
                        France
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Téléphone</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        05 62 44 27 00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        contact@enit.fr
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">Horaires d'ouverture</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Lundi - Vendredi : 8h00 - 18h00<br />
                        Fermé les weekends et jours fériés
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Services spécifiques
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Service Scolarité</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Tél : 05 62 44 27 01<br />
                      Email : scolarite@enit.fr
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Relations Internationales</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Tél : 05 62 44 27 02<br />
                      Email : international@enit.fr
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Service des Stages</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Tél : 05 62 44 27 03<br />
                      Email : stages@enit.fr
                    </p>
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