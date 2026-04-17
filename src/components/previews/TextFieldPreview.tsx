import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';
import { useLanguage } from '@/src/i18n/LanguageContext';

export function TextFieldPreview() {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const handleChallengeChange = (val: string) => {
    setChallengeAnswer(val);
  };

  const dartCode = `
import 'package:flutter/material.dart';

class InputScreen extends StatefulWidget {
  @override
  _InputScreenState createState() => _InputScreenState();
}

class _InputScreenState extends State<InputScreen> {
  // We use this controller to read the text later!
  final TextEditingController _controller = TextEditingController();

  @override
  void dispose() {
    _controller.dispose(); // Always dispose!
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          controller: _controller,
          decoration: InputDecoration(
            labelText: 'Enter your name',
            border: OutlineInputBorder(),
          ),
        ),
        Text('You typed: \${_controller.text}'),
      ],
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('tryTyping')}</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('simulateKeyboard')}</label>
            <input 
              type="text" 
              value={text} 
              onChange={(e) => setText(e.target.value)}
              placeholder={t('startTypingHere')}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-inner bg-gray-50 text-gray-900"
            />
          </div>
          <p className="text-xs text-gray-500">{t('typingSimulNotice')}</p>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge 
          goal="What property connects a TextField to its controller?"
          codePrefix={"        TextField(\n          "}
          codeSuffix={": _controller,\n        )"}
          answer={challengeAnswer}
          expectedAnswers={['controller']}
          onChange={handleChallengeChange}
          placeholder="property"
          successMessage="Perfect! The controller property binds your TextField to the TextEditingController."
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="TextField" />}>
            <div className="flex-1 p-6 bg-white space-y-6">
              
              {/* Simulated TextField */}
              <div className="relative">
                <div className={`absolute -top-2.5 ${(t('youTyped') === 'You typed:') ? 'left-3' : 'right-3'} bg-white px-1 text-xs font-medium transition-colors ${text.length > 0 ? 'text-blue-600' : 'text-gray-500'}`}>
                  Enter your name
                </div>
                <div className={`w-full min-h-[56px] border-2 rounded p-4 flex items-center transition-colors ${text.length > 0 ? 'border-blue-600' : 'border-gray-400'}`}>
                  <span className="text-gray-900 leading-none">{text}</span>
                  {text.length > 0 && <div className="w-0.5 h-5 bg-blue-600 animate-pulse ml-0.5" />}
                </div>
              </div>

              <div className="text-center font-medium text-gray-800">
                {t('youTyped')} <span className="text-blue-600 font-bold">{text || t('nothingYet')}</span>
              </div>

            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
