import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function AsyncBasicsPreview() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleFetch = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('done');
    }, 2000);
  };

  const dartCode = `
import 'package:flutter/material.dart';

class AsyncApp extends StatefulWidget {
  @override
  _AsyncAppState createState() => _AsyncAppState();
}

class _AsyncAppState extends State<AsyncApp> {
  String _status = "Idle";

  // The async keyword makes this function run asynchronously
  Future<void> fetchData() async {
    setState(() => _status = "Loading...");
    
    // await tells Dart to wait for the Future to complete before moving on
    await Future.delayed(Duration(seconds: 2)); 
    
    setState(() => _status = "Data loaded! 🎉");
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: fetchData, // Press button to start async task
      child: Text(_status),
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('interactiveControls')}</h3>
          <p className="text-sm text-gray-500">Wait for the simulated network request to complete.</p>
          <div className="flex justify-center">
            <button 
              onClick={() => setStatus('idle')}
              className="text-sm border px-3 py-1 text-gray-500 rounded hover:bg-gray-100"
            >
              Reset State
            </button>
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Async / Await" />}>
            <div className="flex-1 bg-white p-6 flex items-center justify-center">
              
              <button 
                onClick={handleFetch}
                disabled={status === 'loading'}
                className="bg-blue-600 text-white min-w-[200px] h-14 rounded shadow font-medium flex items-center justify-center disabled:opacity-80 transition-all font-mono"
              >
                {status === 'idle' && "Fetch Data"}
                {status === 'loading' && (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Loading...
                  </div>
                )}
                {status === 'done' && "Data loaded! 🎉"}
              </button>

            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
