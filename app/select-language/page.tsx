'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const languages = [
  { code: 'sr', name: 'Srpski', nativeName: 'Српски језик', flag: '🇷🇸' },
  { code: 'ru', name: 'Русский', nativeName: 'Русский язык', flag: '🇷🇺' },
  { code: 'en', name: 'English', nativeName: 'English Language', flag: '🇬🇧' },
];

export default function SelectLanguagePage() {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);

  const handleLanguageSelect = (code: string) => {
    setSelectedLang(code);
    
    // Save locale to cookie
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;
    
    // Smooth redirect
    setTimeout(() => {
      router.push(`/${code}`);
    }, 400);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-primary to-brand-dark">
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
              <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-brand-secondary to-yellow-600 rounded-full flex items-center justify-center shadow-2xl shadow-brand-secondary/40 transform hover:scale-110 transition-transform duration-500">
                <span className="text-brand-dark text-6xl font-bold tracking-tighter">NS</span>
              </div>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-serif font-black mb-4 tracking-tight text-brand-accent">
              Njata Shiz
            </h1>
            
            <p className="text-2xl md:text-3xl font-serif font-light text-brand-secondary mb-3 tracking-wide">
              Handcrafted Leather Jewelry
            </p>
            
            <div className="inline-block px-6 py-2 bg-brand-primary/30 backdrop-blur-sm rounded-full border border-brand-secondary/50">
              <p className="text-sm text-brand-accent/80 italic font-serif">
                Each piece tells a story of artistry & resilience
              </p>
            </div>
          </div>

          {/* Language Selection */}
          <div className="mb-12 text-center animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-accent mb-4">
              Choose Your Language
            </h2>
            <p className="text-brand-accent/70 text-lg font-serif">
              Выберите язык • Izaberite jezik • Select language
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {languages.map((lang: any, index: number) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                onMouseEnter={() => setHoveredLang(lang.code)}
                onMouseLeave={() => setHoveredLang(null)}
                disabled={selectedLang !== null}
                className={`
                  group relative overflow-hidden
                  bg-gradient-to-br from-brand-primary/40 to-brand-dark/60
                  backdrop-blur-xl
                  rounded-3xl p-10
                  border-2
                  transition-all duration-500
                  hover-lift
                  animate-fadeInScale
                  leather-texture
                  ${
                    selectedLang === lang.code
                      ? 'border-brand-secondary scale-105 shadow-2xl shadow-brand-secondary/50'
                      : hoveredLang === lang.code
                      ? 'border-brand-secondary/70 shadow-xl shadow-brand-secondary/30'
                      : 'border-brand-secondary/20 shadow-lg'
                  }
                  ${selectedLang && selectedLang !== lang.code ? 'opacity-40 blur-sm' : ''}
                `}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Gradient overlay on hover */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br from-brand-secondary/20 via-yellow-600/10 to-brand-secondary/20
                  transition-opacity duration-500
                  ${hoveredLang === lang.code || selectedLang === lang.code ? 'opacity-100' : 'opacity-0'}
                `} />
                
                {/* Gold corner accents */}
                <div className={`
                  absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-brand-secondary
                  transition-opacity duration-500
                  ${hoveredLang === lang.code || selectedLang === lang.code ? 'opacity-100' : 'opacity-0'}
                `} />
                <div className={`
                  absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-brand-secondary
                  transition-opacity duration-500
                  ${hoveredLang === lang.code || selectedLang === lang.code ? 'opacity-100' : 'opacity-0'}
                `} />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`
                    text-8xl mb-6 
                    transition-all duration-500 transform
                    ${hoveredLang === lang.code ? 'scale-125 rotate-6' : 'scale-100 rotate-0'}
                  `}>
                    {lang.flag}
                  </div>
                  
                  <h3 className="text-3xl font-serif font-bold mb-2 text-brand-accent">
                    {lang.name}
                  </h3>
                  
                  <p className="text-sm text-brand-accent/70 mb-4 font-serif">
                    {lang.nativeName}
                  </p>
                  
                  <div className={`
                    inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium font-serif
                    transition-all duration-300
                    ${
                      selectedLang === lang.code || hoveredLang === lang.code
                        ? 'bg-brand-secondary text-brand-dark shadow-lg shadow-brand-secondary/30'
                        : 'bg-brand-primary/30 border border-brand-secondary/40 text-brand-accent/80'
                    }
                  `}>
                    {selectedLang === lang.code ? (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        Selected
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Enter
                      </>
                    )}
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-brand-secondary/0 to-transparent group-hover:via-brand-secondary/10 transition-all duration-700" />
              </button>
            ))}
          </div>

          {/* Footer tagline */}
          <div className="text-center mt-16 space-y-3 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <p className="text-brand-accent/80 text-lg font-serif font-light">
              Ručno izrađeno sa ljubavlju • Ручная работа с любовью • Handmade with love
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-brand-secondary">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <span className="font-serif">Zemun, Belgrade</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


