'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MetaOS</h3>
            <p className="text-gray-400">당신의 생각을 현실로 만드는 AI 프로젝트 플랫폼</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">제품</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-gray-400 hover:text-white">기능</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-white">가격</Link></li>
              <li><Link href="/demo" className="text-gray-400 hover:text-white">데모</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">회사</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white">소개</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white">블로그</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">문의</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">법적</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">개인정보처리방침</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white">이용약관</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 MetaOS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 