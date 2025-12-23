import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import GalleryFilter from './GalleryFilter';

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
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {locale === 'sr' ? 'Galerija' : locale === 'ru' ? 'Галерея' : 'Gallery'}
        </h1>
        <GalleryFilter currentCategory={category || 'all'} locale={locale} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pieces.map((piece: any) => {
          const translation = piece.translations[0];
          return (
            <Link
              key={piece.id}
              href={`/${locale}/gallery/${piece.id}`}
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative aspect-square overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={piece.mediaUrls[0] || '/placeholder.jpg'}
                    alt={translation?.title || 'Jewelry piece'}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {translation?.title || 'Untitled'}
                  </h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    {translation?.categoryName || piece.categoryKey}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {pieces.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            {locale === 'sr'
              ? 'Nema dostupnih komada u ovoj kategoriji'
              : locale === 'ru'
              ? 'Нет доступных изделий в этой категории'
              : 'No pieces available in this category'}
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header locale={locale} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        }>
          <GalleryContent locale={locale} category={category} />
        </Suspense>
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
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200/20 dark:border-gray-800/20 shadow-sm">
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
              className="relative text-sm font-semibold text-purple-600 dark:text-purple-400 px-3 py-2"
            >
              {t('gallery')}
              <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 pl-6 ml-2 border-l border-gray-300/50 dark:border-gray-700/50">
              <span className="text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent px-2 py-1 rounded-md bg-purple-50 dark:bg-purple-950/30">
                {localeNames[locale as keyof typeof localeNames]}
              </span>
              {otherLocales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}/gallery`}
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

function Footer({ locale }: { locale: string }) {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-2xl font-bold gradient-text">Njata Shiz Nakit</span>
          </div>
          <p className="text-gray-400 mb-2">{t('handmade')}</p>
          <p className="text-gray-500 text-sm">{t('location')}</p>
        </div>
      </div>
    </footer>
  );
}
