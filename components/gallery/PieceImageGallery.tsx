'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PieceImageGalleryProps {
    images: string[];
    title: string;
}

export function PieceImageGallery({ images, title }: PieceImageGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="aspect-square bg-brand-dark/40 rounded-2xl flex items-center justify-center border border-brand-secondary/20">
                <span className="text-brand-secondary/40 font-serif">No images available</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Main Image Container */}
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-brand-secondary/20 leather-texture group bg-brand-dark/20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={images[activeIndex]}
                            alt={`${title} - Image ${activeIndex + 1}`}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />

                        {/* Dramatic Lighting Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/40 via-transparent to-white/5 pointer-events-none" />
                    </motion.div>
                </AnimatePresence>

                {/* Decorative High-End Accents */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-brand-secondary/30 opacity-60 pointer-events-none group-hover:w-full group-hover:h-full group-hover:opacity-10 transition-all duration-700" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-brand-secondary/30 opacity-60 pointer-events-none group-hover:w-full group-hover:h-full group-hover:opacity-10 transition-all duration-700" />

                {/* Image Counter Badge (Premium Style) */}
                {images.length > 1 && (
                    <div className="absolute bottom-6 right-6 px-4 py-2 bg-brand-dark/60 backdrop-blur-xl border border-brand-secondary/30 rounded-full text-brand-secondary text-xs font-bold tracking-[0.2em] shadow-2xl z-20">
                        {activeIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
                <div className="flex flex-wrap gap-4 pt-2">
                    {images.map((url, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={cn(
                                "relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden transition-all duration-500 border-2",
                                activeIndex === index
                                    ? "border-brand-secondary shadow-[0_0_15px_rgba(197,160,89,0.3)] scale-105"
                                    : "border-brand-secondary/20 opacity-60 hover:opacity-100 hover:border-brand-secondary/50 grayscale-[40%] hover:grayscale-0"
                            )}
                        >
                            <Image
                                src={url}
                                alt={`${title} thumb ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="96px"
                            />
                            {activeIndex === index && (
                                <motion.div
                                    layoutId="active-thumb"
                                    className="absolute inset-0 bg-brand-secondary/10"
                                />
                            )}

                            {/* Inner Shine for active thumb */}
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transition-opacity duration-500",
                                activeIndex === index ? "opacity-100" : "opacity-0"
                            )} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
