import React from 'react';
import { useLanguage } from './LanguageContext';

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1 dark:bg-slate-800 sm:gap-2">
      <button
        onClick={() => setLang('en')}
        className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
          lang === 'en'
            ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-950 dark:text-blue-400'
            : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('ar')}
        className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
          lang === 'ar'
            ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-950 dark:text-blue-400'
            : 'text-gray-500 hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100'
        }`}
        dir="rtl"
      >
        AR
      </button>
    </div>
  );
}
