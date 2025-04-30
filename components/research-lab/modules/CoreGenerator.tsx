'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface CoreGeneratorProps {
  onEmotionChange: (emotions: { focus: number; flow: number; clarity: number }) => void;
}

const CoreGenerator: React.FC<CoreGeneratorProps> = ({ onEmotionChange }) => {
  const [philosophy, setPhilosophy] = useState('');
  const [selectedVectors, setSelectedVectors] = useState<string[]>([]);
  const [generatedCore, setGeneratedCore] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const generatePrompt = () => {
    const selectedVectorNames = selectedVectors.map(id => 
      vectors.find(v => v.id === id)?.name
    ).join(', ');

    return `다음 철학과 벡터를 기반으로 코어를 생성해주세요:
철학: "${philosophy}"
선택된 벡터: ${selectedVectorNames}

다음 형식으로 응답해주세요:
[코어 ID: C-{timestamp}]

철학적 기반: "{철학}"
선택된 벡터: {벡터 목록}

핵심 사고 패턴:
1. {패턴1}
2. {패턴2}
3. {패턴3}

존재 인식 모델:
- 자기 인식: {수준}
- 환경 인식: {수준}
- 목적 지향성: {수준}`;
  };

  const handleGenerate = async () => {
    if (!philosophy || selectedVectors.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const prompt = generatePrompt();

      // 1. 캐시 확인
      const { data: cacheData, error: cacheError } = await supabase
        .from("llm_cache")
        .select("answer")
        .eq("question", prompt)
        .single();

      if (cacheError && cacheError.code !== 'PGRST116') {
        console.error('캐시 조회 오류:', cacheError);
      }

      if (cacheData?.answer) {
        setGeneratedCore(cacheData.answer);
        setIsLoading(false);
        return;
      }

      // 2. Ollama LLM 요청
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
          model: "mistral"
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('LLM 응답 오류');
      }

      const { response: answer } = await response.json();

      // 3. 응답 저장
      await supabase.from("llm_cache").insert([{ 
        question: prompt, 
        answer: answer 
      }]);

      // 4. 결과 표시
      setGeneratedCore(answer);

      // 감정 상태 업데이트
      onEmotionChange({
        focus: 0.8,
        flow: 0.7,
        clarity: 0.9
      });

    } catch (error) {
      console.error('코어 생성 오류:', error);
      setError('코어 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <header className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">💠 코어 생성기</h2>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          존재의 원형을 사고 단위로 추출하고 구조화합니다
        </p>
      </header>

      <div className="space-y-4 sm:space-y-6">
        {/* 철학 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            핵심 철학 입력
          </label>
          <textarea
            value={philosophy}
            onChange={(e) => setPhilosophy(e.target.value)}
            placeholder="예: 적게 배우고 많이 깨닫는다"
            className="w-full h-32 sm:h-24 p-3 border rounded-lg text-sm sm:text-base"
          />
        </div>

        {/* 벡터 선택 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            사유 벡터 설정
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {vectors.map((vector) => (
              <motion.button
                key={vector.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVectorToggle(vector.id)}
                className={`
                  p-3 sm:p-4 rounded-lg text-left border
                  ${selectedVectors.includes(vector.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'}
                `}
              >
                <h4 className="font-medium text-gray-800 text-sm sm:text-base">{vector.name}</h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  {vector.description}
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="p-3 sm:p-4 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* 생성 버튼 */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={isLoading || !philosophy || selectedVectors.length === 0}
            className={`
              w-full sm:w-auto px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base
              ${isLoading || !philosophy || selectedVectors.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600'}
            `}
          >
            {isLoading ? '생성 중...' : '코어 생성'}
          </motion.button>
        </div>

        {/* 생성된 결과 */}
        {generatedCore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gray-50 rounded-lg overflow-x-auto"
          >
            <pre className="whitespace-pre-wrap font-mono text-xs sm:text-sm">
              {generatedCore}
            </pre>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CoreGenerator; 