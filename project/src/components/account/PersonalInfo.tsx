import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, Book, Camera } from 'lucide-react';

export default function PersonalInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Doe',
    lastName: 'Eylona',
    email: 'doe.eylona@enit.student.fr',
    phone: '06 12 34 56 78',
    birthDate: '2000-05-15',
    address: '47 Avenue d\'Azereix, 65000 Tarbes',
    studentId: '20220789',
    year: '2ème année',
    specialization: 'Génie Mécanique'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Handle form submission
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Profile picture */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop&q=80"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 p-2 bg-gray-900 dark:bg-gray-700 rounded-full text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {formData.firstName} {formData.lastName}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {formData.studentId} • {formData.year}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prénom
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 disabled:opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nom
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 disabled:opacity-60"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 disabled:opacity-60"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Téléphone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 disabled:opacity-60"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Adresse
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 disabled:opacity-60"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Année
            </label>
            <input
              type="text"
              value={formData.year}
              disabled
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 opacity-60"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Spécialisation
            </label>
            <input
              type="text"
              value={formData.specialization}
              disabled
              className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 opacity-60"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
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
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
            >
              Modifier
            </button>
          )}
        </div>
      </form>
    </div>
  );
}