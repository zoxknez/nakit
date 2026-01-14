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
    <div className="min-h-screen bg-brand-dark">
      {/* Header */}
      <header className="bg-brand-dark/50 backdrop-blur-md border-b border-brand-secondary/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-secondary/20 rounded-full flex items-center justify-center border border-brand-secondary/30">
                <span className="text-brand-secondary font-bold text-xl">N</span>
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-brand-secondary">Admin Panel</h1>
                <p className="text-xs text-brand-accent/60 uppercase tracking-widest">
                  {session.user?.name || session.user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/sr"
                target="_blank"
                className="px-4 py-2 text-sm font-semibold text-brand-secondary border border-brand-secondary/30 rounded-lg hover:bg-brand-secondary/10 transition-colors"
              >
                View Site
              </Link>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-4xl font-serif font-bold text-brand-accent mb-2">
              Jewelry Gallery
            </h2>
            <p className="text-brand-primary/60">
              Manage your handcrafted collection.
            </p>
          </div>
          <Link
            href="/admin/pieces/new"
            className="group relative px-8 py-3 bg-brand-secondary text-brand-dark rounded-xl font-bold overflow-hidden shadow-lg hover:shadow-brand-secondary/25 transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2">
              <span className="text-xl">+</span> Add New Piece
            </span>
          </Link>
        </div>

        {pieces.length === 0 ? (
          <div className="text-center py-32 bg-brand-primary/5 rounded-3xl border border-brand-secondary/10 dashed-border">
            <div className="w-24 h-24 mx-auto mb-6 bg-brand-secondary/10 rounded-full flex items-center justify-center">
              <div className="text-4xl">💎</div>
            </div>
            <h3 className="text-2xl font-serif font-bold text-brand-accent mb-2">No pieces yet</h3>
            <p className="text-brand-primary/60 mb-8 max-w-md mx-auto">
              Start building your gallery by adding your first unique handcrafted piece.
            </p>
            <Link
              href="/admin/pieces/new"
              className="inline-block px-8 py-3 bg-brand-secondary text-brand-dark rounded-xl font-bold hover:bg-brand-secondary/90 transition-all shadow-lg"
            >
              Create First Piece
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pieces.map((piece: any) => {
              const srTranslation = piece.translations.find((t: any) => t.locale === 'sr');
              return (
                <div
                  key={piece.id}
                  className="group bg-brand-dark/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-brand-secondary/20 hover:border-brand-secondary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50"
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-brand-primary/10">
                    {piece.mediaUrls[0] ? (
                      <Image
                        src={piece.mediaUrls[0]}
                        alt={srTranslation?.title || 'Jewelry piece'}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-secondary/20 font-serif text-4xl">
                        NS
                      </div>
                    )}
                    {/* Price Tag */}
                    {piece.price && (
                      <div className="absolute top-4 right-4 bg-brand-dark/80 backdrop-blur-md px-3 py-1 rounded-lg border border-brand-secondary/30 shadow-lg">
                        <span className="text-brand-secondary font-bold font-serif">
                          {piece.price.toLocaleString('sr-RS')} RSD
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-xl text-brand-accent mb-2 group-hover:text-brand-secondary transition-colors">
                      {srTranslation?.title || 'Untitled Piece'}
                    </h3>

                    <div className="flex items-center gap-2 mb-6">
                      <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20">
                        {piece.categoryKey}
                      </span>
                      <span className="text-xs text-brand-primary/40">•</span>
                      <span className="text-xs text-brand-primary/60">
                        {piece.publishedLocales.length} languages
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/admin/pieces/${piece.id}/edit`}
                        className="flex-1 py-2.5 text-center bg-brand-secondary/10 text-brand-secondary rounded-lg font-semibold hover:bg-brand-secondary hover:text-brand-dark transition-all duration-300 border border-brand-secondary/20 hover:border-brand-secondary"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/sr/gallery/${piece.id}`}
                        target="_blank"
                        className="flex-1 py-2.5 text-center bg-brand-primary/5 text-brand-primary/60 rounded-lg font-semibold hover:bg-brand-primary/10 hover:text-brand-accent transition-all duration-300 border border-brand-primary/10"
                      >
                        Preview
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
