import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { Moon, Sun } from 'lucide-react';

export function ThemeBasicsPreview() {
  const { t } = useLanguage();
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const dartCode = `
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    theme: ThemeData(
      brightness: Brightness.light,
      primarySwatch: Colors.blue,
      scaffoldBackgroundColor: Colors.white,
    ),
    darkTheme: ThemeData(
      brightness: Brightness.dark,
      primarySwatch: Colors.indigo,
      scaffoldBackgroundColor: Colors.black,
    ),
    themeMode: ThemeMode.${themeMode}, // Dynamic toggle!
    home: MyThemedScreen(),
  ));
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('interactiveControls')}</h3>
          
          <div className="flex justify-center gap-6">
            <button 
              onClick={() => setThemeMode('light')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-medium transition-all \${themeMode === 'light' ? 'border-amber-400 bg-amber-50 text-amber-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
            >
              <Sun className="w-5 h-5" /> Light Theme
            </button>
            <button 
              onClick={() => setThemeMode('dark')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-medium transition-all \${themeMode === 'dark' ? 'border-indigo-400 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
            >
              <Moon className="w-5 h-5" /> Dark Theme
            </button>
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <div className={`w-full h-full flex flex-col transition-colors duration-500 \${themeMode === 'dark' ? 'bg-slate-900' : 'bg-gray-50'}`}>
            <div className={`h-16 flex items-center justify-center shadow-sm transition-colors duration-500 pt-4 \${themeMode === 'dark' ? 'bg-slate-800 text-white' : 'bg-blue-600 text-white'}`}>
              <span className="font-medium text-lg">Theme Example</span>
            </div>
            
            <div className="flex-1 p-6 space-y-6">
              <div className={`p-4 rounded-xl shadow-sm transition-colors duration-500 \${themeMode === 'dark' ? 'bg-slate-800 text-gray-200' : 'bg-white text-gray-800'}`}>
                <h2 className="font-bold text-xl mb-2">Hello Theming!</h2>
                <p className={`text-sm \${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Themes apply globally. Notice how the App Bar, this Card, the text, and the Floating Action Button all change together.
                </p>
              </div>
            </div>

            <div className="absolute bottom-6 right-6">
              <div className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors duration-500 \${themeMode === 'dark' ? 'bg-indigo-500 text-white' : 'bg-blue-600 text-white'}`}>
                <span className="text-2xl font-light">+</span>
              </div>
            </div>
          </div>
        </PhonePreview>
      </div>
    </div>
  );
}
