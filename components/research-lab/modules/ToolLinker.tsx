'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ToolLinkerProps {
  onEmotionChange: (emotions: { focus: number; flow: number; clarity: number }) => void;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  triggers: string[];
  actions: string[];
  isActive: boolean;
}

const ToolLinker: React.FC<ToolLinkerProps> = ({ onEmotionChange }) => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [currentTool, setCurrentTool] = useState<Tool>({
    id: '',
    name: '',
    description: '',
    triggers: [],
    actions: [],
    isActive: false
  });

  const handleAddTool = () => {
    if (!currentTool.name) return;

    const newTool: Tool = {
      ...currentTool,
      id: `tool-${Date.now()}`
    };

    setTools([...tools, newTool]);
    setCurrentTool({
      id: '',
      name: '',
      description: '',
      triggers: [],
      actions: [],
      isActive: false
    });

    // 도구가 추가될 때마다 흐름 상태가 증가
    onEmotionChange({
      focus: 0.8,
      flow: Math.min(1, 0.7 + tools.length * 0.1),
      clarity: 0.9
    });
  };

  const handleTriggerChange = (index: number, value: string) => {
    const newTriggers = [...currentTool.triggers];
    newTriggers[index] = value;
    setCurrentTool({ ...currentTool, triggers: newTriggers });
  };

  const handleActionChange = (index: number, value: string) => {
    const newActions = [...currentTool.actions];
    newActions[index] = value;
    setCurrentTool({ ...currentTool, actions: newActions });
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">🛠 도구 연결기</h2>
        <p className="text-gray-600 mt-2">
          실행 도구와 트리거를 연결하여 자동화 흐름을 설계합니다
        </p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {/* 도구 입력 폼 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              도구 이름
            </label>
            <input
              type="text"
              value={currentTool.name}
              onChange={(e) => setCurrentTool({ ...currentTool, name: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              설명
            </label>
            <textarea
              value={currentTool.description}
              onChange={(e) => setCurrentTool({ ...currentTool, description: e.target.value })}
              className="w-full h-24 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              트리거
            </label>
            <div className="space-y-2">
              {currentTool.triggers.map((trigger, index) => (
                <input
                  key={index}
                  type="text"
                  value={trigger}
                  onChange={(e) => handleTriggerChange(index, e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="트리거 조건 입력"
                />
              ))}
              <button
                onClick={() => setCurrentTool({
                  ...currentTool,
                  triggers: [...currentTool.triggers, '']
                })}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                + 트리거 추가
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              액션
            </label>
            <div className="space-y-2">
              {currentTool.actions.map((action, index) => (
                <input
                  key={index}
                  type="text"
                  value={action}
                  onChange={(e) => handleActionChange(index, e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="실행할 액션 입력"
                />
              ))}
              <button
                onClick={() => setCurrentTool({
                  ...currentTool,
                  actions: [...currentTool.actions, '']
                })}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                + 액션 추가
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddTool}
            disabled={!currentTool.name}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            도구 추가
          </motion.button>
        </div>

        {/* 도구 목록 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">연결된 도구</h3>
          <div className="space-y-4">
            {tools.map((tool) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{tool.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                  </div>
                  <button
                    onClick={() => setTools(tools.filter(t => t.id !== tool.id))}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">트리거:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {tool.triggers.map((trigger, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                        >
                          {trigger}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500">액션:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {tool.actions.map((action, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                        >
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolLinker; 