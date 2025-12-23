import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header locale={locale} />
      <HeroSection locale={locale} />
      <AboutSection locale={locale} />
      <CTASection locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}

function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const localeNames = { sr: 'SR', ru: 'РУ', en: 'EN' };
  const otherLocales = ['sr', 'ru', 'en'].filter((l) => l !== locale);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200/20 dark:border-gray-800/20 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-all duration-300" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-purple-600 via-violet-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <span className="text-white font-bold text-xs">NS</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                Njata Shiz
              </span>
              <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                Handmade Leather
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}`}
              className="relative text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group px-3 py-2"
            >
              {t('home')}
              <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
            </Link>
            <Link
              href={`/${locale}/gallery`}
              className="relative text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors group px-3 py-2"
            >
              {t('gallery')}
              <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 pl-6 ml-2 border-l border-gray-300/50 dark:border-gray-700/50">
              <span className="text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent px-2 py-1 rounded-md bg-purple-50 dark:bg-purple-950/30">
                {localeNames[locale as keyof typeof localeNames]}
              </span>
              {otherLocales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}`}
                  className="text-xs font-medium text-gray-500 hover:text-purple-600 dark:text-gray-500 dark:hover:text-purple-400 transition-all hover:scale-110 px-2 py-1 rounded-md hover:bg-purple-50 dark:hover:bg-purple-950/30"
                >
                  {localeNames[l as keyof typeof localeNames]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-violet-400/15 dark:bg-violet-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
        <div className="animate-fadeInUp">
          <div className="inline-block mb-6">
            <span className="px-6 py-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-full text-sm font-medium text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-500/30">
              ✨ Handcrafted with Love in Belgrade
            </span>
          </div>
          
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter leading-none">
            <span className="block gradient-text animate-gradient bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600">
              {t('title')}
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
          
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t('description')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/gallery`}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg overflow-hidden shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                {locale === 'sr' ? 'Pogledaj Galeriju' : locale === 'ru' ? 'Посмотреть Галерею' : 'View Gallery'}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>
            
            <Link
              href={`/${locale}#about`}
              className="px-8 py-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-900 dark:text-white rounded-full font-semibold text-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 hover:scale-105"
            >
              {locale === 'sr' ? 'Moja Priča' : locale === 'ru' ? 'Моя История' : 'My Story'}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full p-1">
            <div className="w-1.5 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mx-auto animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection({ locale }: { locale: string }) {
  const t = useTranslations('about');

  return (
    <section id="about" className="relative py-32 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 animate-fadeInUp">
          <h2 className="text-5xl md:text-6xl font-black mb-6 gradient-text">
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-8 animate-fadeInUp">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {t('intro')}
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {t('brand')}
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {t('material')}
              </p>
            </div>
          </div>

          <div className="space-y-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="relative p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-3xl border border-purple-200/50 dark:border-purple-500/30 backdrop-blur-sm">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-4">
                {locale === 'sr' ? 'Proces Izrade' : locale === 'ru' ? 'Процесс Изготовления' : 'Creation Process'}
              </h3>
              
              <ul className="space-y-4">
                {[
                  { icon: '⏱️', text: locale === 'sr' ? '~3 dana za jedan komad' : locale === 'ru' ? '~3 дня на одно изделие' : '~3 days per piece' },
                  { icon: '✋', text: locale === 'sr' ? '100% ručno izrađeno' : locale === 'ru' ? '100% ручная работа' : '100% handmade' },
                  { icon: '🎨', text: locale === 'sr' ? 'Boje za kožu + fiksator' : locale === 'ru' ? 'Краски для кожи + фиксатор' : 'Leather paints + fixative' },
                  { icon: '💎', text: locale === 'sr' ? 'Svaki komad je unikat' : locale === 'ru' ? 'Каждое изделие уникально' : 'Each piece is unique' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic text-lg">
                {t('conclusion')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection({ locale }: { locale: string }) {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-pink-600 animate-gradient" />
      
      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-black text-white mb-6 animate-fadeInUp">
          {locale === 'sr' ? 'Istražite Kolekciju' : locale === 'ru' ? 'Исследуйте Коллекцию' : 'Explore the Collection'}
        </h2>
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          {locale === 'sr' 
            ? 'Otkrijte jedinstvene komade nakita koji spajaju tradicionalnu izradu sa modernim dizajnom' 
            : locale === 'ru'
            ? 'Откройте для себя уникальные украшения, сочетающие традиционное мастерство с современным дизайном'
            : 'Discover unique jewelry pieces that blend traditional craftsmanship with modern design'}
        </p>
        <Link
          href={`/${locale}/gallery`}
          className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-fadeInUp"
          style={{ animationDelay: '0.2s' }}
        >
          {locale === 'sr' ? 'Pogledaj Sve' : locale === 'ru' ? 'Посмотреть Все' : 'View All'}
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');
  const currentYear = 2025; // Hardcoded for static generation

  return (
    <footer className="relative bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">NS</span>
            </div>
            <span className="text-3xl font-black tracking-tighter gradient-text">Njata Shiz Nakit</span>
          </div>
          
          <p className="text-gray-400 text-lg">{t('handmade')}</p>
          <p className="text-gray-500">{t('location')}</p>
          
          <div className="flex justify-center gap-6 pt-8">
            <Link href={`/${locale}`} className="text-gray-400 hover:text-white transition-colors">
              {locale === 'sr' ? 'Početna' : locale === 'ru' ? 'Главная' : 'Home'}
            </Link>
            <Link href={`/${locale}/gallery`} className="text-gray-400 hover:text-white transition-colors">
              {locale === 'sr' ? 'Galerija' : locale === 'ru' ? 'Галерея' : 'Gallery'}
            </Link>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-gray-600 text-sm">
            © {currentYear} Njata Shiz Nakit. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
