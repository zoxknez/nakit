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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header locale={locale} />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={`/${locale}/gallery`}
          className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:underline mb-8"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {locale === 'sr'
            ? 'Nazad na galeriju'
            : locale === 'ru'
            ? 'Назад в галерею'
            : 'Back to gallery'}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {piece.mediaUrls.map((url: string, index: number) => (
              <div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image
                  src={url}
                  alt={`${translation?.title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2">
                {translation?.categoryName}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                {translation?.title}
              </h1>
              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {translation?.description}
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                  <h3 className="font-bold text-purple-900 dark:text-purple-300 mb-3">
                    {locale === 'sr'
                      ? 'O ručnoj izradi'
                      : locale === 'ru'
                      ? 'О ручной работе'
                      : 'About Handcrafted'}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>
                        {locale === 'sr'
                          ? 'Proces izrade: ~3 dana'
                          : locale === 'ru'
                          ? 'Процесс изготовления: ~3 дня'
                          : 'Creation process: ~3 days'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>
                        {locale === 'sr'
                          ? 'Potpuno ručno izrađeno'
                          : locale === 'ru'
                          ? 'Полностью ручная работа'
                          : 'Completely handmade'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>
                        {locale === 'sr'
                          ? 'Svaki komad je unikat'
                          : locale === 'ru'
                          ? 'Каждое изделие уникально'
                          : 'Each piece is unique'}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">✓</span>
                      <span>
                        {locale === 'sr'
                          ? 'Boje za kožu + fiksator za dugotrajnost'
                          : locale === 'ru'
                          ? 'Краски для кожи + фиксатор для долговечности'
                          : 'Leather paints + fixative for durability'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                {locale === 'sr'
                  ? 'Kreirano'
                  : locale === 'ru'
                  ? 'Создано'
                  : 'Created'}{' '}
                {new Date(piece.createdAt).toLocaleDateString(locale)}
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
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">NS</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">
              Njata Shiz
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              href={`/${locale}`}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}/gallery`}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {t('gallery')}
            </Link>

            <div className="flex items-center space-x-2 border-l border-gray-300 dark:border-gray-700 pl-4">
              <span className="text-purple-600 dark:text-purple-400 font-bold">
                {localeNames[locale as keyof typeof localeNames]}
              </span>
              {otherLocales.map((l) => (
                <Link
                  key={l}
                  href={`/${l}/gallery`}
                  className="text-gray-500 dark:text-gray-500 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm"
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
