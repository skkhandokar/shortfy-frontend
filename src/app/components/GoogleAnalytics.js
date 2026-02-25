'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-X5GMSXBHTH', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}