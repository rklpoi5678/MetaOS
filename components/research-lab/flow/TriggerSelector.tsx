'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TriggerSelectorProps {
  onTriggerSelect: (trigger: string) => void;
}

const emotions = [
  { id: 'anxiety', label: '불안', color: 'bg-red-100 text-red-700' },
  { id: 'numb', label: '둔감', color: 'bg-gray-100 text-gray-700' },
  { id: 'burst', label: '파열', color: 'bg-purple-100 text-purple-700' },
  { id: 'focus', label: '집중', color: 'bg-blue-100 text-blue-700' },
  { id: 'joy', label: '기쁨', color: 'bg-yellow-100 text-yellow-700' },
];

const TriggerSelector: React.FC<TriggerSelectorProps> = ({ onTriggerSelect }) => {
  const [selectedEmotion, setSelectedEmotion] = React.useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {emotions.map((emotion) => (
          <motion.button
            key={emotion.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedEmotion(emotion.id);
              onTriggerSelect(emotion.id);
            }}
            className={`px-4 py-2 rounded-full ${emotion.color} ${
              selectedEmotion === emotion.id ? 'ring-2 ring-offset-2 ring-blue-500' : ''
            }`}
          >
            {emotion.label}
          </motion.button>
        ))}
      </div>
      {selectedEmotion && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gray-50 rounded-lg"
        >
          <p className="text-sm text-gray-600">
            선택된 감정에 따른 맞춤 루틴이 추천됩니다.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default TriggerSelector; 