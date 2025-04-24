'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ExperimentRunnerProps {
  onEmotionChange: (emotions: { focus: number; flow: number; clarity: number }) => void;
}

interface Experiment {
  id: string;
  title: string;
  hypothesis: string;
  parameters: { key: string; value: string }[];
  results: string[];
  status: 'running' | 'completed' | 'failed';
}

const ExperimentRunner: React.FC<ExperimentRunnerProps> = ({ onEmotionChange }) => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [currentExperiment, setCurrentExperiment] = useState<Experiment>({
    id: '',
    title: '',
    hypothesis: '',
    parameters: [],
    results: [],
    status: 'running'
  });

  const handleAddParameter = () => {
    setCurrentExperiment({
      ...currentExperiment,
      parameters: [...currentExperiment.parameters, { key: '', value: '' }]
    });
  };

  const handleParameterChange = (index: number, field: 'key' | 'value', value: string) => {
    const newParameters = [...currentExperiment.parameters];
    newParameters[index] = { ...newParameters[index], [field]: value };
    setCurrentExperiment({ ...currentExperiment, parameters: newParameters });
  };

  const handleStartExperiment = () => {
    if (!currentExperiment.title || !currentExperiment.hypothesis) return;

    const newExperiment: Experiment = {
      ...currentExperiment,
      id: `exp-${Date.now()}`
    };

    setExperiments([...experiments, newExperiment]);
    setCurrentExperiment({
      id: '',
      title: '',
      hypothesis: '',
      parameters: [],
      results: [],
      status: 'running'
    });

    // 실험 시작 시 감정 상태 업데이트
    onEmotionChange({
      focus: 0.9,
      flow: 0.8,
      clarity: 0.7
    });
  };

  const getStatusColor = (status: Experiment['status']) => {
    switch (status) {
      case 'running': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">🧪 실험 실행기</h2>
        <p className="text-gray-600 mt-2">
          가설을 검증하고 피드백 루프를 통해 지식을 확장합니다
        </p>
      </header>

      <div className="grid grid-cols-2 gap-6">
        {/* 실험 설정 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              실험 제목
            </label>
            <input
              type="text"
              value={currentExperiment.title}
              onChange={(e) => setCurrentExperiment({
                ...currentExperiment,
                title: e.target.value
              })}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              가설
            </label>
            <textarea
              value={currentExperiment.hypothesis}
              onChange={(e) => setCurrentExperiment({
                ...currentExperiment,
                hypothesis: e.target.value
              })}
              className="w-full h-24 p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              파라미터
            </label>
            <div className="space-y-2">
              {currentExperiment.parameters.map((param, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={param.key}
                    onChange={(e) => handleParameterChange(index, 'key', e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="키"
                  />
                  <input
                    type="text"
                    value={param.value}
                    onChange={(e) => handleParameterChange(index, 'value', e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="값"
                  />
                </div>
              ))}
              <button
                onClick={handleAddParameter}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                + 파라미터 추가
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartExperiment}
            disabled={!currentExperiment.title || !currentExperiment.hypothesis}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            실험 시작
          </motion.button>
        </div>

        {/* 실험 목록 */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">실행 중인 실험</h3>
          <div className="space-y-4">
            {experiments.map((experiment) => (
              <motion.div
                key={experiment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800">{experiment.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{experiment.hypothesis}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(experiment.status)}`}>
                    {experiment.status === 'running' ? '실행 중' :
                     experiment.status === 'completed' ? '완료' : '실패'}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <span className="text-xs font-medium text-gray-500">파라미터:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {experiment.parameters.map((param, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                        >
                          {param.key}: {param.value}
                        </span>
                      ))}
                    </div>
                  </div>
                  {experiment.results.length > 0 && (
                    <div>
                      <span className="text-xs font-medium text-gray-500">결과:</span>
                      <div className="mt-1 space-y-1">
                        {experiment.results.map((result, index) => (
                          <p key={index} className="text-sm text-gray-600">
                            {result}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperimentRunner; 