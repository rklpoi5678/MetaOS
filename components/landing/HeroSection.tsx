'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              당신의 생각이 현실이 되는 순간
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-8"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm text-blue-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-400/20 inline-block"
              >
                Alpha v0.1.3
              </motion.span>
            </motion.div>
            <p className="text-xl text-gray-600 mb-8">
              AI가 당신의 아이디어를 완성된 프로젝트로 만들어드립니다
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  무료로 시작하기
                </motion.button>
              </Link>
              <Link href="/demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 border border-blue-600 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  데모 체험하기
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm p-8 rounded-2xl border border-blue-400/20"
            >
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">AI 기반 프로젝트 생성</h3>
              <p className="text-gray-600">간단한 설명만으로 완성된 프로젝트 구조를 생성합니다</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm p-8 rounded-2xl border border-blue-400/20"
            >
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">자동화된 워크플로우</h3>
              <p className="text-gray-600">반복적인 작업을 자동화하여 효율성을 높입니다</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm p-8 rounded-2xl border border-blue-400/20"
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">실시간 분석</h3>
              <p className="text-gray-600">프로젝트 진행 상황을 실시간으로 분석하고 최적화합니다</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-16 bg-gray-50 rounded-2xl p-8 shadow-lg"
          >
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
              <p className="text-gray-500">AI 프로젝트 생성 시뮬레이션</p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
} 