'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Check for saved locale
    const savedLocale = document.cookie
      .split('; ')
      .find((row: string) => row.startsWith('NEXT_LOCALE='))
      ?.split('=')[1];

    if (savedLocale) {
      router.replace(`/${savedLocale}`);
    } else {
      router.replace('/select-language');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse text-lg">Loading...</div>
    </div>
  );
}
