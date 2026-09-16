'use client';

import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';
import {
  Language,
  SUPPORTED_LANGUAGES,
  TranslationsType,
  getTranslations,
} from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationsType;
  languages: typeof SUPPORTED_LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('gbn-lang') as Language | null;
        if (saved === 'en' || saved === 'ka') return saved;
      } catch {
        // Storage unavailable
      }
    }
    return 'en';
  });

  const [, startTransition] = useTransition();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (newLang: Language) => {
    startTransition(() => {
      setLanguageState(newLang);
    });
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
    }
    try {
      localStorage.setItem('gbn-lang', newLang);
    } catch {
      // Storage unavailable
    }
  };

  const t = getTranslations(language);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

