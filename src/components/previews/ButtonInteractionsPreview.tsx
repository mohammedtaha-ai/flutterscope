import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState, useEffect } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { motion, AnimatePresence } from 'motion/react';

export function ButtonInteractionsPreview() {
  const { t } = useLanguage();

  const [btnType, setBtnType] = useState<'elevated' | 'text' | 'icon'>('elevated');
  const [snackbar, setSnackbar] = useState<string | null>(null);

  useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => setSnackbar(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  let codeBlock = '';
  if (btnType === 'elevated') {
    codeBlock = `ElevatedButton(
  onPressed: () {
    print("ElevatedButton Tapped!");
  },
  child: Text('Click Me'),
)`;
  } else if (btnType === 'text') {
    codeBlock = `TextButton(
  onPressed: () {
    print("TextButton Tapped!");
  },
  child: Text('Click Me'),
)`;
  } else {
    codeBlock = `IconButton(
  onPressed: () {
    print("IconButton Tapped!");
  },
  icon: Icon(Icons.favorite),
  color: Colors.red,
)`;
  }

  const dartCode = `
import 'package:flutter/material.dart';

class ButtonExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: ${codeBlock},
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('selectButtonType')}</h3>
          
          <div className="flex gap-2">
            {(['elevated', 'text', 'icon'] as const).map(type => (
              <button
                key={type}
                onClick={() => setBtnType(type)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${btnType === type ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Buttons" />}>
            <div className="flex-1 bg-white relative flex items-center justify-center">
              
              {btnType === 'elevated' && (
                <button 
                  onClick={() => setSnackbar("ElevatedButton Tapped!")}
                  className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded shadow-md hover:bg-blue-700 active:bg-blue-800 transition-colors"
                >
                  Click Me
                </button>
              )}

              {btnType === 'text' && (
                <button 
                  onClick={() => setSnackbar("TextButton Tapped!")}
                  className="px-6 py-2.5 text-blue-600 font-medium rounded hover:bg-blue-50 active:bg-blue-100 transition-colors"
                >
                  Click Me
                </button>
              )}

              {btnType === 'icon' && (
                <button 
                  onClick={() => setSnackbar("IconButton Tapped!")}
                  className="p-3 text-red-500 rounded-full hover:bg-red-50 active:bg-red-100 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
              )}

              {/* Simulated Snackbar */}
              <AnimatePresence>
                {snackbar && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="absolute bottom-6 left-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-xl text-sm font-medium z-10"
                  >
                    {snackbar}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
