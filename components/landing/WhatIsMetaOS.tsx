'use client'

import { motion } from 'framer-motion'

export default function WhatIsMetaOSSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            MetaOS란 무엇인가요?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI 기반 프로젝트 관리 시스템으로, 당신의 아이디어를 현실로 만들어줍니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "AI 기반 프로젝트 생성",
              description: "간단한 설명만으로 완성된 프로젝트 구조를 생성합니다",
              icon: "🧠"
            },
            {
              title: "자동화된 워크플로우",
              description: "반복적인 작업을 자동화하여 효율성을 높입니다",
              icon: "🔄"
            },
            {
              title: "실시간 분석",
              description: "프로젝트 진행 상황을 실시간으로 분석하고 최적화합니다",
              icon: "📊"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 p-8 rounded-xl shadow-sm"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 