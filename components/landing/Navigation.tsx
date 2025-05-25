'use client'

import Link from 'next/link'
import { useAppStore } from '@/src/store/appStore'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { LocalesSetting } from './nav-locales/LocalesSetting'

export default function Navigation() {
  const { user, handleLogout, setUser } = useAppStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('navigation');

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
              {t('about')}
            </Link>
            <Link href="https://nextra-blog-3t4s.vercel.app" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('blog')}
            </Link>
            <a 
              href="https://portfolio-six-nu-90.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {t('portfolio')}
            </a>
            <Link href="/tools/pdf-generator" className="text-gray-600 hover:text-blue-600 transition-colors">
              {t('pdfGenerator')}
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
                  {t('about')}
                </Link>
                <a href="https://nextra-blog-3t4s.vercel.app" className="block py-2 text-gray-600 hover:text-blue-600">
                  {t('blog')}
                </a>
                <Link href="/tools/pdf-generator" className="block py-2 text-gray-600 hover:text-blue-600">
                  {t('pdfGenerator')}
                </Link>
                {user ? (
                  <>
                    <Link href="/dashboard" className="block py-2 text-gray-600 hover:text-blue-600">
                      {t('dashboard')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full py-2 text-gray-600 hover:text-blue-600"
                    >
                      {t('logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin" className="block py-2 text-gray-600 hover:text-blue-600">
                      {t('login')}
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block py-2 text-blue-600 hover:text-blue-700"
                    >
                      {t('getStarted')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="hidden md:flex items-center space-x-4">
            <LocalesSetting />
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('dashboard')}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-sm px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/auth/signin" 
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {t('login')}
                </Link>
                <Link 
                  href="/auth/signup"
                  className="text-sm px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('getStarted')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 