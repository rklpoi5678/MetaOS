'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface LabSidebarProps {
  selectedModule: string;
  onModuleSelect: (moduleId: string) => void;
}

const modules = [
  { id: 'core-generator', name: '코어 생성', icon: '💠' },
  { id: 'structure-builder', name: '구조 설계', icon: '🧩' },
  { id: 'tool-linker', name: '도구 연결', icon: '🛠' },
  { id: 'experiment-runner', name: '실험 실행', icon: '🧪' },
  { id: 'archive-manager', name: '보관소', icon: '📦' },
  { id: 'open-sync', name: '공개 채널', icon: '🌍' },
  { id: 'agent-simulator', name: '에이전트 시뮬레이터', icon: '🤖' }
];

const LabSidebar: React.FC<LabSidebarProps> = ({
  selectedModule,
  onModuleSelect
}) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-8">
        <Link href="/dashboard">
          <h2 className="text-xl font-bold text-gray-800">🧠Meta-OS 연구실</h2>
        </Link>
        <p className="text-sm text-gray-600 mt-2">메타지능 시뮬레이터</p>
      </div>

      <nav className="space-y-2">
        {modules.map((module) => (
          <motion.button
            key={module.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onModuleSelect(module.id)}
            className={`
              w-full px-4 py-3 rounded-lg text-left
              transition-colors duration-200
              ${selectedModule === module.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'}
            `}
          >
            <span className="mr-3">{module.icon}</span>
            {module.name}
          </motion.button>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <div className="text-xs text-gray-500">
          <p>버전: v0.1.0</p>
          <p className="mt-1">마지막 업데이트: 2024.03</p>
        </div>
      </div>
    </div>
  );
};

export default LabSidebar; 