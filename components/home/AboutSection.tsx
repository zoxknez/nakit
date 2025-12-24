'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Palette, Hammer, Gem, Clock } from 'lucide-react';

export function AboutSection({ locale }: { locale: string }) {
    const t = useTranslations('about');

    const features = [
        {
            icon: Clock,
            text: locale === 'sr' ? '~3 dana za jedan komad' : locale === 'ru' ? '~3 дня на одно изделие' : '~3 days per piece',
            description: locale === 'sr' ? 'Posvećenost detaljima' : locale === 'ru' ? 'Внимание к деталям' : 'Dedication to details'
        },
        {
            icon: Hammer,
            text: locale === 'sr' ? '100% ručno izrađeno' : locale === 'ru' ? '100% ручная работа' : '100% handmade',
            description: locale === 'sr' ? 'Tradicionalne tehnike' : locale === 'ru' ? 'Традиционные техники' : 'Traditional techniques'
        },
        {
            icon: Palette,
            text: locale === 'sr' ? 'Boje za kožu + fiksator' : locale === 'ru' ? 'Краски для кожи + фиксатор' : 'Leather paints + fixative',
            description: locale === 'sr' ? 'Visokokvalitetni materijali' : locale === 'ru' ? 'Высококачественные материалы' : 'High quality materials'
        },
        {
            icon: Gem,
            text: locale === 'sr' ? 'Svaki komad je unikat' : locale === 'ru' ? 'Каждое изделие уникально' : 'Each piece is unique',
            description: locale === 'sr' ? 'Originalan dizajn' : locale === 'ru' ? 'Оригинальный дизайн' : 'Original design'
        },
    ];

    return (
        <Section id="about" className="bg-brand-dark text-brand-accent relative pattern-grid-lg">
            {/* Dark Overlay just in case */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            <Container className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-px flex-1 bg-brand-secondary" />
                            <span className="text-brand-secondary uppercase tracking-widest text-sm font-bold">Est. 2025</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-secondary leading-none drop-shadow-md">
                            {/* Force Gold Color */}
                            {t('title')}
                        </h2>

                        <div className="prose prose-lg text-brand-accent/90 font-sans leading-relaxed tracking-wide">
                            <p className="text-xl font-medium">{t('intro')}</p>
                            <p>{t('brand')}</p>
                        </div>

                        {/* Personal Quote Card */}
                        <div className="relative p-8 mt-8 border border-brand-secondary/30 bg-black/40 backdrop-blur-sm text-brand-accent rounded-tr-[3rem] rounded-bl-[3rem] shadow-2xl">
                            <div className="absolute -top-6 -left-2 text-6xl text-brand-secondary font-serif">"</div>
                            <p className="font-serif italic text-xl md:text-2xl relative z-10 leading-relaxed text-brand-secondary/90">
                                {locale === 'sr'
                                    ? 'Svaki komad nakita nastaje iz ljubavi prema koži i želji da stvorim nešto što će vas činiti posebnim.'
                                    : locale === 'ru'
                                        ? 'Каждое украшение создается из любви к коже и желания создать что-то, что сделает вас особенными.'
                                        : 'Each piece of jewelry is born from love of leather and desire to create something that makes you special.'}
                            </p>
                            <div className="mt-6 flex items-center gap-4">
                                <div className="w-12 h-px bg-brand-secondary/50" />
                                <span className="font-bold text-brand-secondary uppercase tracking-widest text-sm">Njata Shiz</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual/Process Content */}
                    <div className="relative space-y-8">

                        {/* 1. Image Card - ADJUSTED FOR VISIBILITY */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-brand-secondary/20 group"
                        >
                            <Image
                                src="/images/ispodportfolija.jpeg"
                                alt="Author wearing leather jewelry"
                                fill
                                className="object-contain group-hover:scale-105 transition-transform duration-1000"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />

                            {/* Subtle Gradient only at the very bottom, not obscuring jewelry */}
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

                            {/* Minimal Label - Moved to not cover jewelry */}
                            <div className="absolute bottom-4 right-4 text-right">
                                <span className="inline-block px-3 py-1 bg-brand-secondary/90 text-brand-dark text-[10px] font-bold uppercase tracking-widest mb-1 rounded-sm">
                                    Atelier
                                </span>
                            </div>
                        </motion.div>

                        {/* 2. Process Card - Dark & Gold */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-black/40 backdrop-blur-md border border-brand-secondary/30 p-8 rounded-2xl shadow-xl relative overflow-hidden"
                        >
                            <h3 className="text-2xl font-serif mb-6 text-brand-secondary border-b border-brand-secondary/20 pb-4">
                                {locale === 'sr' ? 'Proces Izrade' : locale === 'ru' ? 'Процесс Изготовления' : 'Creation Process'}
                            </h3>

                            <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                                {features.map((feature, i) => (
                                    <div key={i} className="flex gap-4 items-start group/item">
                                        <div className="p-2 border border-brand-secondary/30 rounded-full text-brand-secondary group-hover/item:bg-brand-secondary group-hover/item:text-brand-dark transition-all duration-300">
                                            <feature.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-secondary text-sm">{feature.text}</h4>
                                            <p className="text-brand-accent/60 text-xs mt-1 leading-snug">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>

                </div>
            </Container>
        </Section>
    );
}
