import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function PaddingWidgetPreview() {
  const { t } = useLanguage();
  const [padding, setPadding] = useState(16);

  const dartCode = `
import 'package:flutter/material.dart';

class MyPaddingApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      // EdgeInsets.all applies padding to all 4 sides
      padding: EdgeInsets.all(${padding}.0),
      child: Container(
        color: Colors.blue[100],
        child: Text('Content inside padded box'),
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
          
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Padding (EdgeInsets.all)</span>
              <span>{padding}px</span>
            </label>
            <input 
              type="range" min="0" max="64" step="4" 
              value={padding} onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Padding Widget" />}>
            <div className="flex-1 bg-white">
              <div 
                className="bg-green-100/50 transition-all duration-300 h-full flex flex-col"
                style={{ padding: padding + 'px' }}
              >
                <div className="flex-1 bg-blue-100 border-2 border-blue-400 border-dashed rounded-xl flex items-center justify-center p-4 text-center">
                  <span className="text-blue-800 font-medium">Content inside padded box</span>
                </div>
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
