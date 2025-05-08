'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const t = useTranslations('footer');

  if (isDashboard) return null;

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MetaOS</h3>
            <p className="text-gray-400">{t('description')}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('sections.product.title')}</h4>
            <ul className="space-y-2">
              <li><Link href="/features" className="text-gray-400 hover:text-white">{t('sections.product.features')}</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-white">{t('sections.product.pricing')}</Link></li>
              <li><Link href="/demo" className="text-gray-400 hover:text-white">{t('sections.product.demo')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('sections.company.title')}</h4>
            <ul className="space-y-2">
              <li><Link href="/info/about" className="text-gray-400 hover:text-white">{t('sections.company.about')}</Link></li>
              <li><Link href="/info/blog" className="text-gray-400 hover:text-white">{t('sections.company.blog')}</Link></li>
              <li><Link href="/info/contact" className="text-gray-400 hover:text-white">{t('sections.company.contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('sections.legal.title')}</h4>
            <ul className="space-y-2">
              <li><Link href="/legal/privacy" className="text-gray-400 hover:text-white">{t('sections.legal.privacy')}</Link></li>
              <li><Link href="/legal/terms" className="text-gray-400 hover:text-white">{t('sections.legal.terms')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  )
} 