import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import GalleryFilter from './GalleryFilter';
import { Footer } from '@/components/home/Footer';

// Prevent static generation
export const dynamicParams = true;
export const revalidate = 0;

async function GalleryContent({
  locale,
  category
}: {
  locale: string;
  category?: string;
}) {
  const t = await getTranslations({ locale, namespace: 'piece' });

  // Fetch jewelry pieces
  const pieces = await prisma.jewelryPiece.findMany({
    where: {
      publishedLocales: {
        has: locale,
      },
      ...(category && category !== 'all' ? { categoryKey: category } : {}),
    },
    include: {
      translations: {
        where: {
          locale,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <>
      {/* Hero Header */}
      <div className="relative mb-16 text-center">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
        </div>

        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-secondary mb-4 tracking-tight drop-shadow-md">
            {locale === 'sr' ? 'Galerija' : locale === 'ru' ? 'Галерея' : 'Gallery'}
          </h1>
          <div className="w-32 h-1 bg-brand-secondary mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-600 dark:text-brand-accent max-w-2xl mx-auto font-serif italic">
            {locale === 'sr'
              ? 'Svaki komad je priča, svaka priča je jedinstvena'
              : locale === 'ru'
                ? 'Каждое изделие - это история, каждая история уникальна'
                : 'Each piece is a story, every story is unique'}
          </p>
        </div>

        <GalleryFilter currentCategory={category || 'all'} locale={locale} />
      </div>

      {/* Gallery Grid with Stagger Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {pieces.map((piece: any, index: number) => {
          const translation = piece.translations[0];
          return (
            <Link
              key={piece.id}
              href={`/${locale}/gallery/${piece.id}`}
              className="group animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative bg-brand-dark/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl hover:shadow-brand-secondary/40 transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] border border-brand-secondary/20 hover:border-brand-secondary/60 leather-texture">
                {/* Gold Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-brand-secondary/30 to-transparent rounded-bl-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-brand-secondary/30 to-transparent rounded-tr-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-brand-accent/10 dark:bg-brand-primary/20">
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full z-10"
                    style={{ transitionDelay: '100ms' }} />

                  <Image
                    src={piece.mediaUrls[0] || '/placeholder.jpg'}
                    alt={translation?.title || 'Jewelry piece'}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* View Details Label */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
                    <span className="px-6 py-2 bg-brand-secondary text-brand-dark text-sm font-bold uppercase tracking-wider rounded-full shadow-xl">
                      {locale === 'sr' ? 'Pogledaj' : locale === 'ru' ? 'Смотреть' : 'View'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 relative bg-white/50 dark:bg-brand-dark/50 backdrop-blur-sm">
                  {/* Decorative Line */}
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-brand-secondary to-transparent" />

                  <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-primary dark:text-brand-accent mb-2 group-hover:text-brand-secondary dark:group-hover:text-brand-secondary transition-colors duration-300">
                    {translation?.title || 'Untitled'}
                  </h3>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-brand-secondary rounded-full" />
                      <p className="text-sm text-brand-secondary dark:text-brand-secondary font-semibold uppercase tracking-wide">
                        {translation?.categoryName || piece.categoryKey}
                      </p>
                    </div>
                    {piece.price && (
                      <div className="flex flex-col items-end text-right">
                        <span className="text-[10px] text-brand-secondary/60 font-black uppercase tracking-widest leading-none mb-1">
                          {t('price')}
                        </span>
                        <p className="text-brand-secondary font-serif font-bold text-lg leading-tight">
                          {piece.price.toLocaleString(locale)} <span className="text-xs">RSD</span>
                        </p>
                        <p className="text-[9px] lowercase opacity-60 text-brand-accent/80 font-sans tracking-tighter">
                          {t('shipping')}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Handmade Badge */}
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-brand-secondary/10 dark:bg-brand-secondary/20 rounded-full border border-brand-secondary/30">
                    <svg className="w-3 h-3 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs text-brand-secondary font-medium">
                      {locale === 'sr' ? 'Ručna izrada' : locale === 'ru' ? 'Ручная работа' : 'Handmade'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {pieces.length === 0 && (
        <div className="text-center py-32 animate-fadeInUp">
          <div className="w-32 h-32 mx-auto mb-8 bg-brand-accent/20 dark:bg-brand-primary/20 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <p className="text-2xl font-serif text-brand-primary dark:text-brand-accent mb-3">
            {locale === 'sr'
              ? 'Nema dostupnih komada'
              : locale === 'ru'
                ? 'Нет доступных изделий'
                : 'No pieces available'}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            {locale === 'sr'
              ? 'u ovoj kategoriji'
              : locale === 'ru'
                ? 'в этой категории'
                : 'in this category'}
          </p>
        </div>
      )}
    </>
  );
}

export default async function GalleryPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-dark via-brand-primary/10 to-brand-dark relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <Suspense fallback={
          <div className="flex flex-col justify-center items-center py-32">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 border-4 border-brand-secondary/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-brand-secondary font-serif text-lg">
              {locale === 'sr' ? 'Učitavanje...' : locale === 'ru' ? 'Загрузка...' : 'Loading...'}
            </p>
          </div>
        }>
          <GalleryContent locale={locale} category={category} />
        </Suspense>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
