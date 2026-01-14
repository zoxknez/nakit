'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export function Header({ locale }: { locale: string }) {
    const t = useTranslations('nav');
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isAtTop, setIsAtTop] = useState(true);

    const localeNames = { sr: 'SR', ru: 'РУ', en: 'EN' };
    const otherLocales = ['sr', 'ru', 'en'].filter((l) => l !== locale);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Check if at top
            setIsAtTop(currentScrollY < 10);

            if (currentScrollY < 100) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <AnimatePresence>
            <motion.header
                initial={{ y: 0 }}
                animate={{
                    y: isVisible ? 0 : -100,
                    backgroundColor: isAtTop ? 'rgba(10, 5, 5, 0.4)' : 'rgba(10, 5, 5, 0.8)',
                    backdropFilter: isAtTop ? 'blur(8px)' : 'blur(16px)',
                    borderBottomColor: isAtTop ? 'rgba(197, 160, 89, 0.1)' : 'rgba(197, 160, 89, 0.2)',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-500"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">

                        {/* Logo */}
                        <Link href={`/${locale}`} className="flex items-center gap-4 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-brand-secondary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative w-14 h-14 bg-brand-dark/60 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden border border-brand-secondary/20 group-hover:border-brand-secondary/40">
                                    <Image
                                        src="/images/logo.webp"
                                        alt="Njata Logo"
                                        fill
                                        className="object-cover transform scale-120 group-hover:scale-130 transition-transform duration-500"
                                        sizes="56px"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-serif font-bold text-brand-secondary tracking-tight group-hover:text-brand-accent transition-colors duration-300">
                                    Njata Shiz
                                </span>
                                <span className="text-[10px] font-medium text-brand-accent/40 tracking-[0.3em] uppercase transition-colors duration-300 group-hover:text-brand-secondary/60">
                                    Handcrafted Leather
                                </span>
                            </div>
                        </Link>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-10">
                            {[
                                { href: `/${locale}`, label: t('home'), active: true },
                                { href: `/${locale}/gallery`, label: t('gallery'), active: false },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative text-sm tracking-widest uppercase py-2 group transition-all duration-300 ${item.active ? 'font-bold text-brand-secondary' : 'font-medium text-brand-accent/70 hover:text-brand-secondary'
                                        }`}
                                >
                                    {item.label}
                                    <span className={`absolute bottom-0 left-0 w-full h-px bg-brand-secondary transform origin-left transition-transform duration-500 ${item.active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`} />
                                </Link>
                            ))}

                            {/* Language Switcher */}
                            <div className="flex items-center gap-3 pl-8 ml-4 border-l border-brand-secondary/20">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-brand-dark px-2 py-1 rounded bg-brand-secondary shadow-lg shadow-brand-secondary/20">
                                        {localeNames[locale as keyof typeof localeNames]}
                                    </span>
                                    <div className="flex gap-2">
                                        {otherLocales.map((l: string) => (
                                            <Link
                                                key={l}
                                                href={`/${l}`}
                                                className="text-[10px] font-bold text-brand-accent/40 hover:text-brand-secondary transition-all hover:scale-110"
                                            >
                                                {localeNames[l as keyof typeof localeNames]}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </nav>

                        {/* Mobile Menu Button - Minimalist */}
                        <div className="md:hidden">
                            <button className="flex flex-col gap-1.5 p-2 group">
                                <div className="w-6 h-[1px] bg-brand-secondary group-hover:w-8 transition-all"></div>
                                <div className="w-8 h-[1px] bg-brand-secondary"></div>
                                <div className="w-4 h-[1px] bg-brand-secondary group-hover:w-8 transition-all"></div>
                            </button>
                        </div>

                    </div>
                </div>
            </motion.header>
        </AnimatePresence>
    );
}
