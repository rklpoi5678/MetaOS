"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';




export default function About() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      // 현재 로그인된 사용자 정보 가져오기
      const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      };
      getUser();
  
      // 인증 상태 변경 감지
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
  
      return () => subscription.unsubscribe();
    }, []);
  
    const handleLogout = async () => {
      try {
        const { error } = await supabase.auth.signOut();
        localStorage.removeItem('isLoggedIn');
        if (error) throw error;
        router.push('/');
      } catch (error) {
        console.error('로그아웃 오류:', error);
      }
    };
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 헤더 */}
      <header className="fixed w-full bg-white/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MetaOS
              </span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/about" className="text-blue-600 hover:text-blue-700 transition-colors">
                About
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
                Pricing
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
                Blog
              </Link>
            </nav>
            {/* 오른쪽 메뉴 */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    대시보드
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-sm px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/signin" 
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    로그인
                  </Link>
                  <Link 
                    href="/signup"
                    className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    시작하기
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 히어로 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
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
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">핵심 가치</h2>
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">우리의 팀</h2>
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 bg-blue-600 rounded-2xl p-8 text-center text-white"
          >
            <h2 className="text-2xl font-bold mb-4">지금 시작하세요</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              MetaOS와 함께 더 스마트한 프로젝트 관리를 경험하세요
            </p>
            <Link 
              href="/signup" 
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              무료 체험 시작
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 