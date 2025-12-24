import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/home/HeroSection';
import { AboutSection } from '@/components/home/AboutSection';
import { CTASection } from '@/components/home/CTASection';
import { Footer } from '@/components/home/Footer';

// Header is kept inline for now or moved to layout? 
// The original page had Header inline. For a cleaner separation, I should arguably extract Header too.
// I'll extract Header to components/home/Header.tsx for consistency but for this step 
// I'll create a simple Header in this file or better, create `components/home/Header.tsx` proactively next.
// For now, I'll place the Header component logic here (simplified) or keep it if it fits the new style.
// The new style requires a massive overhaul of the Header too.

// Let's create a new clean Header component in components/layout/Header.tsx later.
// For now I will inline a simplified version compatible with the new aesthetic.

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-secondary selection:text-brand-dark">
      <Header locale={locale} />
      <main>
        <HeroSection locale={locale} />
        <AboutSection locale={locale} />
        <CTASection locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}

function Header({ locale }: { locale: string }) {
  // Simple transparent header with serif logo
  const t = useTranslations('nav');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-white/10 supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href={`/${locale}`} className="text-sm font-medium hover:text-brand-secondary transition-colors uppercase tracking-wider">
              {t('home')}
            </Link>
            <Link href={`/${locale}/gallery`} className="text-sm font-medium hover:text-brand-secondary transition-colors uppercase tracking-wider">
              {t('gallery')}
            </Link>
          </nav>

          {/* Mobile Menu Button - Placeholder */}
          <div className="md:hidden">
            {/* Simple Hamburger placeholder */}
            <button className="p-2">
              <span className="sr-only">Menu</span>
              <div className="w-6 h-0.5 bg-foreground mb-1"></div>
              <div className="w-6 h-0.5 bg-foreground mb-1"></div>
              <div className="w-6 h-0.5 bg-foreground"></div>
            </button>
          </div>

        </div>
      </div>
    </header>
  )
}
