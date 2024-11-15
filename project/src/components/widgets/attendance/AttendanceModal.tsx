import React, { useState } from 'react';
import Modal from '../../shared/Modal';
import { Calendar, Clock, FileCheck, AlertCircle, FileText, Upload } from 'lucide-react';
import AttendanceStats from './AttendanceStats';

interface AttendanceRecord {
  id: string;
  date: Date;
  type: 'absence' | 'late';
  duration?: number;
  subject: string;
  status: 'justified' | 'unjustified' | 'pending';
  reason?: string;
  document?: string;
}

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRecord: AttendanceRecord | null;
  records: AttendanceRecord[];
}

export default function AttendanceModal({
  isOpen,
  onClose,
  selectedRecord,
  records
}: AttendanceModalProps) {
  const [activeTab, setActiveTab] = useState<'list' | 'calendar'>('list');
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const stats = {
    totalAbsences: records.filter(r => r.type === 'absence').length,
    totalLates: records.filter(r => r.type === 'late').length,
    justifiedAbsences: records.filter(r => r.type === 'absence' && r.status === 'justified').length,
    justifiedLates: records.filter(r => r.type === 'late' && r.status === 'justified').length,
    pendingJustifications: records.filter(r => r.status === 'pending').length
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Absences & retards"
      size="xl"
    >
      <div className="flex flex-col h-[calc(100vh-16rem)]">
        <div className="flex space-x-1 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'list'
                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Liste</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              activeTab === 'calendar'
                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-100'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Calendrier</span>
            </div>
          </button>
        </div>

        <div className="mb-6">
          <AttendanceStats stats={stats} />
        </div>

        <div className="flex-1 overflow-y-auto">
          {selectedRecord ? (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {selectedRecord.type === 'absence' ? 'Absence' : 'Retard'} en {selectedRecord.subject}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {formatDate(selectedRecord.date)}
                    {selectedRecord.duration && ` • ${selectedRecord.duration} minutes`}
                  </p>
                </div>
                <button
                  onClick={() => onClose()}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Retour à la liste
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Statut</h4>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedRecord.status === 'justified'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : selectedRecord.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    }`}>
                      {selectedRecord.status === 'justified' && 'Justifié'}
                      {selectedRecord.status === 'pending' && 'En attente de justification'}
                      {selectedRecord.status === 'unjustified' && 'Non justifié'}
                    </span>
                  </div>
                </div>

                {selectedRecord.reason && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Motif</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedRecord.reason}
                    </p>
                  </div>
                )}

                {selectedRecord.document ? (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Document justificatif</h4>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <FileText className="w-4 h-4" />
                      <a href="#" className="hover:underline">
                        {selectedRecord.document}
                      </a>
                    </div>
                  </div>
                ) : selectedRecord.status === 'pending' && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Justificatif à fournir</h4>
                    <button className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Déposer un justificatif</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map((record) => (
                <div
                  key={record.id}
                  onClick={() => onClose()}
                  className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  {/* Record content similar to AttendanceList component */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}