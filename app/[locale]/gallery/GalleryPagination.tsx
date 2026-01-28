'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryPaginationProps {
  currentPage: number;
  totalPages: number;
  locale: string;
  category?: string;
}

export default function GalleryPagination({
  currentPage,
  totalPages,
  locale,
  category,
}: GalleryPaginationProps) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    if (category && category !== 'all') {
      params.set('category', category);
    }
    if (page > 1) {
      params.set('page', page.toString());
    }
    const queryString = params.toString();
    return `/${locale}/gallery${queryString ? `?${queryString}` : ''}`;
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;
    
    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const prevText = locale === 'sr' ? 'Prethodna' : locale === 'ru' ? 'Предыдущая' : 'Previous';
  const nextText = locale === 'sr' ? 'Sledeća' : locale === 'ru' ? 'Следующая' : 'Next';

  return (
    <div className="mt-16 flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={buildUrl(currentPage - 1)}
            className="flex items-center gap-1 px-4 py-2 bg-brand-secondary/10 hover:bg-brand-secondary/20 border border-brand-secondary/30 rounded-lg text-brand-secondary font-medium transition-all duration-300"
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">{prevText}</span>
          </Link>
        ) : (
          <div className="flex items-center gap-1 px-4 py-2 bg-brand-primary/20 border border-brand-primary/20 rounded-lg text-brand-accent/40 cursor-not-allowed">
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">{prevText}</span>
          </div>
        )}

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            typeof page === 'number' ? (
              <Link
                key={index}
                href={buildUrl(page)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-brand-secondary text-brand-dark'
                    : 'bg-brand-secondary/10 hover:bg-brand-secondary/20 border border-brand-secondary/30 text-brand-secondary'
                }`}
              >
                {page}
              </Link>
            ) : (
              <span key={index} className="w-10 h-10 flex items-center justify-center text-brand-accent/60">
                ...
              </span>
            )
          ))}
        </div>

        {/* Next Button */}
        {currentPage < totalPages ? (
          <Link
            href={buildUrl(currentPage + 1)}
            className="flex items-center gap-1 px-4 py-2 bg-brand-secondary/10 hover:bg-brand-secondary/20 border border-brand-secondary/30 rounded-lg text-brand-secondary font-medium transition-all duration-300"
          >
            <span className="hidden sm:inline">{nextText}</span>
            <ChevronRight size={18} />
          </Link>
        ) : (
          <div className="flex items-center gap-1 px-4 py-2 bg-brand-primary/20 border border-brand-primary/20 rounded-lg text-brand-accent/40 cursor-not-allowed">
            <span className="hidden sm:inline">{nextText}</span>
            <ChevronRight size={18} />
          </div>
        )}
      </div>

      {/* Page Info */}
      <p className="text-brand-accent/60 text-sm">
        {locale === 'sr'
          ? `Stranica ${currentPage} od ${totalPages}`
          : locale === 'ru'
            ? `Страница ${currentPage} из ${totalPages}`
            : `Page ${currentPage} of ${totalPages}`}
      </p>
    </div>
  );
}
