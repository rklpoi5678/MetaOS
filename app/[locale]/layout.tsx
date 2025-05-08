// app/layout.tsx

import "@/styles/globals.css";
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import ClientWrapper from '@/components/ClientWrapper';
import Footer from "@/components/landing/Footer";
import { notFound } from "next/navigation";


export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ko' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
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