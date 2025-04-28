// app/layout.tsx

import "@/styles/globals.css";
import { ReactNode } from 'react';
import ClientWrapper from '@/components/ClientWrapper';


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


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  )
}