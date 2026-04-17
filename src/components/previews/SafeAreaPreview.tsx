import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function SafeAreaPreview() {
  const { t } = useLanguage();
  const [useSafeArea, setUseSafeArea] = useState(false);

  const dartCode = `
import 'package:flutter/material.dart';

class MySafeAreaApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue[900],
      body: ${useSafeArea ? 'SafeArea(\n        child: ' : ''}Container(
        color: Colors.white,
        child: Text('Content'),
      )${useSafeArea ? ',\n      )' : ''},
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('interactiveControls')}</h3>
          
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                checked={!useSafeArea} 
                onChange={() => setUseSafeArea(false)}
                className="w-4 h-4 text-blue-600"
              />
              <span>No SafeArea (Overflows)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                checked={useSafeArea} 
                onChange={() => setUseSafeArea(true)}
                className="w-4 h-4 text-blue-600"
              />
              <span>Use SafeArea</span>
            </label>
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          {/* Simulated Scaffold without AppBar */}
          <div className="flex-1 bg-slate-800 relative flex flex-col overflow-hidden w-full h-[600px] border border-gray-800 rounded-3xl">
            {/* Fake Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-20" />
            {/* Fake Status Bar Text */}
            <div className="absolute top-1 left-6 flex items-center gap-1 z-20 text-[10px] text-white">9:41</div>
            <div className="absolute top-1 right-6 flex items-center gap-1 z-20 text-[10px] text-white">🔋</div>
            
            <div className={`flex flex-col w-full h-full transition-all duration-300 \${useSafeArea ? 'pt-10 pb-6 bg-slate-800' : 'pt-0 pb-0 bg-white'}`}>
              <div className="flex-1 bg-white p-4 w-full h-full">
                <div className="bg-blue-100 text-blue-900 border border-blue-200 p-4 rounded-xl">
                  {useSafeArea ? 
                    "Content is safe! It respects the screen's top notch." : 
                    "Look at the top! The content is hidden underneath the phone's notch."
                  }
                </div>
              </div>
            </div>
          </div>
        </PhonePreview>
      </div>
    </div>
  );
}
