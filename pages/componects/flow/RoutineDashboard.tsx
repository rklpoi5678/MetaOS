'use client';

import React from 'react';
import { motion } from 'framer-motion';
import RoutineItem from './RoutineItem';
import RhythmGraph from './RhythmGraph';
import TriggerSelector from './TriggerSelector';
import CheckInTracker from './CheckInTracker';

interface Routine {
  id: string;
  name: string;
  time: string;
  frequency: string;
  isCompleted: boolean;
  emotionalTrigger?: string;
}

const RoutineDashboard: React.FC = () => {
  const [routines, setRoutines] = React.useState<Routine[]>([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">오늘의 루틴</h2>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              + 새 루틴
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 왼쪽: 체크리스트 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">체크리스트</h3>
            {routines.map((routine) => (
              <RoutineItem
                key={routine.id}
                routine={routine}
                onComplete={(id) => {
                  setRoutines(routines.map(r => 
                    r.id === id ? { ...r, isCompleted: !r.isCompleted } : r
                  ));
                }}
              />
            ))}
          </div>

          {/* 오른쪽: 리듬 그래프 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">실행 리듬</h3>
            <RhythmGraph routines={routines} selectedDate={selectedDate} />
          </div>
        </div>

        {/* 감정 트리거 섹션 */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">감정 트리거</h3>
          <TriggerSelector
            onTriggerSelect={(trigger) => {
              console.log('Selected trigger:', trigger);
            }}
          />
        </div>

        {/* 체크인 트래커 */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">일일 체크인</h3>
          <CheckInTracker
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default RoutineDashboard; 