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
        <form action={pieceId ? updatePiece.bind(null, pieceId) : createPiece} onSubmit={() => setLoading(true)} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Media & Core Info */}
                <div className="space-y-8">
                    {/* Media Upload */}
                    <div className="bg-brand-dark/40 border border-brand-secondary/20 rounded-2xl p-8 backdrop-blur-sm">
                        <label className="block text-sm font-bold text-brand-secondary mb-4 uppercase tracking-wider flex justify-between">
                            <span>Image Gallery</span>
                            <span className="text-brand-primary/60 text-xs normal-case font-normal">First image is the cover</span>
                        </label>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {previews.map((url, i) => (
                                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-brand-secondary/30 shadow-lg group">
                                    <Image src={url} alt="Preview" fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">{i + 1}</span>
                                    </div>
                                </div>
                            ))}
                            <label className="relative aspect-square rounded-xl border-2 border-dashed border-brand-secondary/30 hover:border-brand-secondary/60 hover:bg-brand-secondary/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group">
                                <div className="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <span className="text-2xl text-brand-secondary">+</span>
                                </div>
                                <span className="text-xs text-brand-secondary/60 font-bold uppercase">Add Photo</span>
                                <input
                                    type="file"
                                    name="files"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                        {initialData?.mediaUrls && (
                            <input type="hidden" name="existingUrls" value={JSON.stringify(initialData.mediaUrls)} />
                        )}
                    </div>

                    {/* Core Details */}
                    <div className="bg-brand-dark/40 border border-brand-secondary/20 rounded-2xl p-8 backdrop-blur-sm space-y-6">
                        <h3 className="text-xl font-serif font-bold text-brand-accent mb-4 border-b border-brand-secondary/10 pb-2">
                            Product Details
                        </h3>

                        <div>
                            <label className="block text-sm font-bold text-brand-primary mb-2 uppercase tracking-wider">
                                Category
                            </label>
                            <select
                                name="categoryKey"
                                defaultValue={initialData?.categoryKey || 'necklaces'}
                                className="w-full px-4 py-3 rounded-xl border border-brand-secondary/20 bg-brand-primary/5 text-brand-accent focus:ring-2 focus:ring-brand-secondary/50 outline-none transition-all appearance-none cursor-pointer hover:bg-brand-primary/10"
                                required
                            >
                                <option value="necklaces">Necklaces (Ogrlice)</option>
                                <option value="bracelets">Bracelets (Narukvice)</option>
                                <option value="statement">Statement Pieces</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-brand-primary mb-2 uppercase tracking-wider">
                                Price (RSD)
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="price"
                                    defaultValue={initialData?.price || ''}
                                    placeholder="4500"
                                    className="w-full px-4 py-3 rounded-xl border border-brand-secondary/20 bg-brand-primary/5 text-brand-accent focus:ring-2 focus:ring-brand-secondary/50 outline-none transition-all font-mono font-bold text-lg"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-secondary font-bold font-serif pointer-events-none">
                                    RSD
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Translations */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-serif font-bold text-brand-accent">
                            Translations & Content
                        </h3>
                        <span className="text-xs text-brand-primary/50 uppercase tracking-widest">3 Languages Required</span>
                    </div>

                    {/* Serbian (Primary) */}
                    <div className="p-6 bg-brand-primary/5 rounded-2xl border border-brand-secondary/20 relative overflow-hidden group hover:border-brand-secondary/40 transition-colors">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-bl-full pointer-events-none" />
                        <h3 className="text-lg font-bold text-brand-secondary mb-4 flex items-center gap-2">
                            <span className="w-8 h-5 bg-gradient-to-b from-red-600 via-blue-600 to-white rounded-sm shadow-sm inline-block opacity-80"></span>
                            Srpski (Primary)
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="srTitle"
                                defaultValue={srTranslation?.title || ''}
                                placeholder="Naziv komada"
                                className="w-full px-4 py-2 rounded-lg border border-brand-secondary/20 bg-brand-dark/30 text-brand-accent placeholder-brand-primary/30 outline-none focus:ring-1 focus:ring-brand-secondary"
                                required
                            />
                            <input
                                type="text"
                                name="srCategory"
                                defaultValue={srTranslation?.categoryName || ''}
                                placeholder="Ime kategorije (npr. Graciozna Ogrlica)"
                                className="w-full px-4 py-2 rounded-lg border border-brand-secondary/20 bg-brand-dark/30 text-brand-accent placeholder-brand-primary/30 outline-none focus:ring-1 focus:ring-brand-secondary"
                                required
                            />
                            <textarea
                                name="srDescription"
                                defaultValue={srTranslation?.description || ''}
                                placeholder="Detaljan opis i priča iza komada..."
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg border border-brand-secondary/20 bg-brand-dark/30 text-brand-accent placeholder-brand-primary/30 outline-none focus:ring-1 focus:ring-brand-secondary resize-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Russian */}
                    <div className="p-6 bg-brand-primary/5 rounded-2xl border border-brand-secondary/10 opacity-90 hover:opacity-100 hover:border-brand-secondary/30 transition-all">
                        <h3 className="text-lg font-bold text-brand-primary/80 mb-4 flex items-center gap-2">
                            <span className="w-8 h-5 bg-gradient-to-b from-white via-blue-600 to-red-600 rounded-sm shadow-sm inline-block opacity-80"></span>
                            Русский
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="ruTitle"
                                defaultValue={ruTranslation?.title || ''}
                                placeholder="Название"
                                className="w-full px-4 py-2 rounded-lg border border-brand-secondary/20 bg-brand-dark/30 text-brand-accent placeholder-brand-primary/30 outline-none focus:ring-1 focus:ring-brand-secondary"
                            />
                            <input
                                type="text"
                                name="ruCategory"
                                defaultValue={ruTranslation?.categoryName || ''}
                                placeholder="Категория"
                                className="w-full px-4 py-2 rounded-lg border border-brand-secondary/20 bg-brand-dark/30 text-brand-accent placeholder-brand-primary/30 outline-none focus:ring-1 focus:ring-brand-secondary"
                            />
                            <textarea
                                name="ruDescription"
                                defaultValue={ruTranslation?.description || ''}
                                placeholder="Описание..."
                                rows={2}
                                className="w-full px-4 py-2 rounded-lg border border-brand-secondary/20 bg-brand-dark/30 text-brand-accent placeholder-brand-primary/30 outline-none focus:ring-1 focus:ring-brand-secondary resize-none"
                            />
                        </div>
                    </div>

                    {/* English */}
                    <div className="p-6 bg-brand-primary/5 rounded-2xl border border-brand-secondary/10 opacity-90 hover:opacity-100 hover:border-brand-secondary/30 transition-all">
                        <h3 className="text-lg font-bold text-brand-primary/80 mb-4 flex items-center gap-2">
                            <span className="w-8 h-5 bg-gradient-to-b from-blue-800 via-red-600 to-white rounded-sm shadow-sm inline-block opacity-80"></span>
                            English
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="enTitle"
                                defaultValue={enTranslation?.title || ''}
                                placeholder="Title"
                                className="w-full px-4 py-2 rounded-lg border border-brand-secondary/20 bg-brand-dark/30 text-brand-accent placeholder-brand-primary/30 outline-none focus:ring-1 focus:ring-brand-secondary"
                            />
                            <input
                                type="text"
                                name="enCategory"
                                defaultValue={enTranslation?.categoryName || ''}
                                placeholder="Category Name"
                                className="w-full px-4 py-2 rounded-lg border border-brand-secondary/20 bg-brand-dark/30 text-brand-accent placeholder-brand-primary/30 outline-none focus:ring-1 focus:ring-brand-secondary"
                            />
                            <textarea
                                name="enDescription"
                                defaultValue={enTranslation?.description || ''}
                                placeholder="Description..."
                                rows={2}
                                className="w-full px-4 py-2 rounded-lg border border-brand-secondary/20 bg-brand-dark/30 text-brand-accent placeholder-brand-primary/30 outline-none focus:ring-1 focus:ring-brand-secondary resize-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-8 border-t border-brand-secondary/10 flex justify-end gap-4 sticky bottom-0 bg-brand-dark/80 backdrop-blur-md p-4 -mx-4 -mb-4 rounded-b-2xl z-20">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="px-8 py-3 rounded-xl border border-brand-secondary/20 text-brand-primary hover:bg-brand-primary/5 transition-all font-semibold"
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
                        pieceId ? 'Update Masterpiece' : 'Create Masterpiece'
                    )}
                </button>
            </div>
        </form>
    );
}
