'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function CTASection({ locale }: { locale: string }) {
    const t = useTranslations('hero'); // borrowing translations for now 

    return (
        <Section className="bg-brand-primary text-white text-center">
            <Container>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif">
                        {locale === 'sr' ? 'Istražite Kolekciju' : locale === 'ru' ? 'Исследуйте Коллекцию' : 'Explore the Collection'}
                    </h2>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                        {locale === 'sr'
                            ? 'Otkrijte jedinstvene komade nakita koji spajaju tradicionalnu izradu sa modernim dizajnom'
                            : locale === 'ru'
                                ? 'Откройте для себя уникальные украшения, сочетающие традиционное мастерство с современным дизайном'
                                : 'Discover unique jewelry pieces that blend traditional craftsmanship with modern design'}
                    </p>
                    <div className="pt-4">
                        <Button size="lg" variant="secondary" onClick={() => window.location.href = `/${locale}/gallery`}>
                            {locale === 'sr' ? 'Pogledaj Sve' : locale === 'ru' ? 'Посмотреть Все' : 'View All'}
                        </Button>
                    </div>
                </motion.div>
            </Container>
        </Section>
    );
}
