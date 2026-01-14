import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { SignOutButton } from './SignOutButton';

export default async function AdminDashboard() {
  const session = await auth();

  if (!session) {
    redirect('/admin/login');
  }

  const pieces = await prisma.jewelryPiece.findMany({
    include: {
      translations: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen">
      {/* Premium Header */}
      <header className="fixed top-0 left-0 right-0 h-20 bg-brand-dark/40 backdrop-blur-xl border-b border-brand-secondary/20 z-50 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full h-full flex justify-between items-center">
          <div className="flex items-center gap-5 group">
            <div className="w-12 h-12 bg-brand-secondary/10 rounded-full flex items-center justify-center border border-brand-secondary/30 shadow-[0_0_15px_rgba(197,160,89,0.1)] group-hover:bg-brand-secondary/20 transition-all duration-500">
              <span className="text-brand-secondary font-serif font-bold text-2xl group-hover:scale-110 transition-transform duration-500">NS</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-serif font-bold text-brand-secondary tracking-tight">Admin Panel</h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[10px] text-brand-secondary/60 uppercase tracking-[0.2em] font-bold">
                  {session.user?.name || 'Administrator'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/sr"
              target="_blank"
              className="px-5 py-2 text-sm font-bold text-brand-secondary border border-brand-secondary/30 rounded-full hover:bg-brand-secondary/10 hover:border-brand-secondary/60 transition-all duration-300"
            >
              Pogledaj sajt
            </Link>
            <div className="w-px h-8 bg-brand-secondary/20" />
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="animate-slide-in-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-px bg-brand-secondary/40" />
              <span className="text-[11px] font-bold text-brand-secondary uppercase tracking-[0.3em]">Upravljanje Kolekcijom</span>
            </div>
            <h2 className="text-5xl font-serif font-bold text-brand-accent">
              Umetnička dela
            </h2>
          </div>

          <Link
            href="/admin/pieces/new"
            className="group relative px-10 py-4 bg-brand-secondary text-brand-dark rounded-full font-black uppercase tracking-wider text-sm overflow-hidden shadow-[0_0_30px_rgba(197,160,89,0.2)] hover:shadow-brand-secondary/40 transition-all duration-500 flex items-center gap-3"
          >
            <span className="relative z-10">Dodaj novi rad</span>
            <span className="text-xl relative z-10 transition-transform duration-500 group-hover:rotate-90">+</span>
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
          </Link>
        </div>

        {pieces.length === 0 ? (
          <div className="py-40 text-center glass-dark rounded-[3rem] border border-brand-secondary/10 relative overflow-hidden animate-fadeInScale">
            {/* Background pattern for empty state */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c5a059 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="relative z-10">
              <div className="w-32 h-32 mx-auto mb-10 bg-brand-secondary/5 rounded-full flex items-center justify-center border border-brand-secondary/10 animate-float">
                <span className="text-6xl grayscale group-hover:grayscale-0 transition-all">💍</span>
              </div>
              <h3 className="text-4xl font-serif font-bold text-brand-accent mb-4">Kolekcija je prazna</h3>
              <p className="text-brand-primary-foreground/40 mb-10 max-w-lg mx-auto leading-relaxed text-lg">
                Vaša galerija unikatnog nakita čeka na svoje prvo umetničko delo. Počnite tako što ćete dodati novi rad.
              </p>
              <Link
                href="/admin/pieces/new"
                className="inline-flex items-center gap-3 px-10 py-4 border-2 border-brand-secondary text-brand-secondary rounded-full font-bold hover:bg-brand-secondary hover:text-brand-dark transition-all duration-500 text-lg shadow-[0_0_40px_rgba(197,160,89,0.1)]"
              >
                Dodaj prvi rad
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {pieces.map((piece: any, index: number) => {
              const srTranslation = piece.translations.find((t: any) => t.locale === 'sr');
              return (
                <div
                  key={piece.id}
                  className="group relative glass-dark rounded-[2.5rem] overflow-hidden border border-brand-secondary/10 hover:border-brand-secondary/40 transition-all duration-700 hover:shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    {piece.mediaUrls[0] ? (
                      <Image
                        src={piece.mediaUrls[0]}
                        alt={srTranslation?.title || 'Nakit'}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-brand-secondary/5 text-brand-secondary/20 font-serif text-6xl">
                        NS
                      </div>
                    )}

                    {/* Floating Price Tag */}
                    {piece.price && (
                      <div className="absolute bottom-6 right-6 px-4 py-2 bg-brand-dark/90 backdrop-blur-md rounded-2xl border border-brand-secondary/40 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-brand-secondary font-bold font-serif text-lg tracking-tight">
                          {piece.price.toLocaleString('sr-RS')} <span className="text-xs uppercase ml-1">RSD</span>
                        </span>
                      </div>
                    )}

                    {/* Category Pin */}
                    <div className="absolute top-6 left-6 px-3 py-1 bg-brand-secondary/20 backdrop-blur-xl rounded-full border border-brand-secondary/20 shadow-lg">
                      <span className="text-[10px] text-brand-accent font-black uppercase tracking-widest leading-none">
                        {piece.categoryKey === 'necklaces' ? 'Ogrlice' : piece.categoryKey === 'bracelets' ? 'Narukvice' : 'Special'}
                      </span>
                    </div>
                  </div>

                  {/* Content Overlay/Details */}
                  <div className="p-8 relative">
                    <div className="mb-8">
                      <h3 className="font-serif font-bold text-2xl text-brand-accent mb-3 group-hover:text-brand-secondary transition-colors duration-500 truncate">
                        {srTranslation?.title || 'Bez naslova'}
                      </h3>
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {['sr', 'ru', 'en'].map(lang => {
                            const hasLang = piece.publishedLocales.includes(lang);
                            return (
                              <span key={lang} className={`text-[8px] font-black uppercase tracking-tighter w-5 h-5 flex items-center justify-center rounded-full border ${hasLang ? 'bg-brand-secondary/10 border-brand-secondary/40 text-brand-secondary' : 'bg-white/5 border-white/5 text-white/20'}`}>
                                {lang}
                              </span>
                            );
                          })}
                        </div>
                        <span className="w-1 h-1 rounded-full bg-brand-secondary/20" />
                        <span className="text-[10px] text-brand-secondary/40 font-bold uppercase tracking-widest">
                          {new Date(piece.createdAt).toLocaleDateString('sr-RS')}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Link
                        href={`/admin/pieces/${piece.id}/edit`}
                        className="flex-[2] py-4 text-center glass-dark text-brand-secondary rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-secondary hover:text-brand-dark transition-all duration-500 border border-brand-secondary/20"
                      >
                        Izmeni
                      </Link>
                      <Link
                        href={`/sr/gallery/${piece.id}`}
                        target="_blank"
                        className="flex-1 py-4 flex items-center justify-center bg-white/5 text-brand-accent/60 rounded-2xl hover:bg-white/10 hover:text-brand-accent transition-all duration-500 border border-white/5"
                        title="Pogledaj uživo"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
