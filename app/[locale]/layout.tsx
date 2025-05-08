// app/layout.tsx

import "@/styles/globals.css";
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import ClientWrapper from '@/components/ClientWrapper';
import Footer from "@/components/landing/Footer";
import { notFound } from "next/navigation";

export const metadata = {
  title: "MetaOS | AI 기반 프로젝트 관리 시스템",
  description: "AI 기반 프로젝트 관리 시스템",
  openGraph: {
    title: "MetaOS | AI 기반 프로젝트 관리 시스템",
    description: "AI 기반 프로젝트 관리 시스템",
    type: "website"
  },
  icons: {
    icon: "/metaOS.ico",
  },
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }];
}

type Props = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  let messages;
  try {
    messages = (await import(`@/locales/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientWrapper>
            {children}
          </ClientWrapper>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}