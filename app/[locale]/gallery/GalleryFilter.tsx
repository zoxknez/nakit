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
    <div className="mb-12">
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat: any) => {
          const isActive = activeCat === cat.key;
          const label = cat[locale as keyof typeof cat] || cat.en;

          return (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className={`
                px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105
                ${
                  isActive
                    ? 'bg-brand-secondary text-brand-dark shadow-lg border-2 border-brand-secondary'
                    : 'bg-white dark:bg-brand-dark text-foreground dark:text-brand-accent hover:bg-brand-accent/10 dark:hover:bg-brand-primary/30 border border-brand-secondary/30 dark:border-brand-secondary/20'
                }
              `}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
