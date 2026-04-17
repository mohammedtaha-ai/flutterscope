import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function ColumnOverflowPreview() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'plain' | 'expanded' | 'scrollable'>('plain');

  const dartCode = `
import 'package:flutter/material.dart';

class OverflowFixApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(height: 100, color: Colors.blue),
        ${mode === 'expanded' ? 'Expanded(\n          child: ' : ''}${mode === 'scrollable' ? 'Expanded(\n          child: SingleChildScrollView(\n            child: ' : ''}Column(
          children: List.generate(20, (index) => 
            Text('Item $index', style: TextStyle(fontSize: 24)),
          ),
        )${mode === 'scrollable' ? ',\n          ),\n        )' : mode === 'expanded' ? ',\n        )' : ''},
      ],
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('interactiveControls')}</h3>
          
          <div className="flex flex-col gap-3">
             <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" checked={mode === 'plain'} onChange={() => setMode('plain')} className="w-4 h-4 text-blue-600" />
              <span>Plain Column (Overflows)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" checked={mode === 'expanded'} onChange={() => setMode('expanded')} className="w-4 h-4 text-blue-600" />
              <span>Wrap with Expanded (Cuts off / Overflows inner)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" checked={mode === 'scrollable'} onChange={() => setMode('scrollable')} className="w-4 h-4 text-blue-600" />
              <span>Expanded + SingleChildScrollView (Perfect)</span>
            </label>
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Column Overflow" />}>
            <div className="flex-1 bg-gray-50 flex flex-col h-full overflow-hidden relative">
              <div className="h-[100px] bg-blue-500 shrink-0 flex items-center justify-center shadow-sm z-10">
                <span className="text-white font-bold">Header (100px)</span>
              </div>
              
              <div className={`w-full flex-1 \${mode === 'expanded' ? 'overflow-hidden' : mode === 'scrollable' ? 'overflow-y-auto custom-scrollbar' : 'overflow-visible'}`}>
                <div className="flex flex-col w-full bg-white">
                  {Array.from({length: 20}).map((_, i) => (
                    <div key={i} className="py-2 px-4 border-b border-gray-100 text-lg">
                      Item {i}
                    </div>
                  ))}
                </div>
              </div>

              {(mode === 'plain' || mode === 'expanded') && (
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-yellow-400/90 text-black font-mono text-[10px] sm:text-xs flex px-2 items-center border-t-4 border-black overflow-hidden z-20">
                  <span className="bg-black text-yellow-400 px-1 mr-2 font-bold shrink-0">!</span>
                  BOTTOM OVERFLOWED
                </div>
              )}
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
