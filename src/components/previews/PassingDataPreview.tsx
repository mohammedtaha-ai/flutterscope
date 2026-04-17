import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function PassingDataPreview() {
  const { t } = useLanguage();
  const [screen, setScreen] = useState(1);
  const [inputValue, setInputValue] = useState('');

  const handleGo = () => {
    if (inputValue.trim()) setScreen(2);
  };

  const dartCode = `
import 'package:flutter/material.dart';

// Screen 1
class ScreenOne extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        Navigator.push(
          context, 
          MaterialPageRoute(
            builder: (context) => ScreenTwo(data: "Hello!"), // PASSING DATA HERE
          )
        );
      },
      child: Text('Go to Screen Two'),
    );
  }
}

// Screen 2
class ScreenTwo extends StatelessWidget {
  final String data; // RECEIVING DATA HERE
  
  ScreenTwo({required this.data});

  @override
  Widget build(BuildContext context) {
    return Text('Data received: $data');
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('interactiveControls')}</h3>
          <p className="text-sm text-gray-500">Notice how the value you type in Screen 1 is available in Screen 2!</p>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <div className="relative w-full h-full overflow-hidden rounded-[3rem]">
            {/* Screen 1 */}
            <div className={`absolute inset-0 bg-white transition-transform duration-300 ease-in-out \${screen === 1 ? 'translate-x-0' : '-translate-x-full'}`}>
              <FlutterScaffold appBar={<FlutterAppBar title="Screen 1" />}>
                <div className="p-6 flex flex-col justify-center h-full gap-6">
                  <input 
                    type="text" 
                    value={inputValue} 
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Enter some data..."
                    className="border-b-2 border-blue-500 text-lg py-2 outline-none w-full"
                  />
                  <button 
                    onClick={handleGo}
                    disabled={!inputValue.trim()}
                    className="bg-blue-600 text-white py-3 rounded-lg font-medium shadow disabled:opacity-50"
                  >
                    Send to Screen 2
                  </button>
                </div>
              </FlutterScaffold>
            </div>

            {/* Screen 2 */}
            <div className={`absolute inset-0 bg-gray-50 transition-transform duration-300 ease-in-out \${screen === 2 ? 'translate-x-0' : 'translate-x-[100%]'}`}>
              <div className="h-full flex flex-col">
                {/* Custom AppBar for screen 2 with back button */}
                <div className="bg-blue-600 text-white h-14 flex items-center px-4 shrink-0 shadow-sm pt-2">
                  <button onClick={() => setScreen(1)} className="mr-4 p-1 hover:bg-blue-700 rounded-full">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                  <h1 className="font-medium text-lg">Screen 2</h1>
                </div>
                <div className="flex-1 p-6 flex flex-col items-center justify-center">
                  <div className="text-center">
                    <p className="text-gray-500 mb-2">Data received:</p>
                    <p className="text-3xl font-bold text-blue-600">{inputValue}</p>
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
