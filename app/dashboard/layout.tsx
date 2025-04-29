// app/layout.tsx

import "@/styles/globals.css";
import { ReactNode } from 'react';

export const metadata = {
  title: "MetaOS | 대시보드",
  description: "MetaOS 대시보드",
  openGraph: {
    title: "MetaOS | 대시보드",
    description: "MetaOS 대시보드",
    type: "website"
  },
  icons: {
    icon: "/metaOS.ico",
  },
};


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  )
}