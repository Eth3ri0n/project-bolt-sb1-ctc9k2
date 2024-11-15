import React from 'react';
import { Package, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

interface RentalRecord {
  id: string;
  equipment: {
    name: string;
    image: string;
  };
  startDate: Date;
  endDate: Date;
  returnDate: Date | null;
  status: 'returned' | 'late' | 'damaged';
  notes?: string;
}

const rentalHistory: RentalRecord[] = [
  {
    id: '1',
    equipment: {
      name: 'Oscilloscope numérique',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
    },
    startDate: new Date(2024, 1, 15),
    endDate: new Date(2024, 1, 22),
    returnDate: new Date(2024, 1, 21),
    status: 'returned'
  },
  {
    id: '2',
    equipment: {
      name: 'Kit Arduino',
      image: 'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400&h=300&fit=crop'
    },
    startDate: new Date(2024, 1, 1),
    endDate: new Date(2024, 1, 8),
    returnDate: new Date(2024, 1, 10),
    status: 'late',
    notes: 'Retour effectué avec 2 jours de retard'
  }
];

export default function RentalHistory() {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const getStatusConfig = (status: RentalRecord['status']) => {
    switch (status) {
      case 'returned':
        return {
          label: 'Rendu',
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
          icon: CheckCircle
        };
      case 'late':
        return {
          label: 'Retard',
          color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
          icon: XCircle
        };
      case 'damaged':
        return {
          label: 'Endommagé',
          color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
          icon: XCircle
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
            <Package className="w-5 h-5" />
            <span>Total des emprunts</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {rentalHistory.length}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span>Rendus à temps</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {rentalHistory.filter(r => r.status === 'returned').length}
          </p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
            <XCircle className="w-5 h-5" />
            <span>Retards</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {rentalHistory.filter(r => r.status === 'late').length}
          </p>
        </div>
      </div>

      {/* History list */}
      <div className="space-y-4">
        {rentalHistory.map((rental) => {
          const statusConfig = getStatusConfig(rental.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={rental.id}
              className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
            >
              <div className="flex items-start gap-4">
                <img
                  src={rental.equipment.image}
                  alt={rental.equipment.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {rental.equipment.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4" />
                          <span>Du {formatDate(rental.startDate)} au {formatDate(rental.endDate)}</span>
                        </div>
                        {rental.returnDate && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>Rendu le {formatDate(rental.returnDate)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full flex items-center gap-2 ${statusConfig.color}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{statusConfig.label}</span>
                    </div>
                  </div>

                  {rental.notes && (
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                      {rental.notes}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}