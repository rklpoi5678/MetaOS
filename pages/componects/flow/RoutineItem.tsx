'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Routine {
  id: string;
  name: string;
  time: string;
  frequency: string;
  isCompleted: boolean;
  emotionalTrigger?: string;
}

interface RoutineItemProps {
  routine?: Routine;
  onComplete: (id: string) => void;
}

const RoutineItem: React.FC<RoutineItemProps> = ({ 
  routine = {
    id: '',
    name: '새 루틴',
    time: '00:00',
    frequency: 'daily',
    isCompleted: false
  }, 
  onComplete 
}) => {
  if (!routine) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-lg border ${
        routine.isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
      } transition-all duration-200`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={routine.isCompleted}
            onChange={() => onComplete(routine.id)}
            className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <h4 className="font-medium text-gray-800">{routine.name}</h4>
            <p className="text-sm text-gray-500">
              {routine.time} • {routine.frequency}
            </p>
          </div>
        </div>
        {routine.emotionalTrigger && (
          <span className="px-2 py-1 text-sm bg-purple-100 text-purple-700 rounded">
            {routine.emotionalTrigger}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default RoutineItem; 