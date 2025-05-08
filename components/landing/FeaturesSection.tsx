'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

export default function FeaturesSection() {
  const t = useTranslations('features');

  const features = [
    {
      title: t('items.collaboration.title'),
      description: t('items.collaboration.description'),
      icon: "👥"
    },
    {
      title: t('items.aiAnalysis.title'),
      description: t('items.aiAnalysis.description'),
      icon: "🤖"
    },
    {
      title: t('items.workflow.title'),
      description: t('items.workflow.description'),
      icon: "⚡"
    },
    {
      title: t('items.visualization.title'),
      description: t('items.visualization.description'),
      icon: "📊"
    },
    {
      title: t('items.calendar.title'),
      description: t('items.calendar.description'),
      icon: "📅"
    },
    {
      title: t('items.security.title'),
      description: t('items.security.description'),
      icon: "🔒"
    }
  ];

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
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
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