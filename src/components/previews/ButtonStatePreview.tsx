import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function ButtonStatePreview() {
  const { t } = useLanguage();
  const [text, setText] = useState('');

  const dartCode = `
import 'package:flutter/material.dart';

class SubmitScreen extends StatefulWidget {
  @override
  _SubmitScreenState createState() => _SubmitScreenState();
}

class _SubmitScreenState extends State<SubmitScreen> {
  String _input = "";

  @override
  Widget build(BuildContext context) {
    bool isEnabled = _input.trim().isNotEmpty;

    return Column(
      children: [
        TextField(
          onChanged: (val) => setState(() => _input = val),
        ),
        ElevatedButton(
          // If onPressed is null, the button is disabled visually and functionally!
          onPressed: isEnabled ? () {
            print("Submitting: $_input");
          } : null,
          child: Text('Submit'),
        ),
      ],
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('interactiveControls')}</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Simulate Input</label>
             <input 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              placeholder="Type to enable button..."
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 text-gray-900"
            />
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Button State" />}>
            <div className="flex-1 bg-white p-6 space-y-8">
              <div className="border-b-2 focus-within:border-blue-500 border-gray-300 pb-2 transition-colors">
                <span className="text-lg">{text || <span className="text-gray-400">Enter text</span>}</span>
                {text.length > 0 && <span className="animate-pulse bg-blue-500 w-0.5 h-5 inline-block ml-1 align-middle" />}
              </div>
              
              <div className="flex justify-center">
                <button
                  disabled={text.trim().length === 0}
                  className={`px-8 py-2.5 rounded shadow-sm font-medium transition-colors \${
                    text.trim().length > 0 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shadow-md' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  Submit
                </button>
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
