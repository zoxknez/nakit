'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/Container';

export function Footer({ locale }: { locale: string }) {
    const t = useTranslations('footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-brand-dark text-brand-accent border-t-2 border-brand-secondary/30 leather-texture overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-brand-primary/40 to-transparent" />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl animate-float" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
            </div>

            <Container className="relative z-10">
                {/* Main Footer Content */}
                <div className="grid md:grid-cols-3 gap-12 py-16 border-b border-brand-secondary/20">

                    {/* Column 1 - Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-brand-secondary/20 rounded-full blur-xl group-hover:bg-brand-secondary/40 transition-all duration-500" />
                                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-secondary/30 shadow-2xl p-0.5 bg-brand-dark transition-transform duration-500 group-hover:scale-105">
                                    <Image
                                        src="/images/logo.webp"
                                        alt="Njata Shiz Logo"
                                        fill
                                        className="object-cover"
                                        sizes="80px"
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-serif text-3xl font-bold text-brand-secondary tracking-tight">
                                    Njata Shiz
                                </h3>
                                <p className="text-[10px] text-brand-secondary/60 tracking-[0.3em] uppercase font-bold">Leather Artisan</p>
                            </div>
                        </div>
                        <p className="text-base text-brand-accent/70 leading-relaxed font-serif italic max-w-xs">
                            {t('handmade')}
                        </p>
                        <div className="flex items-center gap-3 text-sm group">
                            <div className="w-8 h-8 rounded-full bg-brand-secondary/10 flex items-center justify-center border border-brand-secondary/20 group-hover:border-brand-secondary/50 transition-colors">
                                <svg className="w-4 h-4 text-brand-secondary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-brand-accent/60 group-hover:text-brand-secondary transition-colors">{t('location')}</span>
                        </div>
                    </div>

                    {/* Column 2 - Quick Links */}
                    <div className="space-y-8">
                        <h4 className="font-serif text-xl font-bold text-brand-secondary uppercase tracking-[0.2em] flex items-center gap-3">
                            <div className="w-10 h-px bg-gradient-to-r from-brand-secondary to-transparent"></div>
                            {locale === 'sr' ? 'Navigacija' : locale === 'ru' ? 'Навигация' : 'Navigation'}
                        </h4>
                        <nav className="space-y-4">
                            {[
                                { href: `/${locale}`, label: locale === 'sr' ? 'Početna' : locale === 'ru' ? 'Главная' : 'Home' },
                                { href: `/${locale}/gallery`, label: locale === 'sr' ? 'Galerija' : locale === 'ru' ? 'Галерея' : 'Gallery' },
                                { href: `/${locale}#about`, label: locale === 'sr' ? 'O Meni' : locale === 'ru' ? 'Обо мне' : 'About' }
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block text-brand-accent/70 hover:text-brand-secondary transition-all duration-300 hover:translate-x-2 text-sm group"
                                >
                                    <span className="inline-flex items-center gap-3">
                                        <span className="w-1.5 h-[1px] bg-brand-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                                        <span className="font-serif italic tracking-wide">{link.label}</span>
                                    </span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Column 3 - Connect */}
                    <div className="space-y-8">
                        <h4 className="font-serif text-xl font-bold text-brand-secondary uppercase tracking-[0.2em] flex items-center gap-3">
                            <div className="w-10 h-px bg-gradient-to-r from-brand-secondary to-transparent"></div>
                            {locale === 'sr' ? 'Povežite Se' : locale === 'ru' ? 'Связаться' : 'Connect'}
                        </h4>
                        <p className="text-sm text-brand-accent/60 leading-relaxed max-w-xs font-serif italic text-balance">
                            {locale === 'sr'
                                ? 'Pratite me na društvenim mrežama za najnovije kreacije'
                                : locale === 'ru'
                                    ? 'Следите за мной в соцсетях для последних творений'
                                    : 'Follow me on social media for latest creations'}
                        </p>
                        <div className="flex gap-5">
                            <a
                                href="https://www.instagram.com/njatashiz/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-12 h-12 rounded-xl border border-brand-secondary/30 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-1"
                                aria-label="Instagram"
                            >
                                <div className="absolute inset-0 bg-brand-secondary opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
                                <div className="absolute inset-0 border border-brand-secondary opacity-0 group-hover:opacity-100 rounded-xl blur-sm transition-opacity" />
                                <svg className="w-6 h-6 text-brand-secondary/60 group-hover:text-brand-secondary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.facebook.com/Njata-Shiz-Handmade-100063529341405/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-12 h-12 rounded-xl border border-brand-secondary/30 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-1"
                                aria-label="Facebook"
                            >
                                <div className="absolute inset-0 bg-brand-secondary opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
                                <div className="absolute inset-0 border border-brand-secondary opacity-0 group-hover:opacity-100 rounded-xl blur-sm transition-opacity" />
                                <svg className="w-6 h-6 text-brand-secondary/60 group-hover:text-brand-secondary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-brand-accent/50 font-serif italic tracking-wide">© {currentYear} Njata Shiz</p>
                        <span className="hidden md:inline w-1 h-1 bg-brand-secondary/30 rounded-full"></span>
                        <p className="flex items-center gap-2 group">
                            <span className="text-brand-accent/50 font-serif italic">{locale === 'sr' ? 'Ručno sa' : locale === 'ru' ? 'Вручную с' : 'Handmade with'}</span>
                            <span className="text-brand-secondary animate-pulse scale-125 group-hover:scale-150 transition-transform">❤️</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-brand-secondary/40 font-bold">
                            {locale === 'sr' ? 'Sva prava zadržana' : locale === 'ru' ? 'Все права защищены' : 'All rights reserved'}
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
