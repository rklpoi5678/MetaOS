'use client'

import { motion } from 'framer-motion'

export default function FeaturesSection() {
  const features = [
    {
      title: "Flow",
      description: "프로젝트의 흐름을 자동으로 최적화하고 관리합니다. AI가 당신의 작업 패턴을 학습하여 더 효율적인 워크플로우를 제안합니다."
    },
    {
      title: "Insight",
      description: "프로젝트의 모든 데이터를 실시간으로 분석하고 인사이트를 제공합니다. 데이터 기반의 의사결정을 지원합니다."
    },
    {
      title: "Self-aware",
      description: "AI가 프로젝트의 상태를 지속적으로 모니터링하고 개선점을 제안합니다. 스스로 학습하고 진화하는 시스템입니다."
    }
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">핵심 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 