'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function HowItWorksSection() {
  const t = useTranslations('howItWorks');

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
          {[
            {
              step: t('steps.setup.step'),
              title: t('steps.setup.title'),
              description: t('steps.setup.description'),
              icon: "🚀"
            },
            {
              step: t('steps.plan.step'),
              title: t('steps.plan.title'),
              description: t('steps.plan.description'),
              icon: "🤖"
            },
            {
              step: t('steps.execute.step'),
              title: t('steps.execute.title'),
              description: t('steps.execute.description'),
              icon: "📈"
            },

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