import React from 'react';
import { Clock, FileCheck, AlertCircle, AlertTriangle, FileText } from 'lucide-react';

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

interface AttendanceListProps {
  records: AttendanceRecord[];
  onRecordClick: (record: AttendanceRecord) => void;
}

export default function AttendanceList({ records, onRecordClick }: AttendanceListProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const getStatusConfig = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'justified':
        return {
          color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
          icon: <FileCheck className="w-4 h-4" />,
          label: 'Justifié'
        };
      case 'unjustified':
        return {
          color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
          icon: <AlertTriangle className="w-4 h-4" />,
          label: 'Non justifié'
        };
      case 'pending':
        return {
          color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
          icon: <Clock className="w-4 h-4" />,
          label: 'En attente'
        };
    }
  };

  const getTypeConfig = (type: AttendanceRecord['type']) => {
    switch (type) {
      case 'absence':
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
        };
      case 'late':
        return {
          icon: <Clock className="w-5 h-5" />,
          color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
        };
    }
  };

  return (
    <div className="space-y-3">
      {records.map((record) => {
        const statusConfig = getStatusConfig(record.status);
        const typeConfig = getTypeConfig(record.type);

        return (
          <div
            key={record.id}
            onClick={() => onRecordClick(record)}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer border border-gray-100 dark:border-gray-700 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${typeConfig.color}`}>
                  {typeConfig.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {record.subject}
                    </span>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                      {statusConfig.icon}
                      <span>{statusConfig.label}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(record.date)}
                    {record.duration && ` • ${record.duration} minutes`}
                  </p>
                  {record.reason && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {record.reason}
                    </p>
                  )}
                </div>
              </div>
              {record.document && (
                <div className="shrink-0">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}