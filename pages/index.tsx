// pages/index.tsx
"use client";

import React, { useEffect } from "react";
import Footer from "@/components/research-lab/Footer";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            MetaOS
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            당신의 아이디어를 현실로 만드는 AI 기반 프로젝트 플랫폼
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
          >
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-2">AI 기반 프로젝트 생성</h3>
            <p className="text-gray-400">간단한 설명만으로 완성된 프로젝트 구조를 생성합니다</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
          >
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold mb-2">자동화된 워크플로우</h3>
            <p className="text-gray-400">반복적인 작업을 자동화하여 효율성을 높입니다</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">실시간 분석</h3>
            <p className="text-gray-400">프로젝트 진행 상황을 실시간으로 분석하고 최적화합니다</p>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">지금 바로 시작하세요</p>
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              무료로 시작하기
            </motion.button>
          </Link>
          <p className="text-sm text-gray-500 mt-4">알파 버전 - 무료로 이용 가능</p>
        </motion.div>

        {/* Alpha Badge and Demo Button */}
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium"
          >
            Alpha v0.1
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onTap={() => router.push('/demo')}
            className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-500/30 transition-all duration-300"
          >
            데모 체험하기
          </motion.button>
        </div>
      </div>

      {/* 가치 제안 */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">왜 MetaOS인가요?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡️</div>
              <h3 className="text-xl font-semibold text-gray-800">생산성 300% 향상</h3>
              <p className="mt-2 text-gray-600">AI 자동화로 반복 업무 해방</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-gray-800">비용 50% 절감</h3>
              <p className="mt-2 text-gray-600">업무 자동화로 인건비 절감</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-gray-800">엔터프라이즈급 보안</h3>
              <p className="mt-2 text-gray-600">ISO27001 인증</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-gray-800">글로벌 확장성</h3>
              <p className="mt-2 text-gray-600">40개국 언어 지원</p>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 기능 */}
      <section className="py-16 px-8 bg-slate-50">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">핵심 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-800">AI 워크플로우</h3>
            <p className="mt-2 text-gray-600">머신러닝 기반 업무 자동화</p>
            <ul className="mt-4 text-gray-600 text-sm">
              <li>• 문서 자동 분류</li>
              <li>• 데이터 자동 입력</li>
              <li>• 업무 우선순위 추천</li>
            </ul>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-800">실시간 분석</h3>
            <p className="mt-2 text-gray-600">데이터 기반 의사결정</p>
            <ul className="mt-4 text-gray-600 text-sm">
              <li>• 실시간 대시보드</li>
              <li>• 맞춤형 리포트</li>
              <li>• 예측 분석</li>
            </ul>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-gray-800">팀 협업</h3>
            <p className="mt-2 text-gray-600">원활한 커뮤니케이션</p>
            <ul className="mt-4 text-gray-600 text-sm">
              <li>• 실시간 문서 공유</li>
              <li>• 화상 회의</li>
              <li>• 팀 채팅</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 고객 사례 */}
      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">신뢰할 수 있는 파트너</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-slate-50 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">D</div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">디자인웨이브로</h4>
                <p className="text-sm text-gray-600">제조업</p>
              </div>
            </div>
            <p className="text-gray-700">{"MetaOS 도입 후 업무 처리 시간이 60% 단축되었습니다."}</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">G</div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">(주)구구 컴퍼니</h4>
                <p className="text-sm text-gray-600">IT 서비스</p>
              </div>
            </div>
            <p className="text-gray-700">{"AI 기반 자동화로 인적 오류가 90% 감소했습니다."}</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
