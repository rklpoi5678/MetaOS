'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (routine: {
    name: string;
    time: string;
    frequency: string;
    emotionalTrigger?: string;
  }) => void;
}

const RoutineModal: React.FC<RoutineModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = React.useState('');
  const [time, setTime] = React.useState('');
  const [frequency, setFrequency] = React.useState('daily');
  const [emotionalTrigger, setEmotionalTrigger] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, time, frequency, emotionalTrigger });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-md z-10"
          >
            <h3 className="text-xl font-bold mb-4">새 루틴 만들기</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  루틴 이름
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  시간
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  반복 주기
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="daily">매일</option>
                  <option value="weekly">매주</option>
                  <option value="weekday">평일</option>
                  <option value="weekend">주말</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  감정 트리거 (선택)
                </label>
                <input
                  type="text"
                  value={emotionalTrigger}
                  onChange={(e) => setEmotionalTrigger(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="예: 불안, 둔감, 파열"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  저장
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RoutineModal; 