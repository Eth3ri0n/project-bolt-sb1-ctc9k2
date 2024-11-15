import React, { useState } from 'react';
import { Briefcase, Star, ExternalLink, Bell, BellOff } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';
import JobAlertsModal from '../jobs/JobAlertsModal';

interface JobOffer {
  title: string;
  company: string;
  location: string;
  rating: number;
  salary: {
    min: number;
    max: number;
  };
  type: string;
  applyUrl: string;
  category: 'stage' | 'alternance' | 'emploi' | 'job-etudiant';
}

interface JobAlert {
  id: string;
  category: 'stage' | 'alternance' | 'emploi' | 'job-etudiant';
  enabled: boolean;
  label: string;
}

interface JobsWidgetProps {
  onToggleFavorite?: () => void;
  onOpenSettings?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function JobsWidget({
  onToggleFavorite,
  onOpenSettings,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: JobsWidgetProps) {
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const [jobAlerts, setJobAlerts] = useState<JobAlert[]>([
    { id: '1', category: 'stage', enabled: false, label: 'Stages' },
    { id: '2', category: 'alternance', enabled: false, label: 'Alternances' },
    { id: '3', category: 'emploi', enabled: false, label: 'Emplois' },
    { id: '4', category: 'job-etudiant', enabled: false, label: 'Jobs étudiants' }
  ]);

  const jobOffers: JobOffer[] = [
    {
      title: "Ingénieur / Ingénieure structure métallique",
      company: "Artelia",
      location: "65000 Tarbes",
      rating: 4.2,
      salary: {
        min: 900,
        max: 1400
      },
      type: "Alternance",
      applyUrl: "https://careers.artelia.com",
      category: "alternance"
    },
    {
      title: "Équipier polyvalent étudiant (H/F)",
      company: "Lidl",
      location: "65000 Tarbes",
      rating: 2.9,
      salary: {
        min: 670,
        max: 1200
      },
      type: "Temps partiel",
      applyUrl: "https://careers.lidl.fr",
      category: "job-etudiant"
    }
  ];

  const toggleAlert = (alertId: string) => {
    setJobAlerts(alerts => 
      alerts.map(alert => 
        alert.id === alertId 
          ? { ...alert, enabled: !alert.enabled }
          : alert
      )
    );
  };

  return (
    <>
      <BaseWidget
        title="Emplois & stages"
        icon={<Briefcase className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-blue-600 to-blue-700"
        onToggleFavorite={onToggleFavorite}
        onOpenSettings={onOpenSettings}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Offres disponibles</h4>
            <button
              onClick={() => setIsAlertsModalOpen(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Gérer les alertes"
            >
              <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </button>
          </div>

          <div className="space-y-4">
            {jobOffers.map((job, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="text-lg font-semibold dark:text-white">{job.title}</h4>
                    <div className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{job.rating}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-col text-gray-600 dark:text-gray-400">
                      <span className="font-medium">{job.company}</span>
                      <span>{job.location}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                        De {job.salary.min} € à {job.salary.max} € par mois
                      </span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                        {job.type}
                      </span>
                    </div>

                    <div className="pt-3 flex justify-end">
                      <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        Postuler
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Alert status */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 mb-3">
              <Bell className="w-5 h-5" />
              <h5 className="font-medium">Alertes actives</h5>
            </div>
            <div className="space-y-2">
              {jobAlerts.filter(alert => alert.enabled).map(alert => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between text-sm text-blue-600 dark:text-blue-400"
                >
                  <span>{alert.label}</span>
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className="p-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-full transition-colors"
                  >
                    <BellOff className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {jobAlerts.filter(alert => alert.enabled).length === 0 && (
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                  Aucune alerte activée
                </p>
              )}
            </div>
          </div>
        </div>
      </BaseWidget>

      <JobAlertsModal
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
        alerts={jobAlerts}
        onToggleAlert={toggleAlert}
      />
    </>
  );
}