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
import Image from 'next/image';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-accent font-sans selection:bg-brand-secondary selection:text-brand-dark overflow-x-hidden">
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
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-brand-dark/40 border-b border-brand-secondary/10 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-14 h-14 bg-brand-dark/60 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden border border-brand-secondary/20 group-hover:border-brand-secondary/40">
                <Image
                  src="/images/logo.webp"
                  alt="Njata Logo"
                  fill
                  className="object-cover transform scale-120 group-hover:scale-130 transition-transform duration-500"
                  sizes="56px"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-serif font-bold text-brand-secondary tracking-tight group-hover:text-brand-accent transition-colors duration-300">
                Njata Shiz
              </span>
              <span className="text-[10px] font-medium text-brand-accent/40 tracking-[0.3em] uppercase transition-colors duration-300 group-hover:text-brand-secondary/60">
                Handcrafted Leather
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              href={`/${locale}`}
              className="relative text-sm font-bold text-brand-secondary tracking-widest uppercase py-2 group"
            >
              {t('home')}
              <span className="absolute bottom-0 left-0 w-full h-px bg-brand-secondary transform origin-left scale-x-100 transition-transform duration-500" />
            </Link>
            <Link
              href={`/${locale}/gallery`}
              className="relative text-sm font-medium text-brand-accent/70 hover:text-brand-secondary tracking-widest uppercase transition-all duration-300 py-2 group"
            >
              {t('gallery')}
              <span className="absolute bottom-0 left-0 w-full h-px bg-brand-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-3 pl-8 ml-4 border-l border-brand-secondary/20">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-brand-dark px-2 py-1 rounded bg-brand-secondary shadow-lg shadow-brand-secondary/20">
                  {localeNames[locale as keyof typeof localeNames]}
                </span>
                <div className="flex gap-2">
                  {otherLocales.map((l: string) => (
                    <Link
                      key={l}
                      href={`/${l}`}
                      className="text-[10px] font-bold text-brand-accent/40 hover:text-brand-secondary transition-all hover:scale-110"
                    >
                      {localeNames[l as keyof typeof localeNames]}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button - Minimalist */}
          <div className="md:hidden">
            <button className="flex flex-col gap-1.5 p-2 group">
              <div className="w-6 h-[1px] bg-brand-secondary group-hover:w-8 transition-all"></div>
              <div className="w-8 h-[1px] bg-brand-secondary"></div>
              <div className="w-4 h-[1px] bg-brand-secondary group-hover:w-8 transition-all"></div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
