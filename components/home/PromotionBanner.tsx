'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

export function PromotionBanner() {
    return (
        <section className="relative py-12 bg-brand-dark overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-32 bg-brand-secondary/5 blur-[100px]" />
                <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-32 bg-brand-secondary/5 blur-[100px]" />
            </div>

            <Container>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative group cursor-default"
                >
                    {/* Glassmorphism Background */}
                    <div className="absolute inset-0 bg-brand-secondary/5 backdrop-blur-md rounded-[2.5rem] border border-brand-secondary/20 shadow-2xl transition-all duration-500 group-hover:bg-brand-secondary/10 group-hover:border-brand-secondary/40" />

                    <div className="relative px-8 py-10 md:py-14 text-center">
                        {/* Animated Glow Line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-brand-secondary to-transparent" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-brand-secondary to-transparent" />

                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-secondary/10 border border-brand-secondary/20"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
                                <span className="text-[10px] md:text-xs font-black text-brand-secondary uppercase tracking-[0.3em]">
                                    Specijalna Ponuda
                                </span>
                            </motion.div>

                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-brand-accent tracking-wide leading-tight">
                                <span className="text-brand-secondary">Narukvica</span> + <span className="text-brand-secondary">Ogrlica</span>
                                <span className="block mt-2 lg:inline lg:mt-0 font-serif italic text-2xl md:text-3xl lg:text-4xl opacity-80 lg:ml-4">
                                    u kompletu
                                </span>
                            </h3>

                            <div className="flex items-center justify-center gap-6 pt-4">
                                <div className="h-px w-8 md:w-16 bg-brand-secondary/30" />
                                <div className="px-8 py-4 bg-brand-secondary text-brand-dark rounded-2xl shadow-[0_0_30px_rgba(197,160,89,0.2)] hover:shadow-brand-secondary/40 transition-all duration-500 transform group-hover:scale-105">
                                    <span className="text-2xl md:text-4xl font-black tracking-tighter">5000</span>
                                    <span className="text-sm md:text-lg font-bold uppercase ml-2 tracking-widest">rsd</span>
                                </div>
                                <div className="h-px w-8 md:w-16 bg-brand-secondary/30" />
                            </div>

                            <p className="text-[10px] md:text-sm text-brand-accent/40 font-bold uppercase tracking-[0.4em] pt-6">
                                Umetnost spojena u savršen par
                            </p>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
