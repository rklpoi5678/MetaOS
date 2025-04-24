'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CheckInTrackerProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
}

const CheckInTracker: React.FC<CheckInTrackerProps> = ({ 
  selectedDate = new Date(),
  onDateSelect 
}) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const today = new Date();

  const getDayStatus = (date: Date) => {
    // 날짜를 기반으로 상태 결정
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // 임시로 요일과 주말 여부에 따라 다른 상태 반환
    if (isWeekend) {
      return Math.random() < 0.4 ? 'success' : 'partial';
    }
    
    const random = Math.random();
    if (random < 0.3) return 'success';
    if (random < 0.6) return 'partial';
    return 'missed';
  };

  // selectedDate가 유효한지 확인
  const isValidDate = selectedDate instanceof Date && !isNaN(selectedDate.getTime());
  const currentSelectedDate = isValidDate ? selectedDate : new Date();

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        {Array.from({ length: 7 }).map((_, index) => {
          const date = new Date(today);
          date.setDate(today.getDate() - (6 - index));
          const status = getDayStatus(date);

          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDateSelect(date)}
              className={`
                p-2 rounded-lg text-center
                ${date.toDateString() === currentSelectedDate.toDateString() ? 'ring-2 ring-blue-500' : ''}
                ${status === 'success' ? 'bg-green-100 text-green-700' :
                  status === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'}
              `}
            >
              {date.getDate()}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CheckInTracker; 