import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/src/theme/ThemeContext';
import { useLanguage } from '@/src/i18n/LanguageContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const nextThemeLabel = theme === 'dark' ? t('switchToLightMode') : t('switchToDarkMode');

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={nextThemeLabel}
      aria-label={nextThemeLabel}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
    >
      {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-500" />}
      <span className="hidden sm:inline">{nextThemeLabel}</span>
    </button>
  );
}
