import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function CenterWidgetPreview() {
  const { t } = useLanguage();

  const [isCentered, setIsCentered] = useState(false);

  const dartCode = `
import 'package:flutter/material.dart';

class MyCenterApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('My App')),
      body: ${isCentered ? `Center(
        child: Text('Dead Center!'),
      )` : `Text('Top Left!')`},
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('interactiveControls')}</h3>
          
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setIsCentered((current) => !current)}
              aria-pressed={isCentered}
              aria-label={isCentered ? t('withCenter') : t('withoutCenter')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`w-12 h-6 rounded-full p-1 transition-colors ${isCentered ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-hidden="true"
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isCentered ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
              <span className="text-sm font-bold text-gray-800">
                {isCentered ? t('withCenter') : t('withoutCenter')}
              </span>
            </button>
            <p className="text-xs text-gray-500">{t('toggleCenter')}</p>
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="My App" />}>
            <div className={`flex-1 p-4 bg-white relative`}>
              <div 
                className={`absolute text-blue-600 font-bold transition-all duration-300 ease-in-out ${isCentered ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl' : 'top-4 left-4 text-base'}`}
              >
                {isCentered ? 'Dead Center!' : 'Top Left!'}
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
