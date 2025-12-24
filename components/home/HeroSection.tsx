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

            {/* 1. Dramatic Background Image */}
            <div className="absolute inset-0 z-0 select-none overflow-hidden">
                <div className="absolute inset-0 scale-125">
                    <Image
                        src="/images/ispodportfolija.jpeg"
                        alt="Luxury Leather Background"
                        fill
                        priority
                        className="object-cover object-[center_30%] opacity-50 mix-blend-overlay" // Zoomed in to show jewelry, centered on upper body
                        sizes="100vw"
                    />
                </div>
                {/* Adjusted Vignette Overlay to make text pop while keeping image visible */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-brand-dark/30 to-black/70" />
            </div>

            <Container className="relative z-10 text-center h-full flex flex-col items-center justify-center pt-20">

                {/* Badge */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="mb-12 inline-flex items-center gap-3 px-6 py-2 rounded-full border border-brand-secondary/30 bg-black/40 backdrop-blur-md"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary shadow-[0_0_10px_#c5a059]" />
                    <span className="text-xs md:text-sm font-medium text-brand-secondary uppercase tracking-[0.2em]">
                        Handmade in Belgrade
                    </span>
                </motion.div>

                {/* Main Title - GOLDEN PERFECT */}
                <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-sans font-black mb-8 leading-[0.9]">
                    <span className="sr-only">Njata</span>
                    <div className="flex justify-center items-baseline">
                        {/* N and j as separate but close */}
                        <motion.span
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={titleVariants}
                            className="inline-block hover:-translate-y-4 transition-transform duration-500 cursor-default leading-none"
                            style={{
                                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #c5a059 50%, #8b6914 75%, #ffd700 100%)',
                                backgroundSize: '200% 200%',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: 'drop-shadow(0 6px 20px rgba(255, 215, 0, 0.4)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8))',
                                textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                                animation: 'gradient-shift 4s ease infinite'
                            }}
                        >
                            N
                        </motion.span>
                        <motion.span
                            custom={0.1}
                            initial="hidden"
                            animate="visible"
                            variants={titleVariants}
                            className="inline-block hover:-translate-y-4 transition-transform duration-500 cursor-default leading-none ml-1 md:ml-2 lg:ml-3"
                            style={{
                                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #c5a059 50%, #8b6914 75%, #ffd700 100%)',
                                backgroundSize: '200% 200%',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: 'drop-shadow(0 6px 20px rgba(255, 215, 0, 0.4)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8))',
                                textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                                animation: 'gradient-shift 4s ease infinite',
                                fontSize: '1em'
                            }}
                        >
                            j
                        </motion.span>
                        {/* Rest of letters with proper spacing */}
                        {['a', 't', 'a'].map((char, i) => (
                            <motion.span
                                key={i}
                                custom={i + 1}
                                initial="hidden"
                                animate="visible"
                                variants={titleVariants}
                                className="inline-block hover:-translate-y-4 transition-transform duration-500 cursor-default ml-4 md:ml-6 lg:ml-8 leading-none"
                                style={{
                                    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #c5a059 50%, #8b6914 75%, #ffd700 100%)',
                                    backgroundSize: '200% 200%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    filter: 'drop-shadow(0 6px 20px rgba(255, 215, 0, 0.4)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.8))',
                                    textShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                                    animation: 'gradient-shift 4s ease infinite'
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                </h1>

                {/* Subtitle - Elegant Serif */}
                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="text-3xl md:text-5xl text-brand-secondary font-serif italic max-w-3xl mx-auto mb-8 leading-normal drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] [text-shadow:_0_2px_4px_rgba(0,0,0,0.8)]"
                >
                    {t('subtitle')}
                </motion.p>

                {/* Description - Clean Sans */}
                <motion.p
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="text-base md:text-lg text-white/90 max-w-lg mx-auto mb-14 font-sans tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] [text-shadow:_0_1px_2px_rgba(0,0,0,0.7)]"
                >
                    {t('description')}
                </motion.p>

                {/* Buttons - Premium */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row gap-6 items-center"
                >
                    <Link href={`/${locale}/gallery`} passHref>
                        <Button size="lg" className="bg-gradient-to-r from-brand-secondary to-[#d4af66] text-black font-bold uppercase tracking-wider hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] border border-white/20 min-w-[200px]">
                            {locale === 'sr' ? 'Istraži Kolekciju' : locale === 'ru' ? 'Коллекция' : 'Explore Collection'}
                        </Button>
                    </Link>

                    <Link href={`/${locale}#about`} passHref>
                        <Button variant="ghost" size="lg" className="text-white hover:text-brand-secondary underline-offset-8 border-b border-transparent hover:border-brand-secondary rounded-none px-0">
                            {locale === 'sr' ? 'Naša Priča' : locale === 'ru' ? 'Наша История' : 'Our Story'}
                        </Button>
                    </Link>
                </motion.div>

            </Container>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
            >
                <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
                <div className="w-px h-12 bg-linear-to-b from-brand-secondary to-transparent" />
            </motion.div>

        </section>
    );
}
