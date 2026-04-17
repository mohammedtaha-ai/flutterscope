import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

const COLORS = [
  { name: 'Colors.blue', cls: 'text-blue-500', hex: '#3b82f6' },
  { name: 'Colors.red', cls: 'text-red-500', hex: '#ef4444' },
  { name: 'Colors.green', cls: 'text-green-500', hex: '#22c55e' },
  { name: 'Colors.purple', cls: 'text-purple-500', hex: '#a855f7' }
];

export function TextWidgetPreview() {
  const { t } = useLanguage();

  const [size, setSize] = useState(24);
  const [colorIdx, setColorIdx] = useState(0);
  const selectedColor = COLORS[colorIdx];

  const dartCode = `
import 'package:flutter/material.dart';

class MyTextApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text(
      'Hello Flutter!',
      style: TextStyle(
        fontSize: ${size}.0,
        color: ${selectedColor.name},
      ),
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('interactiveControls')}</h3>
          
          <div className="space-y-6">
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>{t('fontSize')}</span>
                <span>{size}px</span>
              </label>
              <input 
                type="range" min="12" max="36" step="2" 
                value={size} onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('textColor')}</label>
              <div className="flex gap-3">
                {COLORS.map((c, i) => (
                  <button 
                    key={c.name}
                    onClick={() => setColorIdx(i)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${colorIdx === i ? 'scale-110 border-gray-900 shadow-md' : 'border-transparent hover:scale-110'}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Text Widget" />}>
            <div className="flex-1 p-4 bg-white flex items-start">
              <div 
                className={`font-medium transition-all duration-200 ${selectedColor.cls}`}
                style={{ fontSize: `${size}px` }}
              >
                Hello Flutter!
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
