import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/home/Footer';

export default async function PieceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'piece' });

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
    piece.translations.find((tPrisma: { locale: string }) => tPrisma.locale === locale) ||
    piece.translations[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-dark via-brand-primary/20 to-brand-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 leather-texture opacity-25 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-brand-secondary/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-primary/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-brand-secondary/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: '-2s' }} />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href={`/${locale}/gallery`}
          className="group inline-flex items-center gap-2 text-brand-secondary hover:text-brand-accent transition-all duration-300 mb-12 hover:-translate-x-2"
        >
          <div className="w-8 h-8 rounded-full border-2 border-brand-secondary/50 group-hover:border-brand-secondary flex items-center justify-center group-hover:bg-brand-secondary/10 transition-all shadow-lg shadow-brand-secondary/10">
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
          <span className="font-serif text-lg tracking-wide">
            {t('backToGallery')}
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images Gallery */}
          <div className="space-y-6">
            {piece.mediaUrls.map((url: string, index: number) => (
              <div
                key={index}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-brand-secondary/20 leather-texture"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative w-full h-full bg-brand-dark/40">
                  <Image
                    src={url}
                    alt={`${translation?.title} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === 0}
                  />

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-secondary/0 to-transparent group-hover:via-brand-secondary/20 transition-all duration-700 pointer-events-none" />

                  {/* Gold Corner Accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Image Number Badge */}
                {piece.mediaUrls.length > 1 && (
                  <div className="absolute top-4 right-4 w-10 h-10 bg-brand-dark/40 backdrop-blur-md border border-brand-secondary/40 rounded-full flex items-center justify-center text-brand-secondary text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Details Section */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="relative bg-brand-dark/40 backdrop-blur-xl rounded-3xl p-10 shadow-3xl shadow-black/80 border border-brand-secondary/20 leather-texture overflow-hidden">

              {/* Decorative Elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-secondary/10 rounded-full blur-3xl animate-pulse-glow" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '-1.5s' }} />

              <div className="relative z-10 space-y-8">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-secondary/10 backdrop-blur-sm rounded-full border border-brand-secondary/30">
                  <svg className="w-4 h-4 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-brand-secondary font-serif text-sm font-bold tracking-widest uppercase">
                    {translation?.categoryName}
                  </span>
                </div>

                {/* Title & Price */}
                <div className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-accent leading-tight drop-shadow-md">
                      {translation?.title}
                    </h1>

                    {piece.price && (
                      <div className="flex flex-col items-start border-l-4 border-brand-secondary/40 pl-6 py-2 bg-brand-secondary/5 rounded-r-2xl shadow-inner">
                        <span className="text-[10px] text-brand-secondary/60 font-black uppercase tracking-[0.3em] mb-1">
                          {t('price')}
                        </span>
                        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="text-3xl md:text-4xl font-serif font-bold text-brand-secondary drop-shadow-lg">
                            {piece.price.toLocaleString(locale)} <span className="text-lg uppercase">RSD</span>
                          </span>
                          <span className="text-xs uppercase opacity-70 tracking-tight font-sans">
                            {t('shipping')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-24 h-1 bg-gradient-to-r from-brand-secondary via-brand-secondary/50 to-transparent rounded-full" />
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
                    <div className="w-full border-t border-brand-secondary/10" />
                  </div>
                  <div className="relative flex justify-center">
                    <div className="bg-brand-dark/60 backdrop-blur-sm px-6 py-1 rounded-full border border-brand-secondary/20">
                      <svg className="w-5 h-5 text-brand-secondary/60" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Handcrafted Info */}
                <div className="relative bg-brand-dark/30 backdrop-blur-sm rounded-2xl p-8 border border-brand-secondary/30 shadow-inner">
                  <div className="absolute -top-3 left-8 px-4 py-1 bg-brand-secondary rounded-full shadow-lg shadow-brand-secondary/20">
                    <span className="text-brand-dark text-xs font-bold uppercase tracking-wider">
                      {locale === 'sr'
                        ? 'Ručna Izrada'
                        : locale === 'ru'
                          ? 'Ручная Работа'
                          : 'Handcrafted'}
                    </span>
                  </div>

                  <ul className="space-y-4 mt-4">
                    <li className="flex items-start gap-4 group">
                      <div className="mt-1 w-6 h-6 rounded-full bg-brand-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-secondary/30 transition-all border border-brand-secondary/20 shadow-md">
                        <svg className="w-3 h-3 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-brand-accent/90 font-serif leading-relaxed text-base">
                        {locale === 'sr'
                          ? 'Proces izrade: ~3 dana'
                          : locale === 'ru'
                            ? 'Процесс изготовления: ~3 дня'
                            : 'Creation process: ~3 days'}
                      </span>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <div className="mt-1 w-6 h-6 rounded-full bg-brand-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-secondary/30 transition-all border border-brand-secondary/20 shadow-md">
                        <svg className="w-3 h-3 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-brand-accent/90 font-serif leading-relaxed text-base">
                        {locale === 'sr'
                          ? 'Potpuno ručno izrađeno'
                          : locale === 'ru'
                            ? 'Полностью ручная работа'
                            : 'Completely handmade'}
                      </span>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <div className="mt-1 w-6 h-6 rounded-full bg-brand-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-secondary/30 transition-all border border-brand-secondary/20 shadow-md">
                        <svg className="w-3 h-3 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-brand-accent/90 font-serif leading-relaxed text-base">
                        {locale === 'sr'
                          ? 'Svaki komad je unikat'
                          : locale === 'ru'
                            ? 'Каждое изделие уникально'
                            : 'Each piece is unique'}
                      </span>
                    </li>
                    <li className="flex items-start gap-4 group">
                      <div className="mt-1 w-6 h-6 rounded-full bg-brand-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-secondary/30 transition-all border border-brand-secondary/20 shadow-md">
                        <svg className="w-3 h-3 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-brand-accent/90 font-serif leading-relaxed text-base">
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
                <div className="flex items-center gap-2 text-sm text-brand-accent/60 pt-6 border-t border-brand-secondary/10">
                  <svg className="w-4 h-4 text-brand-secondary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-serif tracking-wide">
                    {locale === 'sr'
                      ? 'Kreirano'
                      : locale === 'ru'
                        ? 'Создано'
                        : 'Created'}{' '}
                    <span className="text-brand-secondary font-bold">
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
