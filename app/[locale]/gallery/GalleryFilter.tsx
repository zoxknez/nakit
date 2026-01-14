'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const categories = [
  { key: 'all', sr: 'Sve kategorije', ru: 'Все категории', en: 'All categories' },
  { key: 'necklaces', sr: 'Ogrlice', ru: 'Ожерелья', en: 'Necklaces' },
  { key: 'bracelets', sr: 'Narukvice', ru: 'Браслеты', en: 'Bracelets' },
  { key: 'statement', sr: 'Statement Komadi', ru: 'Эффектные Изделия', en: 'Statement Pieces' },
];

export default function GalleryFilter({
  locale,
  currentCategory,
}: {
  locale: string;
  currentCategory?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('gallery');

  const handleCategoryChange = (categoryKey: string) => {
    if (categoryKey === 'all') {
      router.push(pathname);
    } else {
      router.push(`${pathname}?category=${categoryKey}`);
    }
  };

  const activeCat = currentCategory || 'all';

  return (
    <div className="mb-16 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((cat: any, index: number) => {
          const isActive = activeCat === cat.key;
          const label = cat[locale as keyof typeof cat] || cat.en;

          return (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className={`
                relative px-8 py-3.5 rounded-full font-serif font-semibold text-sm transition-all duration-500 transform hover:scale-110
                animate-fadeInUp overflow-hidden
                ${isActive
                  ? 'bg-brand-secondary text-brand-dark shadow-[0_0_25px_rgba(197,160,89,0.4)] scale-110 border-2 border-brand-secondary'
                  : 'bg-brand-dark/40 text-brand-accent/70 hover:text-brand-secondary hover:bg-brand-dark/60 border-2 border-brand-secondary/20 hover:border-brand-secondary/50 backdrop-blur-md'
                }
              `}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              {/* Shine effect on hover */}
              {!isActive && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-secondary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 transform -translate-x-full hover:translate-x-full" />
              )}

              {/* Active indicator */}
              {isActive && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-primary rounded-full animate-ping" />
              )}

              <span className="relative z-10 flex items-center gap-2">
                {isActive && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Decorative line */}
      <div className="mt-8 flex items-center gap-4 max-w-md mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-secondary/50 to-transparent" />
        <svg className="w-5 h-5 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-brand-secondary/50 to-transparent" />
      </div>
    </div>
  );
}
