import React from 'react';

interface Grade {
  id: string;
  subject: string;
  score: number;
  date: Date;
  type: string;
  color: string;
}

interface Stats {
  average: number;
  highest: number;
  lowest: number;
  totalCoefficients: number;
  weightedAverage: number;
  subjectAverages: Record<string, number>;
}

interface GradesChartProps {
  grades: Grade[];
  stats: Stats;
}

export default function GradesChart({ grades, stats }: GradesChartProps) {
  const formatScore = (score: number) => score.toFixed(2).replace('.', ',');
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  // Sort grades by date
  const sortedGrades = [...grades].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="space-y-8">
      {/* Evolution Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Évolution des notes
        </h3>
        
        <div className="relative h-[400px] mt-8">
          {/* Grid and labels */}
          <div className="absolute inset-0 flex">
            {/* Y-axis labels */}
            <div className="w-12 flex flex-col justify-between">
              {Array.from({ length: 21 }, (_, i) => 20 - i).map((value) => (
                <div 
                  key={value} 
                  className="text-sm text-gray-500 dark:text-gray-400 text-right pr-4 -translate-y-1/2"
                >
                  {value}
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="flex-1 relative">
              {/* Grid lines */}
              {Array.from({ length: 21 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-full border-t border-gray-100 dark:border-gray-700"
                  style={{ bottom: `${(i / 20) * 100}%` }}
                />
              ))}

              {/* Average line */}
              <div 
                className="absolute w-full border-t-2 border-dashed border-primary"
                style={{ bottom: `${(stats.average / 20) * 100}%` }}
              >
                <span className="absolute right-0 -top-6 text-sm text-primary">
                  Moyenne: {formatScore(stats.average)}
                </span>
              </div>

              {/* Bars container */}
              <div className="absolute inset-0 flex items-end justify-between px-4">
                {sortedGrades.map((grade) => (
                  <div key={grade.id} className="relative group" style={{ width: '60px' }}>
                    {/* Bar */}
                    <div 
                      className={`w-8 mx-auto rounded-t-lg transition-all ${grade.color}`}
                      style={{ height: `${(grade.score / 20) * 100}%` }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <div className="bg-gray-800 text-white px-3 py-2 rounded text-sm whitespace-nowrap">
                          <div className="font-medium">{grade.subject}</div>
                          <div>{formatScore(grade.score)}/20</div>
                          <div>{grade.type}</div>
                          <div>{formatDate(grade.date)}</div>
                        </div>
                      </div>
                    </div>
                    {/* X-axis label */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {formatDate(grade.date)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject Averages Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Moyennes par matière
        </h3>
        
        <div className="relative h-[400px] mt-8">
          {/* Grid and labels */}
          <div className="absolute inset-0 flex">
            {/* Y-axis labels */}
            <div className="w-12 flex flex-col justify-between">
              {Array.from({ length: 21 }, (_, i) => 20 - i).map((value) => (
                <div 
                  key={value} 
                  className="text-sm text-gray-500 dark:text-gray-400 text-right pr-4 -translate-y-1/2"
                >
                  {value}
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="flex-1 relative">
              {/* Grid lines */}
              {Array.from({ length: 21 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-full border-t border-gray-100 dark:border-gray-700"
                  style={{ bottom: `${(i / 20) * 100}%` }}
                />
              ))}

              {/* Average line */}
              <div 
                className="absolute w-full border-t-2 border-dashed border-primary"
                style={{ bottom: `${(stats.average / 20) * 100}%` }}
              >
                <span className="absolute right-0 -top-6 text-sm text-primary">
                  Moyenne: {formatScore(stats.average)}
                </span>
              </div>

              {/* Bars container */}
              <div className="absolute inset-0 flex items-end justify-around px-4">
                {Object.entries(stats.subjectAverages).map(([subject, average]) => (
                  <div key={subject} className="relative group" style={{ width: '100px' }}>
                    {/* Bar */}
                    <div 
                      className={`w-16 mx-auto rounded-t-lg transition-all ${
                        subject === 'Électricité' ? 'bg-indigo-500' :
                        subject === 'Mathématiques' ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ height: `${(average / 20) * 100}%` }}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <div className="bg-gray-800 text-white px-3 py-2 rounded text-sm whitespace-nowrap">
                          <div className="font-medium">{subject}</div>
                          <div>{formatScore(average)}/20</div>
                        </div>
                      </div>
                    </div>
                    {/* X-axis label */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {subject}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}