'use client'

import { motion } from 'framer-motion'

export default function HowItWorksSection() {
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
            작동 방식
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            MetaOS가 어떻게 당신의 프로젝트를 도와드리는지 알아보세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "프로젝트 생성",
              description: "간단한 설명으로 프로젝트를 시작하세요",
              icon: "🚀"
            },
            {
              step: "2",
              title: "AI 분석",
              description: "AI가 프로젝트 구조를 분석하고 최적화합니다",
              icon: "🤖"
            },
            {
              step: "3",
              title: "실행 및 관리",
              description: "최적화된 워크플로우로 프로젝트를 진행하세요",
              icon: "📈"
            }
          ].map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 p-8 rounded-xl shadow-sm text-center"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className="text-2xl font-bold text-blue-600 mb-2">Step {step.step}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 