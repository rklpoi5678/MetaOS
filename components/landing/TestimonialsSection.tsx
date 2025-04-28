'use client';

import { motion } from 'framer-motion';

export default function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">사용자 후기</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 p-8 rounded-xl"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">D</div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">디자인웨이브로</h4>
                <p className="text-sm text-gray-600">제조업</p>
              </div>
            </div>
            <p className="text-gray-700">{"MetaOS 도입 후 업무 처리 시간이 60% 단축되었습니다. AI가 프로젝트 구조를 자동으로 설계해주니 정말 편리합니다."}</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-50 p-8 rounded-xl"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">G</div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">(주)구구 컴퍼니</h4>
                <p className="text-sm text-gray-600">IT 서비스</p>
              </div>
            </div>
            <p className="text-gray-700">{"AI 기반 자동화로 인적 오류가 90% 감소했습니다. 특히 실시간 분석 기능이 프로젝트 관리에 큰 도움이 됩니다."}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 