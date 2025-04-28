'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function PricingSection() {
  const plans = [
    {
      name: "스타터",
      price: "₩29,000",
      period: "월",
      features: [
        "기본 AI 프로젝트 관리",
        "최대 3명 팀원",
        "5개 프로젝트",
        "기본 분석 리포트",
        "이메일 지원"
      ],
      highlight: false
    },
    {
      name: "프로",
      price: "₩99,000",
      period: "월",
      features: [
        "고급 AI 프로젝트 관리",
        "최대 10명 팀원",
        "무제한 프로젝트",
        "고급 분석 리포트",
        "우선 지원",
        "API 접근"
      ],
      highlight: true
    },
    {
      name: "엔터프라이즈",
      price: "₩299,000",
      period: "월",
      features: [
        "전용 AI 프로젝트 관리",
        "무제한 팀원",
        "무제한 프로젝트",
        "커스텀 분석 리포트",
        "전용 매니저",
        "API 우선 접근",
        "맞춤형 솔루션"
      ],
      highlight: false
    }
  ]

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
            가격 정책
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            팀의 규모와 필요에 맞는 플랜을 선택하세요
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`p-8 rounded-xl ${
                plan.highlight
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold ${
                  plan.highlight
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                시작하기
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 