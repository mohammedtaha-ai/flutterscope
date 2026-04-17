import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function BuildMethodPreview() {
  const { t } = useLanguage();
  const [count, setCount] = useState(0);
  const [builds, setBuilds] = useState(1);

  const handleIncrement = () => {
    setCount(c => c + 1);
    setBuilds(b => b + 1);
  };

  const dartCode = `
import 'package:flutter/material.dart';

class MyCounter extends StatefulWidget {
  @override
  _MyCounterState createState() => _MyCounterState();
}

class _MyCounterState extends State<MyCounter> {
  int _counter = ${count};

  @override
  Widget build(BuildContext context) {
    // ⚠️ build() has run ${builds} times!
    return Scaffold(
      body: Center(child: Text('Count: $_counter')),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            _counter++;
          });
        },
        child: Icon(Icons.add),
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
          <p className="text-sm text-gray-600 mb-4">Build is called when state changes. Click the button to see the build count increase.</p>
          
          <div className="flex gap-4">
            <button 
              onClick={handleIncrement}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Call setState()
            </button>
            <div className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg font-mono text-sm border border-amber-200 flex items-center">
              build() calls: {builds}
            </div>
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="build() Method" />}>
            <div className="flex-1 flex items-center justify-center bg-white relative">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Count</p>
                <p className="text-5xl font-light text-gray-800">{count}</p>
                <div key={builds} className="absolute inset-0 border-4 border-blue-400 animate-[ping_0.5s_cubic-bezier(0,0,0.2,1)_1] pointer-events-none opacity-0" />
              </div>
              <button 
                onClick={handleIncrement}
                className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition active:scale-95"
              >
                +
              </button>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
