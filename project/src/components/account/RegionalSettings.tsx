import React, { useState } from 'react';
import { Globe, Clock } from 'lucide-react';

export default function RegionalSettings() {
  const [settings, setSettings] = useState({
    language: 'fr',
    timeZone: 'Europe/Paris',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h'
  });

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' }
  ];

  const timeZones = [
    { code: 'Europe/Paris', name: 'Paris (UTC+1)' },
    { code: 'Europe/London', name: 'London (UTC)' }
  ];

  const dateFormats = [
    { code: 'DD/MM/YYYY', name: 'JJ/MM/AAAA' },
    { code: 'MM/DD/YYYY', name: 'MM/JJ/AAAA' },
    { code: 'YYYY-MM-DD', name: 'AAAA-MM-JJ' }
  ];

  const timeFormats = [
    { code: '24h', name: '24 heures' },
    { code: '12h', name: '12 heures' }
  ];

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Language settings */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Langue
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Langue d'affichage de l'interface
            </p>
          </div>
        </div>

        <select
          value={settings.language}
          onChange={(e) => handleChange('language', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Time zone settings */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Fuseau horaire
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Utilisé pour les horaires et les dates
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fuseau horaire
            </label>
            <select
              value={settings.timeZone}
              onChange={(e) => handleChange('timeZone', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              {timeZones.map((tz) => (
                <option key={tz.code} value={tz.code}>
                  {tz.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Format de date
            </label>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleChange('dateFormat', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              {dateFormats.map((format) => (
                <option key={format.code} value={format.code}>
                  {format.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Format d'heure
            </label>
            <select
              value={settings.timeFormat}
              onChange={(e) => handleChange('timeFormat', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            >
              {timeFormats.map((format) => (
                <option key={format.code} value={format.code}>
                  {format.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors">
          Enregistrer les préférences
        </button>
      </div>
    </div>
  );
}