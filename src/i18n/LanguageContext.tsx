import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './translations';

export type Lang = 'en' | 'ar';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  isRtl: boolean;
  t: (key: keyof typeof translations['en']) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  isRtl: false,
  t: (k) => k as string,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('flutterscope_lang') as Lang) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('flutterscope_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: keyof typeof translations['en']) => {
    return translations[lang][key] || translations['en'][key] || key as string;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, isRtl: lang === 'ar', t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
