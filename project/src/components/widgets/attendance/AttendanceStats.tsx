import React from 'react';
import { Clock, AlertCircle, FileCheck, AlertTriangle } from 'lucide-react';

interface AttendanceStatsProps {
  stats: {
    totalAbsences: number;
    totalLates: number;
    justifiedAbsences: number;
    justifiedLates: number;
    pendingJustifications: number;
  };
}

export default function AttendanceStats({ stats }: AttendanceStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <h6 className="font-medium text-red-900 dark:text-red-100">Absences</h6>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
            {stats.totalAbsences}
          </p>
          <p className="text-sm text-red-600/80 dark:text-red-400/80">
            {stats.justifiedAbsences} justifiées
          </p>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <h6 className="font-medium text-amber-900 dark:text-amber-100">Retards</h6>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {stats.totalLates}
          </p>
          <p className="text-sm text-amber-600/80 dark:text-amber-400/80">
            {stats.justifiedLates} justifiés
          </p>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 col-span-2 md:col-span-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h6 className="font-medium text-purple-900 dark:text-purple-100">En attente</h6>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {stats.pendingJustifications}
          </p>
          <p className="text-sm text-purple-600/80 dark:text-purple-400/80">
            justifications à fournir
          </p>
        </div>
      </div>
    </div>
  );
}