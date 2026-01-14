'use client';

import { useState, useRef } from 'react';
import { createPiece, updatePiece } from './actions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface PreviewItem {
    id: string; // Unique ID for keying
    url: string; // Blob URL for new, or Cloud URL for existing
    file?: File; // Actual file for new
    type: 'existing' | 'new';
}

interface PieceFormProps {
    initialData?: any;
    pieceId?: string;
}

export function PieceForm({ initialData, pieceId }: PieceFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [previews, setPreviews] = useState<PreviewItem[]>(
        initialData?.mediaUrls.map((url: string, i: number) => ({
            id: `existing-${i}`,
            url,
            type: 'existing'
        })) || []
    );

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newItems: PreviewItem[] = Array.from(files).map((file, i) => ({
                id: `new-${Date.now()}-${i}`,
                url: URL.createObjectURL(file),
                file,
                type: 'new'
            }));
            setPreviews([...previews, ...newItems]);
        }
    };

    const removeImage = (id: string) => {
        setPreviews(prev => prev.filter(item => item.id !== id));
    };

    const makePrimary = (index: number) => {
        if (index === 0) return;
        const newPreviews = [...previews];
        const [moved] = newPreviews.splice(index, 1);
        newPreviews.unshift(moved);
        setPreviews(newPreviews);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData(e.currentTarget);

            // Remove the default 'files' entries because we'll add them manually in the correct order
            formData.delete('files');
            formData.delete('existingUrls');

            // Collect existing URLs in order
            const existingUrls = previews
                .filter(p => p.type === 'existing')
                .map(p => p.url);

            formData.append('existingUrls', JSON.stringify(existingUrls));

            // Add new files in order
            previews.forEach(p => {
                if (p.type === 'new' && p.file) {
                    formData.append('files', p.file);
                }
            });

            const result = pieceId
                ? await updatePiece(pieceId, formData)
                : await createPiece(formData);

            if (result && result.success) {
                router.push('/admin');
                router.refresh();
            } else if (result && !result.success) {
                setError(result.error || 'The forge encountered an unknown resistance.');
                setLoading(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } catch (err: any) {
            // Next.js uses internal error signals for some navigation rituals
            if (err?.message === 'NEXT_REDIRECT') return;

            console.error('Submit Error:', err);
            setError('A critical failure occurred during the casting of this spell.');
            setLoading(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const srTranslation = initialData?.translations.find((t: any) => t.locale === 'sr');
    const ruTranslation = initialData?.translations.find((t: any) => t.locale === 'ru');
    const enTranslation = initialData?.translations.find((t: any) => t.locale === 'en');

    return (
        <form onSubmit={handleSubmit} className="pb-32">
            {/* Error Message */}
            {error && (
                <div className="mb-10 animate-scale-in">
                    <div className="glass-dark border border-red-500/30 rounded-3xl p-6 flex items-center gap-6 shadow-[0_0_40px_rgba(239,68,68,0.1)]">
                        <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-red-500 font-bold text-sm uppercase tracking-widest mb-1">Greška pri čuvanju</h4>
                            <p className="text-brand-accent/60 text-xs font-serif leading-relaxed">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Media & Core Info (8 cols) */}
                <div className="lg:col-span-12 xl:col-span-8 space-y-10">
                    {/* Media Upload Section */}
                    <div className="glass-dark rounded-[3rem] p-10 border border-brand-secondary/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />

                        <div className="flex justify-between items-end mb-10 relative z-10">
                            <div>
                                <h3 className="text-3xl font-serif font-bold text-brand-secondary mb-2">Vizuelni identitet</h3>
                                <p className="text-brand-accent/40 text-[10px] font-black uppercase tracking-[0.2em]">Prva slika definiše naslovnu fotografiju rada</p>
                            </div>
                            <div className="text-brand-secondary/40 text-[10px] font-black uppercase tracking-[0.1em] flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-brand-secondary/40" />
                                {previews.length} Slika dodato
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
                            {previews.map((item, i) => (
                                <div key={item.id} className={`group/img relative aspect-square rounded-[2rem] overflow-hidden border transition-all duration-500 ${i === 0 ? 'border-brand-secondary ring-2 ring-brand-secondary/20' : 'border-brand-secondary/20'}`}>
                                    <Image src={item.url} alt="Pregled" fill className="object-cover transition-transform duration-700 group-hover/img:scale-110" />

                                    {/* Cover Badge */}
                                    {i === 0 && (
                                        <div className="absolute top-4 left-4 px-2 py-0.5 bg-brand-secondary text-brand-dark rounded-full text-[8px] font-black uppercase tracking-widest z-10">
                                            Naslovna
                                        </div>
                                    )}

                                    {/* Actions Overlay */}
                                    <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => removeImage(item.id)}
                                            className="w-10 h-10 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center border border-red-500/30 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                            title="Ukloni sliku"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                        {i !== 0 && (
                                            <button
                                                type="button"
                                                onClick={() => makePrimary(i)}
                                                className="px-3 py-1 bg-brand-secondary/20 text-brand-secondary rounded-full text-[8px] font-black uppercase tracking-widest border border-brand-secondary/30 hover:bg-brand-secondary hover:text-brand-dark transition-all"
                                            >
                                                Postavi kao naslovnu
                                            </button>
                                        )}
                                    </div>

                                    {/* Order Badge */}
                                    <div className="absolute bottom-4 right-4 text-[10px] font-black text-brand-secondary/60">
                                        #{String(i + 1).padStart(2, '0')}
                                    </div>
                                </div>
                            ))}

                            <label className="relative aspect-square rounded-[2rem] border-2 border-dashed border-brand-secondary/20 hover:border-brand-secondary/60 hover:bg-brand-secondary/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 overflow-hidden group/add">
                                <div className="w-14 h-14 rounded-full bg-brand-secondary/10 flex items-center justify-center border border-brand-secondary/20 group-hover/add:scale-110 transition-transform duration-500">
                                    <span className="text-3xl text-brand-secondary">+</span>
                                </div>
                                <span className="text-[10px] text-brand-secondary/60 font-black uppercase tracking-[0.2em]">Dodaj sliku</span>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <div className="absolute inset-0 bg-brand-secondary/2 opacity-0 group-hover/add:opacity-100 transition-opacity" />
                            </label>
                        </div>
                    </div>

                    {/* Core Specifications */}
                    <div className="glass-dark rounded-[3rem] p-10 border border-brand-secondary/20">
                        <h3 className="text-2xl font-serif font-bold text-brand-secondary mb-8 pb-4 border-b border-brand-secondary/10">Osnovne specifikacije</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <label className="block text-[10px] font-black text-brand-secondary/60 uppercase tracking-[0.3em] ml-2">
                                    Kategorija rada
                                </label>
                                <select
                                    name="categoryKey"
                                    defaultValue={initialData?.categoryKey || 'necklaces'}
                                    className="w-full px-6 py-4 rounded-2xl border border-brand-secondary/20 bg-white/5 text-brand-accent focus:ring-2 focus:ring-brand-secondary/40 outline-none transition-all appearance-none cursor-pointer hover:bg-white/10 text-sm font-bold tracking-wider"
                                    required
                                >
                                    <option value="necklaces" className="bg-brand-dark">Ogrlice</option>
                                    <option value="bracelets" className="bg-brand-dark">Narukvice</option>
                                    <option value="statement" className="bg-brand-dark">Unikati / Specijalno</option>
                                </select>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-[10px] font-black text-brand-secondary/60 uppercase tracking-[0.3em] ml-2">
                                    Cena (RSD)
                                </label>
                                <div className="relative group">
                                    <input
                                        type="number"
                                        name="price"
                                        defaultValue={initialData?.price || ''}
                                        placeholder="0"
                                        className="w-full px-6 py-4 rounded-2xl border border-brand-secondary/20 bg-white/5 text-brand-accent focus:ring-2 focus:ring-brand-secondary/40 outline-none transition-all font-mono font-bold text-xl group-hover:bg-white/10"
                                    />
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-brand-secondary font-black text-[10px] uppercase tracking-widest pointer-events-none opacity-40">
                                        RSD
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Narrative (4 cols) */}
                <div className="lg:col-span-12 xl:col-span-4 space-y-8 animate-slide-in-right">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-px bg-brand-secondary/40" />
                        <h3 className="text-[11px] font-black text-brand-secondary uppercase tracking-[0.4em]">Tekstualni opisi</h3>
                    </div>

                    {[
                        { lang: 'sr', title: 'Srpski jezik', data: srTranslation, flag: '🇷🇸', required: true },
                        { lang: 'ru', title: 'Ruski jezik', data: ruTranslation, flag: '🇷🇺' },
                        { lang: 'en', title: 'Engleski jezik', data: enTranslation, flag: '🇬🇧' }
                    ].map((item, idx) => (
                        <div
                            key={item.lang}
                            className={`glass-dark p-8 rounded-[2.5rem] border transition-all duration-500 group/lang ${item.required ? 'border-brand-secondary/30 ring-1 ring-brand-secondary/10' : 'border-brand-secondary/10 opacity-70 hover:opacity-100 hover:border-brand-secondary/30'}`}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="font-bold text-brand-secondary text-sm flex items-center gap-3">
                                    <span className="text-xl grayscale group-hover/lang:grayscale-0 transition-all">{item.flag}</span>
                                    {item.title}
                                </h4>
                                {item.required && <span className="text-[8px] font-black uppercase text-brand-secondary/60 tracking-tighter bg-brand-secondary/10 px-2 py-0.5 rounded-full">Obavezno</span>}
                            </div>

                            <div className="space-y-5">
                                <input
                                    type="text"
                                    name={`${item.lang}Title`}
                                    defaultValue={item.data?.title || ''}
                                    placeholder="Naslov rada..."
                                    className="w-full px-5 py-3 rounded-xl border border-brand-secondary/10 bg-white/5 text-brand-accent text-sm font-bold placeholder-white/20 outline-none focus:ring-1 focus:ring-brand-secondary/40 focus:bg-white/10 transition-all"
                                    required={item.required}
                                />
                                <input
                                    type="text"
                                    name={`${item.lang}Category`}
                                    defaultValue={item.data?.categoryName || ''}
                                    placeholder="Naziv kategorije (za prikaz)..."
                                    className="w-full px-5 py-3 rounded-xl border border-brand-secondary/10 bg-white/5 text-brand-accent text-xs font-bold placeholder-white/20 outline-none focus:ring-1 focus:ring-brand-secondary/40 focus:bg-white/10 transition-all"
                                    required={item.required}
                                />
                                <textarea
                                    name={`${item.lang}Description`}
                                    defaultValue={item.data?.description || ''}
                                    placeholder="Ispričajte priču koja stoji iza ove kreacije..."
                                    rows={4}
                                    className="w-full px-5 py-3 rounded-xl border border-brand-secondary/10 bg-white/5 text-brand-accent text-xs placeholder-white/20 outline-none focus:ring-1 focus:ring-brand-secondary/40 focus:bg-white/10 transition-all resize-none leading-relaxed"
                                    required={item.required}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sticky Actions Bar */}
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-8 z-50">
                <div className="glass-dark rounded-full p-4 border border-brand-secondary/30 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] flex items-center justify-between gap-6 backdrop-blur-2xl">
                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => window.history.back()}
                        className="px-10 py-4 rounded-full text-[10px] font-black text-brand-secondary/60 uppercase tracking-widest hover:text-brand-secondary hover:bg-brand-secondary/5 transition-all disabled:opacity-30"
                    >
                        Odustani
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-12 py-4 bg-brand-secondary text-brand-dark rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_0_40px_rgba(197,160,89,0.3)] hover:shadow-brand-secondary/40 transition-all duration-500 overflow-hidden relative group active:scale-[0.98] disabled:opacity-50"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Čuvanje...
                                </>
                            ) : (
                                pieceId ? 'Ažuriraj rad' : 'Sačuvaj rad'
                            )}
                        </span>
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
                    </button>
                </div>
            </div>
        </form>
    );
}
