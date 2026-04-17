import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function AlignWidgetPreview() {
  const { t } = useLanguage();
  const [alignment, setAlignment] = useState('center');

  const alignStyles: Record<string, string> = {
    'topLeft': 'items-start justify-start',
    'topCenter': 'items-start justify-center',
    'topRight': 'items-start justify-end',
    'centerLeft': 'items-center justify-start',
    'center': 'items-center justify-center',
    'centerRight': 'items-center justify-end',
    'bottomLeft': 'items-end justify-start',
    'bottomCenter': 'items-end justify-center',
    'bottomRight': 'items-end justify-end',
  };

  const dartMap: Record<string, string> = {
    'topLeft': 'Alignment.topLeft',
    'topCenter': 'Alignment.topCenter',
    'topRight': 'Alignment.topRight',
    'centerLeft': 'Alignment.centerLeft',
    'center': 'Alignment.center',
    'centerRight': 'Alignment.centerRight',
    'bottomLeft': 'Alignment.bottomLeft',
    'bottomCenter': 'Alignment.bottomCenter',
    'bottomRight': 'Alignment.bottomRight',
  };

  const dartCode = `
import 'package:flutter/material.dart';

class MyAlignApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: ${dartMap[alignment]},
      child: Container(
        width: 100,
        height: 100,
        color: Colors.blue,
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
          
          <div className="grid grid-cols-3 gap-2">
            {Object.keys(alignStyles).map((pos) => (
              <button
                key={pos}
                onClick={() => setAlignment(pos)}
                className={`py-2 text-xs font-mono rounded border transition-colors \${alignment === pos ? 'bg-blue-100 border-blue-400 text-blue-800' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Align Widget" />}>
            <div className={`flex-1 bg-white p-4 flex \${alignStyles[alignment]} transition-all duration-300`}>
              <div className="w-24 h-24 bg-blue-500 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300">
                <span className="text-white font-medium">Child</span>
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
