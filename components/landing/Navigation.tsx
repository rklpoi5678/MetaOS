'use client'

import Link from 'next/link'
import { useAppStore } from '@/src/store/appStore'
import { useEffect, useState } from 'react'

export default function Navigation() {
  const { user, handleLogout, setUser } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn && user) {
      setUser(null);
    }
  }, [user, setUser]);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              MetaOS
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/info/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              소개
            </Link>
            <a href="https://nextra-blog-3t4s.vercel.app" className="text-gray-600 hover:text-blue-600 transition-colors">
              블로그
            </a>
            <Link href="/tools/pdf-generator" className="text-gray-600 hover:text-blue-600 transition-colors">
              PDF 생성기
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="black" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t">
              <div className="container mx-auto px-4 py-2 space-y-2">
                <Link href="/info/about" className="block py-2 text-gray-600 hover:text-blue-600">
                  About
                </Link>
                <a href="https://nextra-blog-3t4s.vercel.app" className="block py-2 text-gray-600 hover:text-blue-600">
                  Blog
                </a>
                <Link href="/tools/pdf-generator" className="block py-2 text-gray-600 hover:text-blue-600">
                  PDF 생성기
                </Link>
                {user ? (
                  <>
                    <Link href="/dashboard" className="block py-2 text-gray-600 hover:text-blue-600">
                      대시보드
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full py-2 text-gray-600 hover:text-blue-600"
                    >
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin" className="block py-2 text-gray-600 hover:text-blue-600">
                      로그인
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block py-2 text-blue-600 hover:text-blue-700"
                    >
                      시작하기
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="hidden md:flex items-center space-x-4">
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
                  href="/auth/signin" 
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  로그인
                </Link>
                <Link 
                  href="/auth/signup"
                  className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  시작하기
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 