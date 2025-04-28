'use client'

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Footer from '@/components/landing/Footer';
import Navigation from '@/components/landing/Navigation';
import CTASection from '@/components/landing/CTASection';

export default function AboutPage() {
  const controls = useAnimation();
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
              프로젝트의 미래를<br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MetaOS
              </span>
              와 함께
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI 기반 프로젝트 관리 플랫폼으로 더 스마트하게 일하세요.
              실시간 협업, 자동화된 워크플로우, 데이터 기반 인사이트를 제공합니다.
            </p>
          </motion.div>

          {/* 미션 & 비전 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">미션</h2>
              <p className="text-gray-600">
                우리는 프로젝트 관리를 더 스마트하고 효율적으로 만들어, 
                모든 팀이 더 나은 결과를 빠르게 달성할 수 있도록 돕습니다.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">비전</h2>
              <p className="text-gray-600">
                AI와 인간의 협업을 통해 프로젝트 관리의 새로운 패러다임을 만들어,
                더 나은 미래를 위한 혁신을 주도합니다.
              </p>
            </motion.div>
          </div>

          {/* 핵심 가치 */}
          <section className="mb-20">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-center mb-12 text-gray-900"
            >
              핵심 가치
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
              {[
                {
                  title: "혁신",
                  description: "최신 기술과 AI를 활용하여 프로젝트 관리를 혁신합니다.",
                  icon: "🚀"
                },
                {
                  title: "협업",
                  description: "팀원 간의 원활한 소통과 협업을 지원합니다.",
                  icon: "🤝"
                },
                {
                  title: "성장",
                  description: "지속적인 학습과 개선을 통해 함께 성장합니다.",
                  icon: "📈"
                }
              ].map((value, index) => (
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
              우리의 팀
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-800">
              {[
                {
                  name: "김철수",
                  role: "CEO",
                  image: "👨‍💼"
                },
                {
                  name: "이영희",
                  role: "CTO",
                  image: "👩‍💻"
                },
                {
                  name: "박민수",
                  role: "디자인 리더",
                  image: "🎨"
                },
                {
                  name: "정지원",
                  role: "AI 엔지니어",
                  image: "🤖"
                }
              ].map((member, index) => (
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
      <Footer />
    </div>
  );
} 