import React from 'react';
import { TrendingUp, TrendingDown, Award, Scale } from 'lucide-react';

interface Stats {
  average: number;
  highest: number;
  lowest: number;
  totalCoefficients: number;
  weightedAverage: number;
  subjectAverages: Record<string, number>;
}

interface GradesStatsProps {
  stats: Stats;
}

export default function GradesStats({ stats }: GradesStatsProps) {
  const formatScore = (score: number) => {
    return score.toFixed(2).replace('.', ',');
  };

  const getScoreColor = (score: number) => {
    if (score >= 14) return 'text-green-600 dark:text-green-400';
    if (score >= 10) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="space-y-8">
      {/* Main stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Moyennes
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  Moyenne générale
                </span>
              </div>
              <span className={`text-xl font-bold ${getScoreColor(stats.average)}`}>
                {formatScore(stats.average)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">
                  Moyenne pondérée
                </span>
              </div>
              <span className={`text-xl font-bold ${getScoreColor(stats.weightedAverage)}`}>
                {formatScore(stats.weightedAverage)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Extrêmes
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  Note la plus haute
                </span>
              </div>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                {formatScore(stats.highest)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <span className="text-gray-600 dark:text-gray-300">
                  Note la plus basse
                </span>
              </div>
              <span className="text-xl font-bold text-red-600 dark:text-red-400">
                {formatScore(stats.lowest)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subject averages */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Moyennes par matière
        </h3>
        <div className="space-y-4">
          {Object.entries(stats.subjectAverages).map(([subject, average]) => (
            <div key={subject} className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">{subject}</span>
              <span className={`text-xl font-bold ${getScoreColor(average)}`}>
                {formatScore(average)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}