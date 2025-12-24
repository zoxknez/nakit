'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';

export function Footer({ locale }: { locale: string }) {
    const t = useTranslations('footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-dark text-white py-16 border-t border-brand-secondary/20">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* Logo/Brand */}
                    <div className="text-center md:text-left">
                        <h3 className="font-serif text-2xl font-bold tracking-wider text-brand-accent mb-2">NJATA</h3>
                        <p className="text-white/60 text-sm max-w-xs">{t('handmade')}</p>
                    </div>

                    {/* Links */}
                    <nav className="flex gap-8 text-sm font-medium tracking-wide">
                        <Link href={`/${locale}`} className="hover:text-brand-secondary transition-colors">
                            {locale === 'sr' ? 'Početna' : locale === 'ru' ? 'Главная' : 'Home'}
                        </Link>
                        <Link href={`/${locale}/gallery`} className="hover:text-brand-secondary transition-colors">
                            {locale === 'sr' ? 'Galerija' : locale === 'ru' ? 'Галерея' : 'Gallery'}
                        </Link>
                        {/* Social links could go here */}
                    </nav>

                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
                    <p>© {currentYear} Njata Shiz Nakit. All rights reserved.</p>
                    <p>{t('location')}</p>
                </div>
            </Container>
        </footer>
    );
}
