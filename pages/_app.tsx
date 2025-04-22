// pages/_app.tsx
"use client";

import "@/styles/globals.css";
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { supabase } from '@/lib/supabaseClient';
import { useAppStore } from '@/src/store/appStore';

export default function App({ Component, pageProps }: AppProps) {
  const setUser = useAppStore((s) => s.setUser);

  useEffect(() => {
    async function initUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    }
    initUser();
  }, [setUser]);

  return <Component {...pageProps} />;
}
