'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AgentDemoPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleDemo = async () => {
    // 실제 API 호출이 있다면 여기서 처리
    // 임시 응답
    setResponse('에이전트가 당신의 요청을 분석하고 있습니다...');
    setTimeout(() => {
      setResponse(`"${input}"에 대한 실행 계획을 정리했어요.`);
    }, 1500);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-24 px-6 flex flex-col items-center text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-6">🧠 AI Agent 데모 체험</h1>
      <p className="text-lg text-gray-600 mb-10">
        원하는 목표를 입력하면, 에이전트가 실행 전략을 제안해줍니다.
      </p>

      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="예: 인스타그램 성장 전략 알려줘"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleDemo}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          실행 계획 받아보기
        </button>
      </div>

      {response && (
        <motion.div
          className="mt-10 p-6 bg-white rounded-lg shadow-md w-full max-w-lg text-left text-gray-800"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h3 className="text-lg font-semibold mb-2">📝 Agent 응답:</h3>
          <p>{response}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
