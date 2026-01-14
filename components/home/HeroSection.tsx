'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function HeroSection({ locale }: { locale: string }) {
    const t = useTranslations('hero');

    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.8,
            },
        }),
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.5 }
        },
    };

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">

            {/* 1. Dramatic Background Image with subtle Parallax */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1.25 }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                className="absolute inset-0 z-0 select-none overflow-hidden"
            >
                <div className="absolute inset-0">
                    <Image
                        src="/images/ispodportfolija.jpeg"
                        alt="Luxury Leather Background"
                        fill
                        priority
                        className="object-cover object-[center_30%] opacity-40 mix-blend-overlay"
                        sizes="100vw"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-purple-900/20 to-brand-dark" />
            </motion.div>

            <Container className="relative z-10 text-center h-full flex flex-col items-center justify-center pt-20">

                {/* Badge - Premium Refined */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="mb-10 inline-flex items-center gap-3 px-8 py-2.5 rounded-full border border-brand-secondary/40 bg-brand-secondary/5 backdrop-blur-xl shadow-[0_0_20px_rgba(197,160,89,0.1)]"
                >
                    <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse shadow-[0_0_10px_#c5a059]" />
                    <span className="text-xs md:text-sm font-bold text-brand-secondary uppercase tracking-[0.3em] drop-shadow-sm">
                        Handmade in Belgrade
                    </span>
                </motion.div>

                {/* Main Title - PREMIUM LOGO STYLED (ENLARGED + EFFECTS) */}
                <div className="relative mb-0 text-center scale-110 md:scale-100">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: [0, -15, 0],
                        }}
                        transition={{
                            opacity: { duration: 1.5 },
                            y: {
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className="relative w-[340px] md:w-[680px] lg:w-[1000px] h-[170px] md:h-[340px] lg:h-[500px] mx-auto bg-gradient-to-r from-[#ffd700] via-[#fff5a5] to-[#c5a059] bg-[length:200%_auto]"
                        style={{
                            maskImage: 'url(/images/njata-title.png)',
                            WebkitMaskImage: 'url(/images/njata-title.png)',
                            maskSize: 'contain',
                            WebkitMaskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            WebkitMaskRepeat: 'no-repeat',
                            maskPosition: 'center',
                            WebkitMaskPosition: 'center',
                            animation: 'gradient-shift 8s linear infinite',
                            filter: 'drop-shadow(0 0 20px rgba(197, 160, 89, 0.4)) drop-shadow(0 20px 40px rgba(0,0,0,0.7))',
                        }}
                    >
                        <span className="sr-only">Njata</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 0.6, width: '45%' }}
                        transition={{ duration: 2, delay: 1 }}
                        className="h-[2px] bg-gradient-to-r from-transparent via-brand-secondary/40 to-transparent mx-auto -mt-8 md:-mt-12 lg:-mt-16 blur-[1px]"
                    />
                </div>

                {/* Subtitle - Cinematic Refined */}
                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="text-2xl md:text-3xl text-brand-accent/80 font-serif italic max-w-4xl mx-auto mb-10 tracking-widest leading-relaxed drop-shadow-lg"
                >
                    {t('subtitle')}
                </motion.p>

                {/* Buttons - Extreme Luxury */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row gap-8 items-center"
                >
                    <Link href={`/${locale}/gallery`} passHref>
                        <Button size="lg" className="group relative bg-brand-dark/80 text-brand-secondary font-black uppercase tracking-[0.2em] border-2 border-brand-secondary/50 overflow-hidden min-w-[260px] h-16 hover:border-brand-secondary transition-all duration-500 shadow-2xl">
                            <span className="absolute inset-0 bg-brand-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            <span className="relative flex items-center justify-center gap-3">
                                {locale === 'sr' ? 'Istraži Kolekciju' : locale === 'ru' ? 'Коллекция' : 'Explore Collection'}
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse group-hover:scale-150 transition-transform" />
                            </span>
                        </Button>
                    </Link>

                    <Link href={`/${locale}#about`} passHref>
                        <Button variant="ghost" size="lg" className="text-brand-accent/60 hover:text-brand-secondary tracking-[0.3em] font-bold uppercase transition-all duration-300 group">
                            {locale === 'sr' ? 'Naša Priča' : locale === 'ru' ? 'Наша История' : 'Our Story'}
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-px bg-brand-secondary" />
                        </Button>
                    </Link>
                </motion.div>

            </Container>

            {/* Premium Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer"
            >
                <div className="relative">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-brand-secondary/60 group-hover:text-brand-secondary transition-colors duration-300">Scroll</span>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-px bg-brand-secondary/20 group-hover:w-full transition-all duration-500" />
                </div>
                <div className="relative w-px h-16 bg-gradient-to-b from-brand-secondary/40 via-brand-secondary to-transparent group-hover:h-24 transition-all duration-700" />
            </motion.div>

        </section>
    );
}
