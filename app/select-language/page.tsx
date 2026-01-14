'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const languages = [
  { code: 'sr', name: 'Srpski', nativeName: 'Српски језик', flag: '🇷🇸' },
  { code: 'ru', name: 'Русский', nativeName: 'Русский язык', flag: '🇷🇺' },
  { code: 'en', name: 'English', nativeName: 'English Language', flag: '🇬🇧' },
];

export default function SelectLanguagePage() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageSelect = (code: string) => {
    setSelectedLang(code);

    // Save locale to cookie
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;

    // Smooth redirect
    setTimeout(() => {
      router.push(`/${code}`);
    }, 400);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-primary to-brand-dark text-brand-accent">
      {/* Leather texture overlay */}
      <div className="absolute inset-0 leather-texture opacity-40 pointer-events-none" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full">
          {/* Logo & Title Section */}
          <div className="text-center mb-16 animate-fadeInUp">
            <div className="inline-block mb-8 relative">
              <div className="absolute inset-0 bg-brand-secondary/30 rounded-full blur-3xl animate-pulse-glow" />
              <div className="relative w-40 h-40 mx-auto bg-brand-dark/40 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl shadow-brand-secondary/20 transform hover:scale-110 transition-transform duration-500 overflow-hidden border border-brand-secondary/30">
                <Image
                  src="/images/logo.webp"
                  alt="Njata Logo"
                  fill
                  className="object-cover p-0 transform scale-120"
                  priority
                  sizes="(max-width: 768px) 100vw, 160px"
                />
              </div>
            </div>

            <h1 className="text-7xl md:text-8xl font-serif font-black mb-4 tracking-tight text-brand-secondary drop-shadow-sm">
              Njata Shiz
            </h1>

            <p className="text-2xl md:text-3xl font-serif font-light text-brand-accent mb-6 tracking-wide drop-shadow-md">
              Handcrafted Leather Jewelry
            </p>

            <div className="inline-block px-8 py-3 bg-brand-dark/50 backdrop-blur-md rounded-full border border-brand-secondary/40 shadow-inner">
              <p className="text-base text-brand-secondary italic font-serif">
                Each piece tells a story of artistry & resilience
              </p>
            </div>
          </div>

          {/* Language Selection */}
          <div className="mb-12 text-center animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-accent mb-4">
              Choose Your Language
            </h2>
            <p className="text-brand-accent/60 text-lg font-serif">
              Выберите язык • Izaberite jezik • Select language
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {languages.map((lang: any, index: number) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                onMouseEnter={() => setHoveredLang(lang.code)}
                onMouseLeave={() => setHoveredLang(null)}
                disabled={selectedLang !== null}
                className={`
                  group relative overflow-hidden
                  bg-brand-dark/30 backdrop-blur-xl
                  rounded-3xl p-10
                  border
                  transition-all duration-500
                  hover-lift
                  animate-fadeInScale
                  ${selectedLang === lang.code
                    ? 'border-brand-secondary scale-105 shadow-[0_0_30px_rgba(197,160,89,0.3)]'
                    : hoveredLang === lang.code
                      ? 'border-brand-secondary/60 shadow-[0_0_20px_rgba(197,160,89,0.15)] bg-brand-dark/40'
                      : 'border-brand-secondary/20 shadow-lg'
                  }
                  ${selectedLang && selectedLang !== lang.code ? 'opacity-40 blur-[2px]' : ''}
                `}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Subtle texture for buttons */}
                <div className="absolute inset-0 leather-texture opacity-20 pointer-events-none" />

                {/* Gold corner accents - more subtle */}
                <div className={`
                  absolute top-4 left-4 w-6 h-6 border-t border-l border-brand-secondary/40
                  transition-all duration-500
                  ${hoveredLang === lang.code || selectedLang === lang.code ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
                `} />
                <div className={`
                  absolute bottom-4 right-4 w-6 h-6 border-b border-r border-brand-secondary/40
                  transition-all duration-500
                  ${hoveredLang === lang.code || selectedLang === lang.code ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
                `} />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`
                    text-7xl mb-6 
                    transition-all duration-500 transform
                    ${hoveredLang === lang.code ? 'scale-110' : 'scale-100'}
                    drop-shadow-xl
                  `}>
                    {lang.flag}
                  </div>

                  <h3 className={`
                    text-3xl font-serif font-bold mb-2 transition-colors duration-300
                    ${hoveredLang === lang.code || selectedLang === lang.code ? 'text-brand-secondary' : 'text-brand-accent'}
                  `}>
                    {lang.name}
                  </h3>

                  <p className="text-sm text-brand-accent/50 mb-6 font-serif uppercase tracking-widest">
                    {lang.nativeName}
                  </p>

                  <div className={`
                    inline-flex items-center gap-2 px-6 py-2 rounded-full font-medium font-serif
                    transition-all duration-300
                    ${selectedLang === lang.code || hoveredLang === lang.code
                      ? 'bg-brand-secondary text-brand-dark shadow-lg shadow-brand-secondary/20'
                      : 'bg-transparent border border-brand-secondary/30 text-brand-accent/70'
                    }
                  `}>
                    {selectedLang === lang.code ? (
                      <>
                        <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        Selected
                      </>
                    ) : (
                      <>
                        <span>Enter</span>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </div>
                </div>

                {/* Shine effect on hover */}
                <div className={`
                  absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent
                  transition-transform duration-1000 transform -translate-x-full group-hover:translate-x-full
                `} />
              </button>
            ))}
          </div>

          {/* Footer tagline */}
          <div className="text-center mt-20 space-y-4 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <p className="text-brand-accent/50 text-base font-serif font-light tracking-widest uppercase">
              Ručno izrađeno sa ljubavlju • Ручная работа с любовью • Handmade with love
            </p>
            <div className="flex items-center justify-center gap-3 text-brand-secondary/80">
              <div className="h-[1px] w-8 bg-brand-secondary/30" />
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-serif tracking-wide">Zemun, Belgrade</span>
              </div>
              <div className="h-[1px] w-8 bg-brand-secondary/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


