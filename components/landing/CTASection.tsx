'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('cta');

  return (
    <motion.section className="py-20 bg-blue-600 mt-24 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">{t('title')}</h2>
        <p className="text-xl mb-8">{t('subtitle')}</p>
        <div className="flex justify-center gap-4">
          <Link href="/auth/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t('button')}
            </motion.button>
          </Link>
          <Link href="/info/agent-demo">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent border border-white text-white rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300"
            >
              {t('button2')}
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
} 