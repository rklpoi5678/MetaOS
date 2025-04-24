'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CoreGeneratorProps {
  onEmotionChange: (emotions: { focus: number; flow: number; clarity: number }) => void;
}

const CoreGenerator: React.FC<CoreGeneratorProps> = ({ onEmotionChange }) => {
  const [philosophy, setPhilosophy] = useState('');
  const [selectedVectors, setSelectedVectors] = useState<string[]>([]);
  const [generatedCore, setGeneratedCore] = useState<string | null>(null);

  const vectors = [
    { id: 'survival', name: '생존', description: '기본적인 생존과 적응 능력' },
    { id: 'relation', name: '관계', description: '타 존재와의 상호작용' },
    { id: 'achievement', name: '성취', description: '목표 달성과 성장' },
    { id: 'meaning', name: '의미', description: '존재의 가치와 목적' }
  ];

  const handleVectorToggle = (vectorId: string) => {
    setSelectedVectors(prev =>
      prev.includes(vectorId)
        ? prev.filter(id => id !== vectorId)
        : [...prev, vectorId]
    );
  };

  const handleGenerate = () => {
    // 실제로는 여기서 AI 모델과 연동하여 코어를 생성
    setGeneratedCore(
      `[코어 ID: C-${Date.now()}]
      
철학적 기반: "${philosophy}"
선택된 벡터: ${selectedVectors.map(id => 
  vectors.find(v => v.id === id)?.name
).join(', ')}

핵심 사고 패턴:
1. 입력 → 처리 → 출력의 순환적 구조
2. 자기 참조적 개선 루프
3. 맥락 기반 적응형 결정

존재 인식 모델:
- 자기 인식: 높음
- 환경 인식: 중간
- 목적 지향성: 강함`
    );

    // 감정 상태 업데이트
    onEmotionChange({
      focus: 0.8,
      flow: 0.7,
      clarity: 0.9
    });
  };

  return (
    <div className="p-6">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">💠 코어 생성기</h2>
        <p className="text-gray-600 mt-2">
          존재의 원형을 사고 단위로 추출하고 구조화합니다
        </p>
      </header>

      <div className="space-y-6">
        {/* 철학 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            핵심 철학 입력
          </label>
          <textarea
            value={philosophy}
            onChange={(e) => setPhilosophy(e.target.value)}
            placeholder="예: 적게 배우고 많이 깨닫는다"
            className="w-full h-24 p-3 border rounded-lg"
          />
        </div>

        {/* 벡터 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            사유 벡터 설정
          </label>
          <div className="grid grid-cols-2 gap-4">
            {vectors.map((vector) => (
              <motion.button
                key={vector.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVectorToggle(vector.id)}
                className={`
                  p-4 rounded-lg text-left border
                  ${selectedVectors.includes(vector.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'}
                `}
              >
                <h4 className="font-medium text-gray-800">{vector.name}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {vector.description}
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 생성 버튼 */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg"
            disabled={!philosophy || selectedVectors.length === 0}
          >
            코어 생성
          </motion.button>
        </div>

        {/* 생성된 결과 */}
        {generatedCore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-gray-50 rounded-lg"
          >
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {generatedCore}
            </pre>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoreGenerator; 