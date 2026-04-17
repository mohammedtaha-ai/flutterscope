import React from 'react';
import { useLanguage, Lang } from './LanguageContext';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          lang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLang('ar')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          lang === 'ar' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'
        }`}
        dir="rtl"
      >
        العربية
      </button>
    </div>
  );
}
