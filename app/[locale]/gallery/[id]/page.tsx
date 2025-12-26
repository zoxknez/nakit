import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function PieceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const piece = await prisma.jewelryPiece.findUnique({
    where: { id },
    include: {
      translations: true,
    },
  });

  if (!piece || !piece.publishedLocales.includes(locale)) {
    notFound();
  }

  // Get translation for current locale or fallback to first available
  const translation =
    piece.translations.find((t: { locale: string }) => t.locale === locale) ||
    piece.translations[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-dark via-brand-primary/90 to-brand-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 leather-texture opacity-30 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-brand-secondary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      </div>

      <Header locale={locale} />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href={`/${locale}/gallery`}
          className="group inline-flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-all duration-300 mb-12 hover:-translate-x-2"
        >
          <div className="w-8 h-8 rounded-full border-2 border-brand-secondary/50 group-hover:border-brand-secondary flex items-center justify-center group-hover:bg-brand-secondary/10 transition-all">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <span className="font-serif text-lg">
            {locale === 'sr'
              ? 'Nazad na galeriju'
              : locale === 'ru'
              ? 'Назад в галерею'
              : 'Back to gallery'}
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images Gallery */}
          <div className="space-y-6">
            {piece.mediaUrls.map((url: string, index: number) => (
              <div
                key={index}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/40 leather-texture"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative w-full h-full bg-brand-primary/20">
                  <Image
                    src={url}
                    alt={`${translation?.title} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                  />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-secondary/0 to-transparent group-hover:via-brand-secondary/20 transition-all duration-700" />
                  
                  {/* Gold Corner Accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Image Number Badge */}
                {piece.mediaUrls.length > 1 && (
                  <div className="absolute top-4 right-4 w-10 h-10 bg-brand-dark/80 backdrop-blur-sm border border-brand-secondary/50 rounded-full flex items-center justify-center text-brand-secondary text-sm font-bold">
                    {index + 1}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Details Section */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="relative bg-gradient-to-br from-brand-primary/40 via-brand-dark/60 to-brand-primary/40 backdrop-blur-lg rounded-3xl p-10 shadow-2xl shadow-black/50 border border-brand-secondary/20 leather-texture overflow-hidden">
              
              {/* Decorative Elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-secondary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-brand-secondary/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 space-y-8">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/20 backdrop-blur-sm rounded-full border border-brand-secondary/40">
                  <svg className="w-4 h-4 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-brand-secondary font-serif text-sm font-semibold tracking-wide uppercase">
                    {translation?.categoryName}
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-3">
                  <h1 className="text-5xl font-serif font-bold text-brand-accent leading-tight">
                    {translation?.title}
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-brand-secondary via-yellow-600 to-transparent rounded-full" />
                </div>

                {/* Description */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-brand-accent/90 leading-relaxed text-lg font-serif whitespace-pre-wrap">
                    {translation?.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="relative py-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-brand-secondary/20" />
                  </div>
                  <div className="relative flex justify-center">
                    <div className="bg-brand-secondary/20 px-4 rounded-full">
                      <svg className="w-5 h-5 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Handcrafted Info */}
                <div className="relative bg-gradient-to-br from-brand-secondary/10 to-brand-secondary/5 backdrop-blur-sm rounded-2xl p-8 border border-brand-secondary/30 shadow-lg">
                  <div className="absolute -top-3 left-8 px-4 py-1 bg-brand-secondary rounded-full">
                    <span className="text-brand-dark text-xs font-bold uppercase tracking-wider">
                      {locale === 'sr'
                        ? 'Ručna Izrada'
                        : locale === 'ru'
                        ? 'Ручная Работа'
                        : 'Handcrafted'}
                    </span>
                  </div>
                  
                  <ul className="space-y-4 mt-4">
                    <li className="flex items-start gap-3 group">
                      <div className="mt-1 w-6 h-6 rounded-full bg-brand-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-secondary/30 transition-colors">
                        <svg className="w-3 h-3 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-brand-accent/90 font-serif leading-relaxed">
                        {locale === 'sr'
                          ? 'Proces izrade: ~3 dana'
                          : locale === 'ru'
                          ? 'Процесс изготовления: ~3 дня'
                          : 'Creation process: ~3 days'}
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <div className="mt-1 w-6 h-6 rounded-full bg-brand-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-secondary/30 transition-colors">
                        <svg className="w-3 h-3 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-brand-accent/90 font-serif leading-relaxed">
                        {locale === 'sr'
                          ? 'Potpuno ručno izrađeno'
                          : locale === 'ru'
                          ? 'Полностью ручная работа'
                          : 'Completely handmade'}
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <div className="mt-1 w-6 h-6 rounded-full bg-brand-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-secondary/30 transition-colors">
                        <svg className="w-3 h-3 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-brand-accent/90 font-serif leading-relaxed">
                        {locale === 'sr'
                          ? 'Svaki komad je unikat'
                          : locale === 'ru'
                          ? 'Каждое изделие уникально'
                          : 'Each piece is unique'}
                      </span>
                    </li>
                    <li className="flex items-start gap-3 group">
                      <div className="mt-1 w-6 h-6 rounded-full bg-brand-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-secondary/30 transition-colors">
                        <svg className="w-3 h-3 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-brand-accent/90 font-serif leading-relaxed">
                        {locale === 'sr'
                          ? 'Boje za kožu + fiksator za dugotrajnost'
                          : locale === 'ru'
                          ? 'Краски для кожи + фиксатор для долговечности'
                          : 'Leather paints + fixative for durability'}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Creation Date */}
                <div className="flex items-center gap-2 text-sm text-brand-accent/60 pt-6 border-t border-brand-secondary/20">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-serif">
                    {locale === 'sr'
                      ? 'Kreirano'
                      : locale === 'ru'
                      ? 'Создано'
                      : 'Created'}{' '}
                    <span className="text-brand-secondary font-semibold">
                      {new Date(piece.createdAt).toLocaleDateString(locale, { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer locale={locale} />
    </div>
  );
}

function Header({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const localeNames = { sr: 'SR', ru: 'RU', en: 'EN' };
  const otherLocales = ['sr', 'ru', 'en'].filter((l) => l !== locale);

  return (
    <header className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur-lg border-b border-brand-secondary/20 leather-texture">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href={`/${locale}`} className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-secondary to-yellow-600 rounded-full flex items-center justify-center shadow-lg shadow-brand-secondary/30 group-hover:shadow-brand-secondary/50 transition-all duration-300 animate-pulse-glow">
              <span className="text-brand-dark font-bold text-lg">NS</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-serif font-bold text-brand-secondary block leading-tight">
                Njata Shiz
              </span>
              <span className="text-xs text-brand-secondary/60 tracking-widest uppercase">Leather Jewelry</span>
            </div>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href={`/${locale}`}
              className="text-brand-accent/80 hover:text-brand-secondary transition-all duration-300 font-serif relative group"
            >
              {t('home')}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-brand-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
            </Link>
            <Link
              href={`/${locale}/gallery`}
              className="text-brand-accent/80 hover:text-brand-secondary transition-all duration-300 font-serif relative group"
            >
              {t('gallery')}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-brand-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
            </Link>

            <div className="flex items-center gap-2 border-l border-brand-secondary/30 pl-6">
              <span className="text-brand-secondary font-bold text-sm">
                {localeNames[locale as keyof typeof localeNames]}
              </span>
              {otherLocales.map((l: string) => (
                <Link
                  key={l}
                  href={`/${l}/gallery`}
                  className="text-brand-accent/50 hover:text-brand-secondary transition-colors text-sm font-semibold"
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

function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-dark text-brand-accent border-t-2 border-brand-secondary/30 leather-texture overflow-hidden mt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-brand-primary/30 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 py-16 border-b border-brand-secondary/20">
          
          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-brand-secondary to-yellow-600 rounded-full flex items-center justify-center shadow-2xl shadow-brand-secondary/40 animate-pulse-glow">
                <span className="text-brand-dark font-bold text-xl">NS</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-secondary">
                  Njata Shiz
                </h3>
                <p className="text-xs text-brand-secondary/60 tracking-widest uppercase">Leather Artisan</p>
              </div>
            </div>
            <p className="text-sm text-brand-accent/80 leading-relaxed font-serif italic">
              {t('handmade')}
            </p>
            <div className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <span className="text-brand-accent/70">{t('location')}</span>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-bold text-brand-secondary uppercase tracking-wider flex items-center gap-2">
              <div className="w-8 h-px bg-brand-secondary"></div>
              {locale === 'sr' ? 'Navigacija' : locale === 'ru' ? 'Навигация' : 'Navigation'}
            </h4>
            <nav className="space-y-3">
              <Link 
                href={`/${locale}`} 
                className="block text-brand-accent/80 hover:text-brand-secondary transition-all duration-300 hover:translate-x-2 text-sm group"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {locale === 'sr' ? 'Početna' : locale === 'ru' ? 'Главная' : 'Home'}
                </span>
              </Link>
              <Link 
                href={`/${locale}/gallery`} 
                className="block text-brand-accent/80 hover:text-brand-secondary transition-all duration-300 hover:translate-x-2 text-sm group"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {locale === 'sr' ? 'Galerija' : locale === 'ru' ? 'Галерея' : 'Gallery'}
                </span>
              </Link>
              <Link 
                href={`/${locale}#about`} 
                className="block text-brand-accent/80 hover:text-brand-secondary transition-all duration-300 hover:translate-x-2 text-sm group"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="w-1 h-1 bg-brand-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {locale === 'sr' ? 'O Meni' : locale === 'ru' ? 'Обо мне' : 'About'}
                </span>
              </Link>
            </nav>
          </div>
          
          {/* Column 3 - Connect */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-bold text-brand-secondary uppercase tracking-wider flex items-center gap-2">
              <div className="w-8 h-px bg-brand-secondary"></div>
              {locale === 'sr' ? 'Povežite Se' : locale === 'ru' ? 'Связаться' : 'Connect'}
            </h4>
            <p className="text-sm text-brand-accent/70 leading-relaxed">
              {locale === 'sr' 
                ? 'Pratite me na društvenim mrežama za najnovije kreacije' 
                : locale === 'ru'
                ? 'Следите за мной в соцсетях для последних творений'
                : 'Follow me on social media for latest creations'}
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="group w-11 h-11 rounded-lg border-2 border-brand-secondary/30 hover:border-brand-secondary flex items-center justify-center text-brand-secondary/60 hover:text-brand-secondary hover:bg-brand-secondary/10 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="group w-11 h-11 rounded-lg border-2 border-brand-secondary/30 hover:border-brand-secondary flex items-center justify-center text-brand-secondary/60 hover:text-brand-secondary hover:bg-brand-secondary/10 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-brand-accent/50">
          <div className="flex items-center gap-6">
            <p>© {currentYear} Njata Shiz</p>
            <span className="hidden md:inline text-brand-secondary/30">|</span>
            <p className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-brand-secondary rounded-full animate-pulse"></span>
              {locale === 'sr' ? 'Ručno sa ❤️' : locale === 'ru' ? 'Вручную с ❤️' : 'Handmade with ❤️'}
            </p>
          </div>
          <p className="text-xs">
            {locale === 'sr' ? 'Sva prava zadržana' : locale === 'ru' ? 'Все права защищены' : 'All rights reserved'}
          </p>
        </div>
      </div>
    </footer>
  );
}
