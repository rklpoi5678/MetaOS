// pages/index.tsx
"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/research-lab/Footer";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 text-gray-800 text-center py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 animate-pulse"></div>
        <h1 className="text-5xl font-bold transform hover:scale-105 transition-transform duration-300">
          MetaOS - 스마트한 업무의 시작
        </h1>
        <p className="mt-4 text-lg animate-fade-in">AI 기반 통합 업무 플랫폼으로 업무 효율을 극대화하세요</p>
        <Link href="/login">
          <Button className="
            mt-6 
            bg-indigo-600 text-white
            px-6 py-3 rounded-lg 
            transition-all duration-300
            hover:bg-indigo-700
            hover:shadow-lg transform hover:scale-105
            animate-pulse
          ">
            대시보드로 바로가기
          </Button>
        </Link>
      </section>

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
              <Image src="/c.png" alt="Company" width={48} height={48} className="w-12 h-12 rounded-full" />
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">디자인웨이브로</h4>
                <p className="text-sm text-gray-600">제조업</p>
              </div>
            </div>
            <p className="text-gray-700">{"MetaOS 도입 후 업무 처리 시간이 60% 단축되었습니다."}</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl">
            <div className="flex items-center mb-4">
              <Image src="/c.png" alt="Company" width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
              <div className="ml-4">
                <h4 className="font-semibold text-gray-800">(주)구구 컴퍼니</h4>
                <p className="text-sm text-gray-600">IT 서비스</p>
              </div>
            </div>
            <p className="text-gray-700">{"AI 기반 자동화로 인적 오류가 90% 감소했습니다."}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-8 bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center">
        <h2 className="text-3xl font-bold">지금 바로 시작하세요</h2>
        <p className="mt-4">무료 체험으로 MetaOS의 모든 기능을 경험해보세요</p>
        <Link href="/login">
          <Button className="
            mt-8
            bg-white text-indigo-600
            px-8 py-4 rounded-lg
            transition-all duration-300
            hover:bg-gray-100
            hover:shadow-lg transform hover:scale-105
          ">
            대시보드로 바로가기
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
