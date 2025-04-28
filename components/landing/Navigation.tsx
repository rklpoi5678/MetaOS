'use client'

import Link from 'next/link'
import { useAppStore } from '@/src/store/appStore'

export default function Navigation() {
  const { user, handleLogout } = useAppStore();

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
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 transition-colors">
              Blog
            </Link>
          </div>

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
    </nav>
  )
} 