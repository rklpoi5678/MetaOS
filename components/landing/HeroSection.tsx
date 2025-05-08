'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const [isLoginIn, setIsLoginIn] = useState(false);
  const t = useTranslations('hero');

  useEffect(() => {
    const checkLogin = () => {
      const stored = localStorage.getItem('isLoggedIn');
      setIsLoginIn(stored === 'true');
    }
    //클라이언트 렌더링 이후 확인
    checkLogin();

    //로그인 상태가 나중에 바뀌는 경우 대비 - 이벤트 리스너로 처리
    window.addEventListener('storage', checkLogin);

    //정리
    return () => {
      window.removeEventListener('storage', checkLogin);
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('title')} <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('metaOS')}{t('titleEnd')}
            </span>
          </h1>

          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('description')}
          </p>
          <motion.span
            whileHover={{ scale: 1.05}}
            className="bg-gradient-to-r mb-10 from-blue-500/20 to-purple-500/20 backdrop-blur-sm text-blue-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-400/20 inline-block"
            >
            {t('version')}
          </motion.span>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isLoginIn ? (
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('goToDashboard')}
              </Link>
            ) : (
            <Link
              href="/auth/signup"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('cta')}
            </Link>
            )}
            <Link
              href="/info/about"
              className="px-8 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t('learnMore')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 