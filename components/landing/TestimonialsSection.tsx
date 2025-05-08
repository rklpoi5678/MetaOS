'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function TestimonialsSection() {
  const t = useTranslations('testimonials');

  const testimonials = [
    {
      name: t('items.testimonial1.name'),
      role: t('items.testimonial1.role'),
      company: t('items.testimonial1.company'),
      content: t('items.testimonial1.content'),
      image: "👨‍💼"
    },
    {
      name: t('items.testimonial2.name'),
      role: t('items.testimonial2.role'),
      company: t('items.testimonial2.company'),
      content: t('items.testimonial2.content'),
      image: "👩‍💻"
    },
    {
      name: t('items.testimonial3.name'),
      role: t('items.testimonial3.role'),
      company: t('items.testimonial3.company'),
      content: t('items.testimonial3.content'),
      image: "🖥️"
    },
    {
      name: t('items.testimonial4.name'),
      role: t('items.testimonial4.role'),
      company: t('items.testimonial4.company'),
      content: t('items.testimonial4.content'),
      image: "🔭"
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
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{testimonial.image}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 

