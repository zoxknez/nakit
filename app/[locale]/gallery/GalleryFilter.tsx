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
        {categories.map((cat) => {
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
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
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
