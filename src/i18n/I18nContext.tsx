import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, TRANSLATIONS } from './translations';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languageLabel: string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Load persisted language from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('townos_language') as Language;
      if (saved && (saved === 'en' || saved === 'ms' || saved === 'zh')) {
        setLanguageState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('townos_language', lang);
    } catch {
      // ignore
    }
  };

  const languageLabels: Record<Language, string> = {
    en: 'English (US)',
    ms: 'Bahasa Melayu',
    zh: '中文 (简体)',
  };

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
        languageLabel: languageLabels[language],
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
