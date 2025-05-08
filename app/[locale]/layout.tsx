// app/layout.tsx

import "@/styles/globals.css";
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

export default async function RootLayout({
  children,
  params
}) {
  let messages;
  try {
    messages = (await import(`@/locales/${params.locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale: ${params.locale}`, error);
    notFound();
  }

  return (
    <html lang={params.locale}>
      <body>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <ClientWrapper>
            {children}
          </ClientWrapper>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}