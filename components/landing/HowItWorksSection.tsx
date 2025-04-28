'use client'

import { motion } from 'framer-motion'

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Core",
      description: "프로젝트의 핵심 가치와 목표를 정의합니다"
    },
    {
      title: "Structure",
      description: "체계적인 프로젝트 구조를 설계합니다"
    },
    {
      title: "Tool",
      description: "필요한 도구와 리소스를 자동으로 구성합니다"
    },
    {
      title: "Experiment",
      description: "지속적인 실험과 개선을 통해 진화합니다"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">작동 방식</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 