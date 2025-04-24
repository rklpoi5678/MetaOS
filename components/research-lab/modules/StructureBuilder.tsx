'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface StructureBuilderProps {
  onEmotionChange: (emotions: { focus: number; flow: number; clarity: number }) => void;
}

interface StructureNode {
  id: string;
  type: 'concept' | 'relation' | 'process';
  label: string;
  description: string;
  connections: string[];
}

const StructureBuilder: React.FC<StructureBuilderProps> = ({ onEmotionChange }) => {
  const [nodes, setNodes] = useState<StructureNode[]>([]);
  const [currentNode, setCurrentNode] = useState<StructureNode>({
    id: '',
    type: 'concept',
    label: '',
    description: '',
    connections: []
  });

  const handleAddNode = () => {
    if (!currentNode.label) return;

    const newNode: StructureNode = {
      ...currentNode,
      id: `node-${Date.now()}`,
      connections: []
    };

    setNodes([...nodes, newNode]);
    setCurrentNode({
      id: '',
      type: 'concept',
      label: '',
      description: '',
      connections: []
    });

    // 구조가 더 복잡해질수록 집중도/명확성이 약간 감소
    onEmotionChange({
      focus: Math.max(0.5, 1 - nodes.length * 0.1),
      flow: 0.7,
      clarity: Math.max(0.4, 1 - nodes.length * 0.15)
    });
  };

  const nodeTypes = {
    concept: { name: '개념', color: 'blue' },
    relation: { name: '관계', color: 'green' },
    process: { name: '프로세스', color: 'purple' }
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">🧩 구조 설계기</h2>
        <p className="text-gray-600 mt-2">
          사고 구조를 시각적으로 설계하고 연결합니다
        </p>
      </header>

      <div className="grid grid-cols-3 gap-6">
        {/* 노드 입력 폼 */}
        <div className="col-span-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              노드 유형
            </label>
            <select
              value={currentNode.type}
              onChange={(e) => setCurrentNode({
                ...currentNode,
                type: e.target.value as StructureNode['type']
              })}
              className="w-full p-2 border rounded-lg"
            >
              {Object.entries(nodeTypes).map(([type, { name }]) => (
                <option key={type} value={type}>{name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              레이블
            </label>
            <input
              type="text"
              value={currentNode.label}
              onChange={(e) => setCurrentNode({
                ...currentNode,
                label: e.target.value
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <textarea
              value={currentNode.description}
              onChange={(e) => setCurrentNode({
                ...currentNode,
                description: e.target.value
              })}
              className="w-full h-24 p-2 border rounded-lg"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddNode}
            aria-disabled={!currentNode.label}
            className={`w-full px-4 py-2 bg-blue-500 text-white rounded-lg ${!currentNode.label ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            노드 추가
          </motion.button>
        </div>

        {/* 구조 시각화 */}
        <div className="col-span-2 bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`
                  p-4 rounded-lg border-2
                  ${node.type === 'concept' ? 'border-blue-500 bg-blue-50' :
                    node.type === 'relation' ? 'border-green-500 bg-green-50' :
                    'border-purple-500 bg-purple-50'}
                `}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-medium text-gray-500">
                      {nodeTypes[node.type].name}
                    </span>
                    <h4 className="font-medium text-gray-800 mt-1">
                      {node.label}
                    </h4>
                  </div>
                  <button
                    onClick={() => {
                      setNodes(nodes.filter(n => n.id !== node.id));
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                {node.description && (
                  <p className="text-sm text-gray-600 mt-2">
                    {node.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructureBuilder; 