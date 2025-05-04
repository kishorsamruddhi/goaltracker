import React, { useState } from 'react';
import { CheckCircle, Clock, XCircle, ChevronDown, ChevronRight } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress: number;  // New property for progress percentage
}

const milestones: Milestone[] = [
  { id: '1', title: 'Initial Setup', status: 'completed', progress: 100 },
  { id: '2', title: 'UI/UX Design', status: 'in-progress', progress: 60 },
  { id: '3', title: 'Testing', status: 'not-started', progress: 10 },
];

export const MilestoneMarkers: React.FC = () => {
  const [open, setOpen] = useState(true);

  // Define achievement levels based on progress percentage
  const getAchievementText = (progress: number) => {
    if (progress === 100) return 'Mission Complete!';
    if (progress >= 81) return 'Goal Blaster!';
    if (progress >= 61) return 'Goal Getter!';
    if (progress >= 21) return 'Keep it Up!';
    return 'On the Way!';
  };

  const getEmoji = (progress: number) => {
    if (progress === 100) return '🎯';
    if (progress >= 81) return '🚀';
    if (progress >= 61) return '🏅';
    if (progress >= 21) return '⚡';
    return '🔜';
  };

  const getIcon = (progress: number) => {
    if (progress === 100) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (progress >= 81) return <Clock className="w-5 h-5 text-blue-500" />;
    if (progress >= 61) return <Clock className="w-5 h-5 text-yellow-500" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between mb-3"
      >
        <div className="flex items-center space-x-2">
          <Clock className="w-6 h-6 text-indigo-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Milestones
          </h3>
        </div>
        {open
          ? <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          : <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        }
      </button>

      {/* Body */}
      {open && (
        <div className="space-y-3">
          {milestones.map((m) => (
            <div key={m.id} className="flex items-center justify-between">
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100`}>
                {getIcon(m.progress)}
                <span>{getEmoji(m.progress)} {m.title}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {getAchievementText(m.progress)}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {m.progress}% Complete
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MilestoneMarkers;
