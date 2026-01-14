'use client';

import { useState } from 'react';
import { createPiece, updatePiece } from './actions';
import Image from 'next/image';

interface PieceFormProps {
    initialData?: any;
    pieceId?: string;
}

export function PieceForm({ initialData, pieceId }: PieceFormProps) {
    const [loading, setLoading] = useState(false);
    const [previews, setPreviews] = useState<string[]>(initialData?.mediaUrls || []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
            setPreviews([...previews, ...newPreviews]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        // The server actions handle the redirection
    };

    const srTranslation = initialData?.translations.find((t: any) => t.locale === 'sr');
    const ruTranslation = initialData?.translations.find((t: any) => t.locale === 'ru');
    const enTranslation = initialData?.translations.find((t: any) => t.locale === 'en');

    return (
        <form action={pieceId ? updatePiece.bind(null, pieceId) : createPiece} onSubmit={() => setLoading(true)} className="space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                            Category Key
                        </label>
                        <select
                            name="categoryKey"
                            defaultValue={initialData?.categoryKey || 'necklaces'}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-brand-secondary outline-none transition-all"
                            required
                        >
                            <option value="necklaces">Necklaces</option>
                            <option value="bracelets">Bracelets</option>
                            <option value="statement">Statement Pieces</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                            Price (RSD)
                        </label>
                        <input
                            type="number"
                            name="price"
                            defaultValue={initialData?.price || ''}
                            placeholder="e.g. 4500"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-brand-secondary outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
                            Images
                        </label>
                        <input
                            type="file"
                            name="files"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-secondary/10 file:text-brand-secondary hover:file:bg-brand-secondary/20 transition-all cursor-pointer"
                        />
                        {previews.length > 0 && (
                            <div className="grid grid-cols-4 gap-4 mt-6">
                                {previews.map((url, i) => (
                                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-gray-100 dark:border-gray-600 shadow-sm">
                                        <Image src={url} alt="Preview" fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                        {initialData?.mediaUrls && (
                            <input type="hidden" name="existingUrls" value={JSON.stringify(initialData.mediaUrls)} />
                        )}
                    </div>
                </div>

                {/* Translations */}
                <div className="space-y-8">
                    {/* Serbian */}
                    <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary mb-4 flex items-center gap-2">
                            <span className="w-8 h-5 bg-blue-600 rounded-sm inline-block"></span> SR - Serbian
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="srTitle"
                                defaultValue={srTranslation?.title || ''}
                                placeholder="Naslov"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-brand-secondary"
                                required
                            />
                            <input
                                type="text"
                                name="srCategory"
                                defaultValue={srTranslation?.categoryName || ''}
                                placeholder="Kategorija (npr. Ogrlice)"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-brand-secondary"
                                required
                            />
                            <textarea
                                name="srDescription"
                                defaultValue={srTranslation?.description || ''}
                                placeholder="Opis..."
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-brand-secondary"
                                required
                            />
                        </div>
                    </div>

                    {/* Russian */}
                    <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary mb-4 flex items-center gap-2">
                            <span className="w-8 h-5 bg-red-600 rounded-sm inline-block"></span> RU - Russian
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="ruTitle"
                                defaultValue={ruTranslation?.title || ''}
                                placeholder="Заголовок"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-brand-secondary"
                            />
                            <input
                                type="text"
                                name="ruCategory"
                                defaultValue={ruTranslation?.categoryName || ''}
                                placeholder="Категория"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-brand-secondary"
                            />
                            <textarea
                                name="ruDescription"
                                defaultValue={ruTranslation?.description || ''}
                                placeholder="Описание..."
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-brand-secondary"
                            />
                        </div>
                    </div>

                    {/* English */}
                    <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border border-gray-100 dark:border-gray-600">
                        <h3 className="text-lg font-bold text-brand-primary dark:text-brand-secondary mb-4 flex items-center gap-2">
                            <span className="w-8 h-5 bg-blue-800 rounded-sm inline-block"></span> EN - English
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="enTitle"
                                defaultValue={enTranslation?.title || ''}
                                placeholder="Title"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-brand-secondary"
                            />
                            <input
                                type="text"
                                name="enCategory"
                                defaultValue={enTranslation?.categoryName || ''}
                                placeholder="Category"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-brand-secondary"
                            />
                            <textarea
                                name="enDescription"
                                defaultValue={enTranslation?.description || ''}
                                placeholder="Description..."
                                rows={3}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-brand-secondary"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-8 py-3 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-12 py-3 bg-brand-secondary text-brand-dark rounded-xl font-bold hover:bg-brand-secondary/90 transition-all shadow-lg hover:shadow-brand-secondary/20 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Saving...
                        </span>
                    ) : (
                        pieceId ? 'Update Piece' : 'Create Piece'
                    )}
                </button>
            </div>
        </form>
    );
}
