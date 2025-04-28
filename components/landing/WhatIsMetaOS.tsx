'use client'

import { motion } from 'framer-motion'

export default function WhatIsMetaOS() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">MetaOS란 무엇인가요?</h2>
          <p className="text-xl text-gray-600">
            MetaOS는 당신의 아이디어를 현실로 만드는 AI 기반 프로젝트 플랫폼입니다.
            감정과 구조의 조화를 통해 더 나은 프로젝트를 만들어갑니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl mr-4">
                🎯
              </div>
              <h3 className="text-xl font-semibold text-gray-800">프로젝트 관리</h3>
            </div>
            <p className="text-gray-600">
              AI가 프로젝트의 구조를 자동으로 설계하고 최적화합니다.
              실시간으로 진행 상황을 모니터링하고 개선점을 제안합니다.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl mr-4">
                🤖
              </div>
              <h3 className="text-xl font-semibold text-gray-800">AI 기반 자동화</h3>
            </div>
            <p className="text-gray-600">
              반복적인 작업을 자동화하고, AI가 최적의 워크플로우를 제안합니다.
              시간을 절약하고 효율성을 높이세요.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
            <p className="text-gray-500">감정 그래프 애니메이션</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 