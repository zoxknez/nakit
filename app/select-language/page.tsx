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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-gray-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-300/30 dark:bg-pink-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-violet-300/20 dark:bg-violet-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl w-full">
          {/* Logo & Title Section */}
          <div className="text-center mb-16 animate-fadeInUp">
            <div className="inline-block mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-purple-600 via-violet-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-500">
                <span className="text-white text-6xl font-bold tracking-tighter">NS</span>
              </div>
            </div>
            
            <h1 className="text-7xl md:text-8xl font-black mb-4 tracking-tight">
              <span className="gradient-text animate-gradient bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600">
                Njata Shiz
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-300 mb-3 tracking-wide">
              Handcrafted Leather Jewelry
            </p>
            
            <div className="inline-block px-6 py-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-full border border-purple-200/50 dark:border-purple-500/30">
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Each piece tells a story of artistry & resilience
              </p>
            </div>
          </div>

          {/* Language Selection */}
          <div className="mb-12 text-center animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Language
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Выберите язык • Izaberite jezik • Select language
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                onMouseEnter={() => setHoveredLang(lang.code)}
                onMouseLeave={() => setHoveredLang(null)}
                disabled={selectedLang !== null}
                className={`
                  group relative overflow-hidden
                  bg-white/80 dark:bg-gray-900/80 
                  backdrop-blur-xl
                  rounded-3xl p-10
                  border-2
                  transition-all duration-500
                  hover-lift
                  animate-fadeInScale
                  ${
                    selectedLang === lang.code
                      ? 'border-purple-500 scale-105 shadow-2xl shadow-purple-500/50'
                      : hoveredLang === lang.code
                      ? 'border-purple-400/50 shadow-xl'
                      : 'border-gray-200/50 dark:border-gray-700/50 shadow-lg'
                  }
                  ${selectedLang && selectedLang !== lang.code ? 'opacity-40 blur-sm' : ''}
                `}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Gradient overlay on hover */}
                <div className={`
                  absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-pink-500/10
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
                  
                  <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                    {lang.name}
                  </h3>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {lang.nativeName}
                  </p>
                  
                  <div className={`
                    inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium
                    transition-all duration-300
                    ${
                      selectedLang === lang.code || hoveredLang === lang.code
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
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

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            ))}
          </div>

          {/* Footer tagline */}
          <div className="text-center mt-16 space-y-3 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <p className="text-gray-600 dark:text-gray-400 text-lg font-light">
              Ručno izrađeno sa ljubavlju • Ручная работа с любовью • Handmade with love
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Zemun, Belgrade ✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

