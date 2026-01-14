'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function CTASection({ locale }: { locale: string }) {
    const t = useTranslations('hero');

    return (
        <Section className="relative overflow-hidden leather-texture bg-gradient-to-br from-brand-dark via-brand-primary/40 to-brand-dark text-white text-center py-24 md:py-32">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-10 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
            </div>

            {/* Decorative Lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-secondary to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-secondary to-transparent opacity-50" />

            <Container className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-10"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-secondary/10 border border-brand-secondary/30 backdrop-blur-sm">
                        <svg className="w-4 h-4 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-semibold text-brand-secondary uppercase tracking-widest">
                            {locale === 'sr' ? 'Ekskluzivna Kolekcija' : locale === 'ru' ? 'Эксклюзивная Коллекция' : 'Exclusive Collection'}
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-brand-secondary leading-tight">
                        {locale === 'sr' ? 'Istražite Kolekciju' : locale === 'ru' ? 'Исследуйте Коллекцию' : 'Explore the Collection'}
                    </h2>

                    <div className="w-32 h-1 bg-brand-secondary mx-auto rounded-full" />

                    <p className="text-xl md:text-2xl text-brand-accent/90 max-w-3xl mx-auto font-serif leading-relaxed">
                        {locale === 'sr'
                            ? 'Otkrijte jedinstvene komade nakita koji spajaju tradicionalnu izradu sa modernim dizajnom'
                            : locale === 'ru'
                                ? 'Откройте для себя уникальные украшения, сочетающие традиционное мастерство с современным дизайном'
                                : 'Discover unique jewelry pieces that blend traditional craftsmanship with modern design'}
                    </p>

                    <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.a
                            href={`/${locale}/gallery`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-10 py-4 bg-brand-secondary text-brand-dark rounded-full font-bold text-lg uppercase tracking-wider overflow-hidden shadow-2xl hover:shadow-brand-secondary/50 transition-all duration-500"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                {locale === 'sr' ? 'Pogledaj Sve' : locale === 'ru' ? 'Посмотреть Все' : 'View All'}
                                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </motion.a>

                        <motion.a
                            href={`/${locale}#about`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 bg-transparent border-2 border-brand-secondary text-brand-secondary rounded-full font-bold text-lg uppercase tracking-wider hover:bg-brand-secondary hover:text-brand-dark transition-all duration-300 shadow-xl"
                        >
                            {locale === 'sr' ? 'O Nama' : locale === 'ru' ? 'О Нас' : 'About Us'}
                        </motion.a>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}
