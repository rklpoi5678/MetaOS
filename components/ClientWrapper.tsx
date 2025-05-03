'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={false}
        whileInView={isMounted ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 1 },
          visible: { opacity: 1 }
        }}
        className="min-h-screen bg-white"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
