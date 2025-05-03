'use client'

import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navigation from '@/components/landing/Navigation';

export default function Blog() {
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
    hidden: { y: 20, opacity: 0 },
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
      <Navigation />

      <main className="pt-32 pb-20">
        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          animate={controls}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* 헤더 문구 */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">MetaOS 블로그</h1>
          </motion.div>

          {/* 블로그 iframe */}
          <motion.div
            variants={itemVariants}
            className="w-full h-[100vh] rounded-xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://nextra-blog-3t4s.vercel.app"
              title="MetaOS Blog"
              className="w-full h-full border-none"
              loading="lazy"
            />
          </motion.div>

          {/* 뉴스레터 */}
          <motion.div
            variants={itemVariants}
            className="mt-8 bg-blue-600 rounded-2xl p-8 text-center text-white"
          >
            <h2 className="text-2xl font-bold mb-2">최신 소식, 실험, 인사이트</h2>
            <p className="mb-4 max-w-2xl mx-auto">
              MetaOS의 실험 로그를 이메일로 받아보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="이메일 주소"
                className="px-4 py-2 rounded-lg text-gray-900 bg-gray-100 flex-grow"
              />
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                구독하기
              </button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
} 