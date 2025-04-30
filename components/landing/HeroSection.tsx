'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            프로젝트의 미래를<br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MetaOS
            </span>
            와 함께
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            AI 기반 프로젝트 관리 플랫폼으로 더 스마트하게 일하세요.
            실시간 협업, 자동화된 워크플로우, 데이터 기반 인사이트를 제공합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              시작하기
            </Link>
            <Link
              href="/info/about"
              className="px-8 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              더 알아보기
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 