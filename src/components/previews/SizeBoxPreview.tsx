import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function SizeBoxPreview() {
  const { t } = useLanguage();

  const [width, setWidth] = useState(150);
  const [height, setHeight] = useState(100);

  const dartCode = `
import 'package:flutter/material.dart';

class SpacerExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(color: Colors.blue, width: 100, height: 50),
        SizedBox(width: ${width}.0, height: ${height}.0),
        Container(color: Colors.red, width: 100, height: 50),
      ],
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
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>SizedBox Height (Spacing)</span>
                <span>{height}px</span>
              </label>
              <input 
                type="range" min="0" max="250" step="10" 
                value={height} onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
            
            <p className="text-xs text-gray-500">Notice how changing the SizedBox height pushes the red box further away from the blue box. SizedBox is the easiest way to add spacing without margins!</p>
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      {/* Phone Preview */}
      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="SizedBox Example" />}>
            <div className="flex-1 flex flex-col items-center pt-8 bg-gray-50">
              <div className="bg-blue-500 flex items-center justify-center text-white" style={{ width: '100px', height: '50px' }}>Widget A</div>
              {/* Simulated SizedBox */}
              <div className="border border-dashed border-gray-400 bg-gray-200/50 flex flex-col items-center justify-center relative transition-all duration-300" style={{ width: `${width}px`, height: `${height}px` }}>
                {height > 20 && <span className="text-[10px] text-gray-500 font-mono">SizedBox space</span>}
              </div>
              <div className="bg-red-500 flex items-center justify-center text-white" style={{ width: '100px', height: '50px' }}>Widget B</div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
