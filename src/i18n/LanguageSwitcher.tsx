import React from 'react';
import { useLanguage } from './LanguageContext';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-100 p-1 dark:bg-slate-800">
      <button
        onClick={() => setLang('en')}
        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          lang === 'en'
            ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-950 dark:text-blue-400'
            : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100'
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLang('ar')}
        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
          lang === 'ar'
            ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-950 dark:text-blue-400'
            : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100'
        }`}
        dir="rtl"
      >
        العربية
      </button>
    </div>
  );
}
