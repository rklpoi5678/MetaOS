'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function PricingSection() {
  const t = useTranslations('pricing');
  
  const plans = [
    {
      name: t('plans.starter.name'),
      price: t('plans.starter.price'),
      period: t('plans.starter.period'),
      features: [
        t('plans.starter.features.basicAI'),
        t('plans.starter.features.teamSize'),
        t('plans.starter.features.projects'),
        t('plans.starter.features.reports'),
        t('plans.starter.features.support')
      ],
      highlight: false
    },
    {
      name: t('plans.pro.name'),
      price: t('plans.pro.price'),
      period: t('plans.pro.period'),
      features: [
        t('plans.pro.features.advancedAI'),
        t('plans.pro.features.teamSize'),
        t('plans.pro.features.projects'),
        t('plans.pro.features.reports'),
        t('plans.pro.features.support'),
        t('plans.pro.features.api')
      ],
      highlight: true
    },
    {
      name: t('plans.enterprise.name'),
      price: t('plans.enterprise.price'),
      period: t('plans.enterprise.period'),
      features: [
        t('plans.enterprise.features.dedicatedAI'),
        t('plans.enterprise.features.teamSize'),
        t('plans.enterprise.features.projects'),
        t('plans.enterprise.features.reports'),
        t('plans.enterprise.features.manager'),
        t('plans.enterprise.features.api'),
        t('plans.enterprise.features.solutions')
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
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
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
                {t('cta')}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 