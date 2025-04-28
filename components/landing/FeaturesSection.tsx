'use client'

import { motion } from 'framer-motion'

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            주요 기능
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            MetaOS의 강력한 기능들로 프로젝트를 더 효율적으로 관리하세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "실시간 협업",
              description: "팀원들과 실시간으로 소통하고 작업을 공유하세요",
              icon: "👥"
            },
            {
              title: "AI 분석",
              description: "AI가 프로젝트 데이터를 분석하여 인사이트를 제공합니다",
              icon: "🤖"
            },
            {
              title: "자동화 워크플로우",
              description: "반복적인 작업을 자동화하여 시간을 절약하세요",
              icon: "⚡"
            },
            {
              title: "데이터 시각화",
              description: "복잡한 데이터를 직관적인 그래프로 확인하세요",
              icon: "📊"
            },
            {
              title: "통합 캘린더",
              description: "모든 일정을 한 곳에서 관리하세요",
              icon: "📅"
            },
            {
              title: "보안 및 권한",
              description: "강력한 보안과 세밀한 권한 관리로 안전하게 작업하세요",
              icon: "🔒"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm"
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