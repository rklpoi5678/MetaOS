'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PricingSection() {
  const plans = [
    {
      name: "스타터",
      price: "무료",
      features: ["기본 프로젝트 관리", "최대 3명 팀원", "1GB 저장공간"]
    },
    {
      name: "프로",
      price: "₩29,900",
      period: "/월",
      features: ["모든 스타터 기능", "무제한 팀원", "10GB 저장공간", "고급 분석"]
    },
    {
      name: "엔터프라이즈",
      price: "₩99,900",
      period: "/월",
      features: ["모든 프로 기능", "우선 지원", "무제한 저장공간", "커스텀 통합"]
    }
  ]

  return (
    <section id="Pricing" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">가격 정책</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`bg-white p-8 rounded-xl shadow-sm ${
                index === 1 ? 'border-2 border-blue-500' : ''
              }`}
            >
              <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-gray-600">{plan.period}</span>}
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link 
                href="/signup" 
                className={`block text-center py-2 rounded-lg ${
                  index === 1 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                } transition-colors`}
              >
                시작하기
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 