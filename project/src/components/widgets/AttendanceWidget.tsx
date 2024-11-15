import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { Notification } from '../../types/widget';
import AttendanceStats from './attendance/AttendanceStats';
import AttendanceList from './attendance/AttendanceList';
import AttendanceModal from './attendance/AttendanceModal';

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

interface AttendanceWidgetProps {
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  notifications?: Notification[];
  onShowNotifications?: () => void;
  notificationBtnRef?: React.RefObject<HTMLButtonElement>;
}

export default function AttendanceWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef
}: AttendanceWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);

  const records: AttendanceRecord[] = [
    {
      id: '1',
      date: new Date(2024, 2, 15, 8, 30),
      type: 'absence',
      subject: 'Mathématiques',
      status: 'justified',
      reason: 'Rendez-vous médical',
      document: 'certificat-medical.pdf'
    },
    {
      id: '2',
      date: new Date(2024, 2, 14, 14, 15),
      type: 'late',
      duration: 15,
      subject: 'Physique',
      status: 'unjustified'
    },
    {
      id: '3',
      date: new Date(2024, 2, 12, 10, 0),
      type: 'absence',
      subject: 'Anglais',
      status: 'pending',
      reason: 'Problème de transport'
    }
  ];

  const stats = {
    totalAbsences: records.filter(r => r.type === 'absence').length,
    totalLates: records.filter(r => r.type === 'late').length,
    justifiedAbsences: records.filter(r => r.type === 'absence' && r.status === 'justified').length,
    justifiedLates: records.filter(r => r.type === 'late' && r.status === 'justified').length,
    pendingJustifications: records.filter(r => r.status === 'pending').length
  };

  const handleRecordClick = (record: AttendanceRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  return (
    <>
      <BaseWidget
        title="Absences & retards"
        icon={<Clock className="w-6 h-6 text-white" />}
        headerColor="bg-gradient-to-r from-red-600 to-amber-600"
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        notifications={notifications}
        onShowNotifications={onShowNotifications}
        notificationBtnRef={notificationBtnRef}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold dark:text-white">Suivi de présence</h4>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm"
            >
              Voir tout
            </button>
          </div>

          <AttendanceStats stats={stats} />

          <div>
            <h5 className="text-lg font-semibold mb-4 dark:text-white">Derniers événements</h5>
            <AttendanceList 
              records={records.slice(0, 3)} 
              onRecordClick={handleRecordClick}
            />
          </div>
        </div>
      </BaseWidget>

      <AttendanceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRecord(null);
        }}
        selectedRecord={selectedRecord}
        records={records}
      />
    </>
  );
}