'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CoreGenerator from '@/components/research-lab/modules/CoreGenerator';
import StructureBuilder from '@/components/research-lab/modules/StructureBuilder';
import ToolLinker from '@/components/research-lab/modules/ToolLinker';
import ExperimentRunner from '@/components/research-lab/modules/ExperimentRunner';
import ArchiveManager from '@/components/research-lab/modules/ArchiveManager';
import OpenSyncPanel from '@/components/research-lab/modules/OpenSyncPanel';
import AgentSimulator from '@/components/research-lab/modules/AgentSimulator';
import { ChatForm } from '@/components/research-lab/modules/chat/ChatForm';

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
      case 'chat':
        return <ChatForm />;
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
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-lg shadow-sm h-full overflow-auto"
    >
      {renderModule()}
    </motion.div>
  );
};

export default MainPanel; 