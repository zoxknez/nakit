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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Welcome, {session.user?.name || session.user?.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/sr"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 transition-colors"
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
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Jewelry Pieces
          </h2>
          <Link
            href="/admin/pieces/new"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            + Add New Piece
          </Link>
        </div>

        {pieces.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl">
            <div className="text-6xl mb-4">🎨</div>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              No jewelry pieces yet
            </p>
            <Link
              href="/admin/pieces/new"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              Create First Piece
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pieces.map((piece: any) => {
              const srTranslation = piece.translations.find((t: any) => t.locale === 'sr');
              return (
                <div
                  key={piece.id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <div className="relative aspect-square bg-gray-200 dark:bg-gray-700">
                    {piece.mediaUrls[0] && (
                      <Image
                        src={piece.mediaUrls[0]}
                        alt={srTranslation?.title || 'Jewelry piece'}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2">
                      {srTranslation?.title || 'Untitled'}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <span>{piece.categoryKey}</span>
                      <span>
                        {piece.publishedLocales.length}/3 locales
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/pieces/${piece.id}/edit`}
                        className="flex-1 py-2 text-center bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/sr/gallery/${piece.id}`}
                        target="_blank"
                        className="flex-1 py-2 text-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        View
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
