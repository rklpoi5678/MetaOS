'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LabSidebar from '@/components/research-lab/LabSidebar';
import MainPanel from '@/components/research-lab/MainPanel';
import RightDock from '@/components/research-lab/RightDock';

const ResearchLab: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>('core-generator');
  const [emotionState, setEmotionState] = useState({
    focus: 0.7,
    flow: 0.8,
    clarity: 0.6
  });

  return (
    <div className="flex h-full bg-gray-100">
      {/* 좌측 사이드바 */}
      <LabSidebar 
        selectedModule={selectedModule}
        onModuleSelect={setSelectedModule}
      />

      {/* 메인 패널 */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="flex-1 p-6 h-full"
        >
        <MainPanel 
          currentModule={selectedModule}
          onEmotionChange={setEmotionState}
        />
      </motion.div>

      {/* 우측 도크 */}
      <RightDock emotionState={emotionState} />
    </div>
  );
};

export default ResearchLab; 