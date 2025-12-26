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
    <div className="min-h-screen bg-gradient-to-br from-brand-accent via-white to-brand-accent/30 dark:from-brand-dark dark:via-brand-primary/5 dark:to-brand-dark text-foreground font-sans selection:bg-brand-secondary selection:text-brand-dark overflow-x-hidden">
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
  const t = useTranslations('nav');
  const localeNames = { sr: 'SR', ru: 'РУ', en: 'EN' };
  const otherLocales = ['sr', 'ru', 'en'].filter((l) => l !== locale);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/95 dark:bg-brand-dark/95 border-b border-brand-secondary/20 dark:border-brand-secondary/10 shadow-xl leather-texture transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/10 via-transparent to-brand-accent/10 dark:from-brand-primary/10 dark:via-transparent dark:to-brand-primary/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-secondary rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-all duration-300 animate-pulse-glow" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-brand-secondary via-brand-secondary to-brand-secondary/80 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border-2 border-brand-secondary/20">
                <span className="text-brand-dark font-bold text-sm">NS</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold text-brand-primary dark:text-brand-secondary tracking-tight">
                Njata Shiz
              </span>
              <span className="text-[9px] font-semibold text-brand-secondary/70 dark:text-brand-secondary/60 tracking-widest uppercase">
                Handmade Leather Jewelry
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href={`/${locale}`} 
              className="relative text-sm font-bold text-brand-secondary dark:text-brand-secondary uppercase tracking-wider px-4 py-2 group"
            >
              {t('home')}
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-brand-secondary rounded-full shadow-lg shadow-brand-secondary/50" />
            </Link>
            <Link 
              href={`/${locale}/gallery`} 
              className="relative text-sm font-semibold text-foreground dark:text-brand-accent hover:text-brand-secondary dark:hover:text-brand-secondary uppercase tracking-wider transition-all duration-300 px-4 py-2 group"
            >
              {t('gallery')}
              <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-brand-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
            </Link>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 pl-6 ml-2 border-l-2 border-brand-secondary/30 dark:border-brand-secondary/20">
              <span className="text-xs font-bold text-brand-secondary px-3 py-1.5 rounded-lg bg-brand-secondary/10 dark:bg-brand-secondary/20 border border-brand-secondary/30 shadow-inner">
                {localeNames[locale as keyof typeof localeNames]}
              </span>
              {otherLocales.map((l: string) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-brand-secondary dark:hover:text-brand-secondary transition-all hover:scale-110 px-3 py-1.5 rounded-lg hover:bg-brand-secondary/5 dark:hover:bg-brand-secondary/10"
                >
                  {localeNames[l as keyof typeof localeNames]}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 hover:bg-brand-secondary/10 rounded-lg transition-colors">
              <span className="sr-only">Menu</span>
              <div className="w-6 h-0.5 bg-brand-secondary mb-1.5 transition-all"></div>
              <div className="w-6 h-0.5 bg-brand-secondary mb-1.5 transition-all"></div>
              <div className="w-6 h-0.5 bg-brand-secondary transition-all"></div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
