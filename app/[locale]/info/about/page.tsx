'use client'

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import Navigation from '@/components/landing/Navigation';
import CTASection from '@/components/landing/CTASection';

export default function AboutPage() {
  const controls = useAnimation();
  const t = useTranslations('about');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 1 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const coreValues = [
    {
      title: t('coreValues.innovation.title'),
      description: t('coreValues.innovation.description'),
      icon: "🚀"
    },
    {
      title: t('coreValues.collaboration.title'),
      description: t('coreValues.collaboration.description'),
      icon: "🤝"
    },
    {
      title: t('coreValues.growth.title'),
      description: t('coreValues.growth.description'),
      icon: "📈"
    }
  ];

  const teamMembers = [
    {
      name: t('team.member1.name'),
      role: t('team.member1.role'),
      image: "👨‍💼"
    },
    {
      name: t('team.member2.name'),
      role: t('team.member2.role'),
      image: "👩‍💻"
    },
    {
      name: t('team.member3.name'),
      role: t('team.member3.role'),
      image: "🎨"
    },
    {
      name: t('team.member4.name'),
      role: t('team.member4.role'),
      image: "🤖"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 헤더 */}
      <Navigation />

      {/* 메인 컨텐츠 */}
      <main className="pt-32 pb-20">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* 히어로 섹션 */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-20"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {t('hero.title')}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MetaOS
              </span>
              {t('hero.titleEnd')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
          </motion.div>

          {/* 미션 & 비전 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('mission.title')}</h2>
              <p className="text-gray-600">
                {t('mission.description')}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('vision.title')}</h2>
              <p className="text-gray-600">
                {t('vision.description')}
              </p>
            </motion.div>
          </div>

          {/* 핵심 가치 */}
          <section className="mb-20">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-center mb-12 text-gray-900"
            >
              {t('coreValues.title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl shadow-sm text-center"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 팀 소개 */}
          <section>
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-center mb-12 text-gray-900"
            >
              {t('team.title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-800">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl shadow-sm text-center"
                >
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </section>
          {/* CTA 섹션 */}
          <CTASection />
        </motion.div>
      </main>
    </div>
  );
} 