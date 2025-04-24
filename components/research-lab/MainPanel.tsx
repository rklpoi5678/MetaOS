'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CoreGenerator from './modules/CoreGenerator';
import StructureBuilder from './modules/StructureBuilder';
import ToolLinker from './modules/ToolLinker';
import ExperimentRunner from './modules/ExperimentRunner';
import ArchiveManager from './modules/ArchiveManager';
import OpenSyncPanel from './modules/OpenSyncPanel';
import AgentSimulator from './modules/AgentSimulator';

interface MainPanelProps {
  currentModule: string;
  onEmotionChange: (emotions: { focus: number; flow: number; clarity: number }) => void;
}

const MainPanel: React.FC<MainPanelProps> = ({
  currentModule,
  onEmotionChange
}) => {
  const renderModule = () => {
    switch (currentModule) {
      case 'core-generator':
        return <CoreGenerator onEmotionChange={onEmotionChange} />;
      case 'structure-builder':
        return <StructureBuilder onEmotionChange={onEmotionChange} />;
      case 'tool-linker':
        return <ToolLinker onEmotionChange={onEmotionChange} />;
      case 'experiment-runner':
        return <ExperimentRunner onEmotionChange={onEmotionChange} />;
      case 'archive-manager':
        return <ArchiveManager onEmotionChange={onEmotionChange} />;
      case 'open-sync':
        return <OpenSyncPanel onEmotionChange={onEmotionChange} />;
      case 'agent-simulator':
        return <AgentSimulator onEmotionChange={onEmotionChange} />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">모듈을 선택해주세요</p>
          </div>
        );
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm h-full overflow-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {renderModule()}
    </motion.div>
  );
};

export default MainPanel; 