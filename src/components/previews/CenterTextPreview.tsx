import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function CenterTextPreview() {
  const { t } = useLanguage();

  const [isCentered, setIsCentered] = useState(false);
  const [text, setText] = useState("Hello Flutter!");
  const [size, setSize] = useState(24);

  const dartCode = `
import 'package:flutter/material.dart';

class MyNewApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('My App')),
      body: ${isCentered ? `Center(
        child: Text(
          '${text}',
          style: TextStyle(fontSize: ${size}.0),
        ),
      )` : `Text(
        '${text}',
        style: TextStyle(fontSize: ${size}.0),
      )`},
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Controls & Code */}
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('interactiveControls')}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Content</label>
              <input 
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>{t('fontSize')}</span>
                <span>{size}px</span>
              </label>
              <input 
                type="range" min="12" max="64" step="2" 
                value={size} onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="pt-2 border-t">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isCentered}
                  onChange={(e) => setIsCentered(e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span className="text-sm font-medium text-gray-800">Wrap Text inside Center Widget</span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-8">Watch the code change below when you toggle this!</p>
            </div>
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      {/* Phone Preview */}
      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="My App" />}>
            <div className={`flex-1 p-4 bg-white transition-all duration-500 ease-in-out ${isCentered ? 'flex items-center justify-center' : 'flex items-start justify-start'}`}>
              <div 
                className="text-gray-900 font-medium transition-all duration-300"
                style={{ fontSize: `${size}px` }}
              >
                {text}
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
