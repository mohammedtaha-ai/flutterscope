import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function TextFieldDeepPreview() {
  const { t } = useLanguage();
  const [approach, setApproach] = useState<'onChanged' | 'controller'>('onChanged');
  const [text, setText] = useState('');

  const dartCode = `
import 'package:flutter/material.dart';

class NameScreen extends StatefulWidget {
  @override
  _NameScreenState createState() => _NameScreenState();
}

class _NameScreenState extends State<NameScreen> {
  ${approach === 'controller' ? 'final _controller = TextEditingController();\n' : 'String _name = "";\n'}
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          ${approach === 'controller' ? 'controller: _controller,' : 'onChanged: (value) {\n            setState(() { _name = value; });\n          },'}
        ),
        ${approach === 'controller' ? 'ElevatedButton(\n          onPressed: () { print(_controller.text); },\n          child: Text("Read Controller"),\n        )' : 'Text("Hello $_name")'}
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
          
          <div className="flex gap-4 border-b pb-2">
            <button 
              onClick={() => { setApproach('onChanged'); setText(''); }}
              className={`font-semibold pb-2 border-b-2 transition-colors \${approach === 'onChanged' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
            >
              onChanged (State)
            </button>
            <button 
              onClick={() => { setApproach('controller'); setText(''); }}
              className={`font-semibold pb-2 border-b-2 transition-colors \${approach === 'controller' ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
            >
              controller
            </button>
          </div>

          <div>
             <input 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              placeholder="Simulate typing..."
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="TextField" />}>
            <div className="flex-1 bg-white p-6 space-y-6">
              <div className="border-b-2 border-blue-500 pb-2">
                <span className="text-lg">{text || <span className="text-gray-400">Enter name</span>}</span>
              </div>
              
              {approach === 'onChanged' ? (
                <div className="text-center font-medium mt-8">
                  Hello <span className="text-blue-600">{text}</span>
                </div>
              ) : (
                <div className="flex justify-center mt-8">
                  <div className="bg-blue-600 text-white px-6 py-2 rounded shadow-sm font-medium opacity-90">
                    Read Controller
                  </div>
                </div>
              )}
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
