import React, { useState } from 'react';
import { Shield, Key, Smartphone, AlertCircle } from 'lucide-react';

export default function SecuritySettings() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change
    setShowPasswordForm(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Password section */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Key className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Mot de passe
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dernière modification il y a 3 mois
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
          >
            Modifier
          </button>
        </div>

        {showPasswordForm && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mot de passe actuel
              </label>
              <input
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                value={passwordData.new}
                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Two-factor authentication */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Double authentification
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Activée via l'application mobile
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            Désactiver
          </button>
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Activité récente
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 dark:text-white">
                Connexion depuis Chrome sur Windows
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                IP: 192.168.1.1
              </p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Aujourd'hui, 10:30
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 dark:text-white">
                Modification du mot de passe
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Via les paramètres du compte
              </p>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Il y a 3 mois
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}