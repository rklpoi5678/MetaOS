'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StructureSelectorProps {
  selectedStructure: string;
  onSelect: (structure: string) => void;
}

const structures = [
  { id: 'DIKI', name: 'DIKI 구조', description: 'Data-Information-Knowledge-Insight' },
  { id: 'PARA', name: 'PARA 구조', description: 'Projects-Areas-Resources-Archives' },
  { id: 'MOC', name: 'MOC 구조', description: 'Map of Content' },
];

const StructureSelector: React.FC<StructureSelectorProps> = ({
  selectedStructure,
  onSelect
}) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-medium text-gray-800 mb-3">구조 선택</h3>
      <div className="space-y-2">
        {structures.map(structure => (
          <motion.button
            key={structure.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(structure.id)}
            className={`
              w-full p-3 rounded-lg text-left
              ${selectedStructure === structure.id
                ? 'bg-blue-100 border-blue-300'
                : 'bg-white border-gray-200 hover:bg-gray-50'}
              border transition-colors
            `}
          >
            <div className="font-medium text-gray-800">{structure.name}</div>
            <div className="text-sm text-gray-500">{structure.description}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default StructureSelector; 