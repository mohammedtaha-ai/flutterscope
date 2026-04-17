import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function NamedRoutesPreview() {
  const { t } = useLanguage();
  const [route, setRoute] = useState('/');

  const dartCode = `
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    initialRoute: '/',
    routes: {
      '/': (context) => HomeScreen(),
      '/settings': (context) => SettingsScreen(),
      '/profile': (context) => ProfileScreen(),
    },
  ));
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => Navigator.pushNamed(context, '/settings'),
      child: Text('Go to Settings'),
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('interactiveControls')}</h3>
          
          <div className="flex gap-2 p-4 bg-gray-50 rounded font-mono text-sm overflow-x-auto whitespace-nowrap">
            <span className="text-gray-500">Navigator.pushNamed(context,</span>
            <span className="text-green-600 font-bold">'{route === '/' ? '/settings' : '/'}'</span>
            <span className="text-gray-500">);</span>
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <div className="relative w-full h-full overflow-hidden rounded-[3rem]">
            {/* Home Route */}
            <div className={`absolute inset-0 bg-white transition-opacity duration-300 \${route === '/' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <FlutterScaffold appBar={<FlutterAppBar title="Home Screen" />}>
                <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
                  <div className="bg-blue-100 text-blue-800 p-3 rounded font-mono text-sm mb-4 border border-blue-200">
                    Route: '/'
                  </div>
                  <button onClick={() => setRoute('/settings')} className="bg-blue-600 text-white w-full py-3 rounded shadow font-medium">Go to /settings</button>
                  <button onClick={() => setRoute('/profile')} className="bg-blue-600 text-white w-full py-3 rounded shadow font-medium">Go to /profile</button>
                </div>
              </FlutterScaffold>
            </div>

            {/* Other Routes */}
            <div className={`absolute inset-0 bg-white transition-opacity duration-300 \${route !== '/' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <div className="h-full flex flex-col">
                <div className="bg-blue-600 text-white h-14 flex items-center px-4 shrink-0 shadow-sm pt-2">
                  <button onClick={() => setRoute('/')} className="mr-4 p-1 hover:bg-blue-700 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <h1 className="font-medium text-lg capitalize">{route.replace('/', '')} Screen</h1>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                  <div className="bg-amber-100 text-amber-800 p-3 rounded font-mono text-sm border border-amber-200">
                    Route: '{route}'
                  </div>
                </div>
              </div>
            </div>

          </div>
        </PhonePreview>
      </div>
    </div>
  );
}
