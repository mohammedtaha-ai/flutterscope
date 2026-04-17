import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function SingleChildScrollViewPreview() {
  const { t } = useLanguage();
  const [isScrollable, setIsScrollable] = useState(false);

  const dartCode = `
import 'package:flutter/material.dart';

class MyScrollApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Scrolling')),
      body: ${isScrollable ? 'SingleChildScrollView(\n        child: ' : ''}Column(
        children: [
          Container(height: 200, color: Colors.blue[100]),
          Container(height: 200, color: Colors.blue[200]),
          Container(height: 200, color: Colors.blue[300]),
          Container(height: 200, color: Colors.blue[400]),
        ],
      )${isScrollable ? ',\n      )' : ''},
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
                checked={!isScrollable} 
                onChange={() => setIsScrollable(false)}
                className="w-4 h-4 text-blue-600"
              />
              <span>Column only (Overflows!)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                checked={isScrollable} 
                onChange={() => setIsScrollable(true)}
                className="w-4 h-4 text-blue-600"
              />
              <span>Wrap in SingleChildScrollView</span>
            </label>
          </div>
          <p className="text-xs text-gray-500">Without a scrollable widget, content that exceeds the screen height will cause an overflow error.</p>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="SingleChildScrollView" />}>
            <div className={`w-full bg-white relative \${isScrollable ? 'h-full overflow-y-auto custom-scrollbar' : 'h-full overflow-hidden'}`}>
              <div className="flex flex-col w-full">
                <div className="h-[200px] bg-blue-100 flex items-center justify-center font-bold text-blue-800 shrink-0 border-b border-blue-200">Box 1</div>
                <div className="h-[200px] bg-blue-200 flex items-center justify-center font-bold text-blue-800 shrink-0 border-b border-blue-300">Box 2</div>
                <div className="h-[200px] bg-blue-300 flex items-center justify-center font-bold text-blue-800 shrink-0 border-b border-blue-400">Box 3</div>
                <div className="h-[200px] bg-blue-400 flex items-center justify-center font-bold text-blue-800 shrink-0">Box 4</div>
              </div>
              
              {!isScrollable && (
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-yellow-400/90 text-black font-mono text-[10px] sm:text-xs flex px-2 items-center border-t-4 border-black overflow-hidden z-20">
                  <span className="bg-black text-yellow-400 px-1 mr-2 font-bold shrink-0">!</span>
                  BOTTOM OVERFLOWED BY 144 PIXELS
                </div>
              )}
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
