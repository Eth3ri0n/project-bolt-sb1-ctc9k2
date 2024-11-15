import React from 'react';
import Modal from '../shared/Modal';
import { Bell, BellOff, AlertCircle } from 'lucide-react';

interface JobAlert {
  id: string;
  category: 'stage' | 'alternance' | 'emploi' | 'job-etudiant';
  enabled: boolean;
  label: string;
}

interface JobAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: JobAlert[];
  onToggleAlert: (alertId: string) => void;
}

export default function JobAlertsModal({
  isOpen,
  onClose,
  alerts,
  onToggleAlert
}: JobAlertsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gérer les alertes" size="md">
      <div className="space-y-6">
        {/* Info section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                À propos des alertes
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Recevez des notifications dès qu'une nouvelle offre correspondant à vos critères est publiée.
                Les alertes sont envoyées par email et apparaissent également dans votre centre de notifications.
              </p>
            </div>
          </div>
        </div>

        {/* Alert toggles */}
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl"
            >
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {alert.label}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {alert.enabled ? 'Alertes activées' : 'Alertes désactivées'}
                </p>
              </div>
              <button
                onClick={() => onToggleAlert(alert.id)}
                className={`p-2 rounded-full transition-colors ${
                  alert.enabled
                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-400 dark:hover:bg-blue-900'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
                }`}
                aria-label={alert.enabled ? 'Désactiver les alertes' : 'Activer les alertes'}
              >
                {alert.enabled ? (
                  <Bell className="w-5 h-5" />
                ) : (
                  <BellOff className="w-5 h-5" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Email preferences */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Fréquence des notifications par email
          </h4>
          <select className="w-full mt-2 p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <option value="instant">Instantanée</option>
            <option value="daily">Résumé quotidien</option>
            <option value="weekly">Résumé hebdomadaire</option>
          </select>
        </div>
      </div>
    </Modal>
  );
}