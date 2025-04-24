'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Routine {
  id: string;
  name: string;
  time: string;
  frequency: string;
  isCompleted: boolean;
}

interface RhythmGraphProps {
  routines?: Routine[];  // optional로 변경
  selectedDate: Date;
}

const RhythmGraph: React.FC<RhythmGraphProps> = ({ 
  routines = [],  // 기본값 설정
  selectedDate 
}) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  // 시간대별 루틴 수를 계산
  const getRoutineCountForHour = (hour: number) => {
    if (!routines) return 0;  // routines가 undefined인 경우 처리

    // 선택된 날짜의 루틴만 필터링
    const dayRoutines = routines.filter(routine => {
      try {
        const routineTime = new Date(routine.time);
        return routineTime.getDate() === selectedDate.getDate() &&
               routineTime.getMonth() === selectedDate.getMonth() &&
               routineTime.getFullYear() === selectedDate.getFullYear();
      } catch {
        console.error('Invalid routine time:', routine.time);
        return false;
      }
    });

    // 해당 시간대의 루틴 수 계산
    return dayRoutines.filter(routine => {
      try {
        const routineTime = new Date(routine.time);
        return routineTime.getHours() === hour;
      } catch {
        console.error('Invalid routine time:', routine.time);
        return false;
      }
    }).length;
  };

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="h-60 flex items-end space-x-2">
        {hours.map((hour) => {
          const count = getRoutineCountForHour(hour);
          const height = `${(count / 5) * 100}%`;

          return (
            <motion.div
              key={hour}
              initial={{ height: 0 }}
              animate={{ height }}
              className="flex-1 bg-blue-200 rounded-t hover:bg-blue-300 transition-colors"
              whileHover={{
                scale: 1.1,
                backgroundColor: '#93C5FD' // blue-300
              }}
            >
              <div className="text-xs text-center text-gray-600 mt-2 transform -rotate-90">
                {hour}:00
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RhythmGraph; 