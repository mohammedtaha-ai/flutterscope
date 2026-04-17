import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function FutureBuilderPreview() {
  const { t } = useLanguage();
  const [scenario, setScenario] = useState<'loading' | 'success' | 'error'>('loading');

  const dartCode = `
import 'package:flutter/material.dart';

class FutureBuilderApp extends StatelessWidget {
  // A Future that mimics an API call
  Future<String> fetchUser() async {
    await Future.delayed(Duration(seconds: 2));
    ${scenario === 'error' ? "throw Exception('Failed to load user network error');" : "return 'User: Jane Doe';"}
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<String>(
      future: fetchUser(),
      builder: (context, snapshot) {
        
        if (snapshot.connectionState == ConnectionState.waiting) {
          // 1. Loading State
          return CircularProgressIndicator();
        } 
        
        else if (snapshot.hasError) {
          // 2. Error State
          return Text('Error: \${snapshot.error}');
        } 
        
        else {
          // 3. Success State
          return Text('Success: \${snapshot.data}');
        }

      },
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
              <input type="radio" checked={scenario === 'loading'} onChange={() => setScenario('loading')} className="w-4 h-4 text-blue-600" />
              <span>Simulate Waiting State</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" checked={scenario === 'success'} onChange={() => setScenario('success')} className="w-4 h-4 text-green-600" />
              <span>Simulate Success State</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" checked={scenario === 'error'} onChange={() => setScenario('error')} className="w-4 h-4 text-red-600" />
              <span>Simulate Error State</span>
            </label>
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="FutureBuilder" />}>
            <div className="flex-1 bg-white p-6 flex flex-col items-center justify-center bg-gray-50">
              
              <div className="w-full max-w-xs bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center min-h-[160px] justify-center transition-all">
                {scenario === 'loading' && (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                    <span className="text-gray-500 font-medium">Waiting for data...</span>
                  </div>
                )}

                {scenario === 'success' && (
                  <div className="flex flex-col items-center gap-4 text-green-700">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl font-bold">✓</div>
                    <span className="font-medium text-lg">User: Jane Doe</span>
                  </div>
                )}

                {scenario === 'error' && (
                  <div className="flex flex-col items-center gap-4 text-red-700 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-2xl font-bold">!</div>
                    <span className="font-medium text-sm">Failed to load user network error</span>
                  </div>
                )}
              </div>

            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
