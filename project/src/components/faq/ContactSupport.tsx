import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';

export default function ContactSupport() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ subject, message });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Contacter le support
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Notre équipe vous répondra dans les plus brefs délais.
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>• Temps de réponse moyen : 24h</p>
          <p>• Support disponible du lundi au vendredi</p>
          <p>• Questions urgentes : 05 62 44 27 00</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="subject" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Sujet
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
            placeholder="Ex: Question sur les absences"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
            placeholder="Décrivez votre problème en détail..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <Send className="w-4 h-4" />
          <span>Envoyer</span>
        </button>
      </form>
    </div>
  );
}