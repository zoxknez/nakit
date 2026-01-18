'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

export function PromotionBanner() {
    return (
        <section className="relative py-12 md:py-20 bg-transparent overflow-hidden">
            {/* Background Decorative Blobs - Very Subtle */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-brand-secondary/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-brand-primary/5 blur-[120px] rounded-full animate-float" />
            </div>

            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative group "
                >
                    {/* Minimalist Border & Glass Backdrop */}
                    <div className="absolute inset-0 bg-brand-dark/20 backdrop-blur-[2px] rounded-[3rem] border border-brand-secondary/10 transition-all duration-700 group-hover:border-brand-secondary/30 group-hover:bg-brand-dark/30 shadow-[0_0_50px_rgba(0,0,0,0.2)]" />

                    {/* Content Container */}
                    <div className="relative px-6 py-12 md:py-16 text-center">
                        <div className="max-w-3xl mx-auto space-y-8">

                            {/* Discrete Badge */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="inline-flex items-center gap-2.5"
                            >
                                <span className="w-8 h-px bg-brand-secondary/30" />
                                <span className="text-[10px] font-bold text-brand-secondary/70 uppercase tracking-[0.4em]">
                                    Specijalna Ponuda
                                </span>
                                <span className="w-8 h-px bg-brand-secondary/30" />
                            </motion.div>

                            {/* Refined Typography */}
                            <h3 className="text-3xl md:text-5xl font-serif text-brand-accent tracking-wide">
                                <span className="text-brand-secondary drop-shadow-sm font-bold">Narukvica</span>
                                <span className="mx-4 text-brand-secondary/40 font-light">+</span>
                                <span className="text-brand-secondary drop-shadow-sm font-bold">Ogrlica</span>
                                <span className="block mt-4 text-xl md:text-2xl font-serif italic text-brand-accent/60 tracking-widest lowercase">
                                    u kompletu
                                </span>
                            </h3>

                            {/* Elegant Price Display */}
                            <div className="flex flex-col items-center gap-4 pt-4">
                                <div className="relative py-2 px-8 overflow-hidden rounded-full transition-transform duration-500 group-hover:scale-110">
                                    <div className="absolute inset-0 bg-brand-secondary/10 group-hover:bg-brand-secondary/20 transition-colors" />
                                    <div className="relative flex items-baseline gap-2">
                                        <span className="text-4xl md:text-5xl font-black text-brand-secondary tracking-tighter">5000</span>
                                        <span className="text-[10px] md:text-xs font-bold text-brand-secondary/80 uppercase tracking-[0.2em]">rsd</span>
                                    </div>
                                </div>
                                <div className="h-px w-24 bg-gradient-to-r from-transparent via-brand-secondary/20 to-transparent" />
                            </div>

                            {/* Subtle Tagline */}
                            <p className="text-[9px] md:text-[10px] text-brand-accent/30 font-bold uppercase tracking-[0.5em] pt-4 italic">
                                Umetnost spojena u savršen par
                            </p>
                        </div>
                    </div>

                    {/* Decorative Corner Glints */}
                    <div className="absolute top-10 left-10 w-px h-10 bg-gradient-to-b from-brand-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="absolute bottom-10 right-10 w-px h-10 bg-gradient-to-t from-brand-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </motion.div>
            </Container>
        </section>
    );
}
