'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/landing/Footer';
import Navigation from '@/components/landing/Navigation';

export default function Blog() {
    
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 헤더 */}
      <Navigation />

      {/* 메인 컨텐츠 */}
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 블로그 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">MetaOS 블로그</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              프로젝트 관리, AI, 그리고 업무 혁신에 관한 최신 소식과 인사이트
            </p>
          </motion.div>

          {/* 블로그 포스트 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI가 프로젝트 관리를 어떻게 변화시키는가",
                excerpt: "인공지능이 프로젝트 관리의 미래를 어떻게 변화시키고 있는지 알아봅니다.",
                date: "2024.03.15",
                category: "AI & 기술",
                image: "🤖"
              },
              {
                title: "효율적인 팀 협업을 위한 5가지 팁",
                excerpt: "팀의 생산성을 높이는 실용적인 협업 전략을 공유합니다.",
                date: "2024.03.10",
                category: "협업",
                image: "👥"
              },
              {
                title: "프로젝트 성공을 위한 데이터 분석",
                excerpt: "데이터 기반 의사결정이 프로젝트 성공에 미치는 영향에 대해 알아봅니다.",
                date: "2024.03.05",
                category: "데이터 분석",
                image: "📊"
              }
            ].map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{post.image}</div>
                  <div className="text-sm text-blue-600 mb-2">{post.category}</div>
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <Link 
                      href="#" 
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      더보기 →
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 뉴스레터 구독 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 bg-blue-600 rounded-2xl p-8 text-center text-white"
          >
            <h2 className="text-2xl font-bold mb-4">최신 소식을 놓치지 마세요</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              MetaOS의 최신 소식과 인사이트를 이메일로 받아보세요
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
        </div>
      </main>
      <Footer />
    </div>
  );
} 