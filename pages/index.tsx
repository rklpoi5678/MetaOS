"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/research-lab/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            MetaOS
          </div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/signin" className="text-gray-600 hover:text-blue-600">로그인</Link>
            <Link href="/signup">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                무료로 시작하기
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              당신의 생각이 현실이 되는 순간
            </h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mb-8"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm text-blue-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-400/20 inline-block"
              >
                Alpha v0.1.2
              </motion.span>
            </motion.div>
            <p className="text-xl text-gray-600 mb-8">
              AI가 당신의 아이디어를 완성된 프로젝트로 만들어드립니다
            </p>
            <div className="flex justify-center gap-4">
              
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  무료로 시작하기
                </motion.button>
              </Link>
              <Link href="/demo">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 border border-blue-600 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  데모 체험하기
                </motion.button>
              </Link>
            </div>
          </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm p-8 rounded-2xl border border-blue-400/20"
          >
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">AI 기반 프로젝트 생성</h3>
            <p className="text-gray-600">간단한 설명만으로 완성된 프로젝트 구조를 생성합니다</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm p-8 rounded-2xl border border-blue-400/20"
          >
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">자동화된 워크플로우</h3>
            <p className="text-gray-600">반복적인 작업을 자동화하여 효율성을 높입니다</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm p-8 rounded-2xl border border-blue-400/20"
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">실시간 분석</h3>
            <p className="text-gray-600">프로젝트 진행 상황을 실시간으로 분석하고 최적화합니다</p>
          </motion.div>
        </div>
          {/* 시뮬레이션 영역 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-16 bg-gray-50 rounded-2xl p-8 shadow-lg"
          >
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
              <p className="text-gray-500">AI 프로젝트 생성 시뮬레이션</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. What is MetaOS? */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">MetaOS란 무엇인가요?</h2>
            <p className="text-xl text-gray-600">
              MetaOS는 당신의 아이디어를 현실로 만드는 AI 기반 프로젝트 플랫폼입니다.
              감정과 구조의 조화를 통해 더 나은 프로젝트를 만들어갑니다.
            </p>
          </div>
          {/* 감정 그래프 애니메이션 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
              <p className="text-gray-500">감정 그래프 애니메이션</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">핵심 기능</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Flow</h3>
              <p className="text-gray-600">
                프로젝트의 흐름을 자동으로 최적화하고 관리합니다.
                AI가 당신의 작업 패턴을 학습하여 더 효율적인 워크플로우를 제안합니다.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Insight</h3>
              <p className="text-gray-600">
                프로젝트의 모든 데이터를 실시간으로 분석하고 인사이트를 제공합니다.
                데이터 기반의 의사결정을 지원합니다.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Self-aware</h3>
              <p className="text-gray-600">
                AI가 프로젝트의 상태를 지속적으로 모니터링하고 개선점을 제안합니다.
                스스로 학습하고 진화하는 시스템입니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. How it works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">작동 방식</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Core</h3>
              <p className="text-gray-600">프로젝트의 핵심 가치와 목표를 정의합니다</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Structure</h3>
              <p className="text-gray-600">체계적인 프로젝트 구조를 설계합니다</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Tool</h3>
              <p className="text-gray-600">필요한 도구와 리소스를 자동으로 구성합니다</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Experiment</h3>
              <p className="text-gray-600">지속적인 실험과 개선을 통해 진화합니다</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">사용자 후기</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">D</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">디자인웨이브로</h4>
                  <p className="text-sm text-gray-600">제조업</p>
                </div>
              </div>
              <p className="text-gray-700">{"MetaOS 도입 후 업무 처리 시간이 60% 단축되었습니다. AI가 프로젝트 구조를 자동으로 설계해주니 정말 편리합니다."}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gray-50 p-8 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">G</div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-800">(주)구구 컴퍼니</h4>
                  <p className="text-sm text-gray-600">IT 서비스</p>
                </div>
              </div>
              <p className="text-gray-700">{"AI 기반 자동화로 인적 오류가 90% 감소했습니다. 특히 실시간 분석 기능이 프로젝트 관리에 큰 도움이 됩니다."}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">지금 바로 시작하세요</h2>
          <p className="text-xl mb-8">AI Agent와 함께 당신의 프로젝트를 시작하세요</p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                무료로 시작하기
              </motion.button>
            </Link>
            <Link href="/agent-demo">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border border-white text-white rounded-lg text-lg font-semibold hover:bg-white/10 transition-all duration-300"
              >
                Agent 데모 보기
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
