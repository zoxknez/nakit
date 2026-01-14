import { PieceForm } from '../PieceForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function NewPiecePage() {
    const session = await auth();

    if (!session) {
        redirect('/admin/login');
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Add New Jewelry Piece
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Create a new unique handcrafted piece for the gallery.
                    </p>
                </div>

                <PieceForm />
            </div>
        </div>
    );
}
