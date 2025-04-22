// pages/index.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/pages/componects/Footer";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black-700 to-purple-900 text-white text-center py-20">
        <h1 className="text-5xl font-bold">MetaOS - The Future of SaaS</h1>
        <p className="mt-4 text-lg">AI 기반으로 더 스마트한 업무 환경을 경험하세요.</p>
        <Link href="/login">
          <Button className="mt-6 text-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 ease-in-out hover:bg-white hover:text-black">
            체험 시작하기
          </Button>
        </Link>
      </section>

      {/* 기능 소개 */}
      <section className="py-16 px-8 bg-gray-900 text-center">
        <h2 className="text-3xl font-bold">주요 기능</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-gray-500 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">자동화된 워크플로우</h3>
            <p className="mt-2 text-gray-100">AI 기반으로 업무를 자동화하세요.</p>
          </div>
          <div className="p-6 bg-gray-500 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">실시간 협업</h3>
            <p className="mt-2 text-gray-100">팀원들과 실시간으로 문서를 공유하세요.</p>
          </div>
          <div className="p-6 bg-gray-500 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">강력한 데이터 분석</h3>
            <p className="mt-2 text-gray-100">데이터 기반으로 더 나은 결정을 내리세요.</p>
          </div>
        </div>
      </section>

      {/* 고객 리뷰 */}
      <section className="bg-gray-900 py-16 text-center">
        <h2 className="text-3xl font-bold">고객 리뷰</h2>
        <p className="mt-4 text-gray-100">수천 명의 사용자들이 MetaOS를 신뢰합니다.</p>
        <div className="mt-8 flex justify-center space-x-6">
          <div className="p-6 bg-white rounded-lg shadow-md max-w-sm">
            <p className="text-gray-800">{"업무 효율이 200% 증가했어요!"}</p>
            <span className="block mt-2 text-gray-800 font-semibold">- 김철수, 스타트업 CEO</span>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md max-w-sm">
            <p className="text-gray-800">{"AI 자동화 덕분에 시간을 절약할 수 있었습니다."}</p>
            <span className="block mt-2 text-gray-800 font-semibold">- 이영희, 마케팅 매니저</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">지금 시작하세요!</h2>
        <p className="mt-4 text-gray-600">무료 체험을 통해 MetaOS의 강력한 기능을 경험해보세요.</p>
        <Link href="/dashboard">
          <Button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg">
            무료 가입하기
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
