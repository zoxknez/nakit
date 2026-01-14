import { PieceForm } from '../../PieceForm';
import { auth } from '@/auth';
import { redirect, notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function EditPiecePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const session = await auth();
    const { id } = await params;

    if (!session) {
        redirect('/admin/login');
    }

    const piece = await prisma.jewelryPiece.findUnique({
        where: { id },
        include: { translations: true },
    });

    if (!piece) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Edit Jewelry Piece
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Modify the details of your handcrafted masterpiece.
                    </p>
                </div>

                <PieceForm initialData={piece} pieceId={id} />
            </div>
        </div>
    );
}
