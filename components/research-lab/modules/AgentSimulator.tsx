'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AgentSimulatorProps {
  onEmotionChange: (emotions: { focus: number; flow: number; clarity: number }) => void;
}

interface Agent {
  id: string;
  name: string;
  personality: {
    curiosity: number;
    creativity: number;
    adaptability: number;
    persistence: number;
  };
  knowledge: string[];
  currentTask: string;
  status: 'idle' | 'thinking' | 'learning' | 'executing';
  history: {
    timestamp: string;
    action: string;
    result: string;
  }[];
}

const AgentSimulator: React.FC<AgentSimulatorProps> = ({ onEmotionChange }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [currentAgent, setCurrentAgent] = useState<Agent>({
    id: '',
    name: '',
    personality: {
      curiosity: 0.5,
      creativity: 0.5,
      adaptability: 0.5,
      persistence: 0.5
    },
    knowledge: [],
    currentTask: '',
    status: 'idle',
    history: []
  });
  const [simulationSpeed, setSimulationSpeed] = useState(1);

  const handleAddKnowledge = () => {
    setCurrentAgent({
      ...currentAgent,
      knowledge: [...currentAgent.knowledge, '']
    });
  };

  const handleKnowledgeChange = (index: number, value: string) => {
    const newKnowledge = [...currentAgent.knowledge];
    newKnowledge[index] = value;
    setCurrentAgent({ ...currentAgent, knowledge: newKnowledge });
  };

  const handleCreateAgent = () => {
    if (!currentAgent.name) return;

    const newAgent: Agent = {
      ...currentAgent,
      id: `agent-${Date.now()}`
    };

    setAgents([...agents, newAgent]);
    setCurrentAgent({
      id: '',
      name: '',
      personality: {
        curiosity: 0.5,
        creativity: 0.5,
        adaptability: 0.5,
        persistence: 0.5
      },
      knowledge: [],
      currentTask: '',
      status: 'idle',
      history: []
    });

    // 에이전트 생성 시 감정 상태 업데이트
    onEmotionChange({
      focus: 0.8,
      flow: 0.7,
      clarity: 0.9
    });
  };

  const handleStartSimulation = (agentId: string) => {
    setAgents(agents.map(agent => {
      if (agent.id === agentId) {
        return { ...agent, status: 'thinking' };
      }
      return agent;
    }));

    // 시뮬레이션 시작
    simulateAgentBehavior(agentId);
  };

  const simulateAgentBehavior = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;

    const actions = [
      '지식 분석',
      '패턴 인식',
      '가설 수립',
      '실험 설계',
      '결과 평가',
      '학습 통합'
    ];

    let currentActionIndex = 0;
    const interval = setInterval(() => {
      if (currentActionIndex >= actions.length) {
        clearInterval(interval);
        setAgents(agents.map(a => {
          if (a.id === agentId) {
            return { ...a, status: 'idle' };
          }
          return a;
        }));
        return;
      }

      const action = actions[currentActionIndex];
      const result = `시뮬레이션 결과: ${action} 완료`;
      
      setAgents(agents.map(a => {
        if (a.id === agentId) {
          return {
            ...a,
            status: currentActionIndex % 2 === 0 ? 'thinking' : 'learning',
            history: [...a.history, {
              timestamp: new Date().toISOString(),
              action,
              result
            }]
          };
        }
        return a;
      }));

      currentActionIndex++;
    }, 2000 / simulationSpeed);
  };

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'idle': return 'bg-gray-100 text-gray-800';
      case 'thinking': return 'bg-blue-100 text-blue-800';
      case 'learning': return 'bg-green-100 text-green-800';
      case 'executing': return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">🤖 에이전트 시뮬레이터</h2>
        <p className="text-gray-600 mt-2">
          AI 에이전트의 행동과 학습 과정을 시뮬레이션합니다
        </p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {/* 에이전트 생성 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              에이전트 이름
            </label>
            <input
              type="text"
              value={currentAgent.name}
              onChange={(e) => setCurrentAgent({
                ...currentAgent,
                name: e.target.value
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              성격 특성
            </label>
            <div className="space-y-2">
              {Object.entries(currentAgent.personality).map(([trait, value]) => (
                <div key={trait} className="flex items-center gap-4">
                  <span className="w-24 text-sm text-gray-600">
                    {trait === 'curiosity' ? '호기심' :
                     trait === 'creativity' ? '창의성' :
                     trait === 'adaptability' ? '적응력' : '지속성'}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={value}
                    onChange={(e) => setCurrentAgent({
                      ...currentAgent,
                      personality: {
                        ...currentAgent.personality,
                        [trait]: parseFloat(e.target.value)
                      }
                    })}
                    className="flex-1"
                  />
                  <span className="w-8 text-sm text-gray-600">
                    {Math.round(value * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              초기 지식
            </label>
            <div className="space-y-2">
              {currentAgent.knowledge.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => handleKnowledgeChange(index, e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="지식 항목 입력"
                />
              ))}
              <button
                onClick={handleAddKnowledge}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                + 지식 추가
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreateAgent}
            disabled={!currentAgent.name}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            에이전트 생성
          </motion.button>
        </div>

        {/* 시뮬레이션 패널 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-800">활성 에이전트</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">시뮬레이션 속도:</span>
              <select
                value={simulationSpeed}
                onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                className="p-2 border rounded-lg"
              >
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="2">2x</option>
                <option value="5">5x</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {agents.map((agent) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{agent.name}</h4>
                    <div className="flex gap-2 mt-1">
                      {Object.entries(agent.personality).map(([trait, value]) => (
                        <span
                          key={trait}
                          className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                        >
                          {trait === 'curiosity' ? '호기심' :
                           trait === 'creativity' ? '창의성' :
                           trait === 'adaptability' ? '적응력' : '지속성'}: {Math.round(value * 100)}%
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(agent.status)}`}>
                      {agent.status === 'idle' ? '대기 중' :
                       agent.status === 'thinking' ? '사고 중' :
                       agent.status === 'learning' ? '학습 중' : '실행 중'}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStartSimulation(agent.id)}
                      disabled={agent.status !== 'idle'}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-sm disabled:opacity-50"
                    >
                      시뮬레이션 시작
                    </motion.button>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">활동 기록</h5>
                  <div className="h-32 overflow-y-auto bg-gray-100 rounded-lg p-2 space-y-1">
                    {agent.history.map((entry, index) => (
                      <div key={index} className="text-xs text-gray-600">
                        <span className="text-gray-500">
                          {new Date(entry.timestamp).toLocaleTimeString()}
                        </span>
                        <span className="mx-2">|</span>
                        <span className="font-medium">{entry.action}</span>
                        <span className="mx-2">→</span>
                        <span>{entry.result}</span>
                      </div>
                    ))}
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

export default AgentSimulator; 