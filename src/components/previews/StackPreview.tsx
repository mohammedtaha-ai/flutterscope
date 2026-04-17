import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

export function StackPreview() {
  const { t } = useLanguage();

  const [alignment, setAlignment] = useState('center');
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const handleChallengeChange = (val: string) => {
    setChallengeAnswer(val);
    if (val.trim() === 'bottomRight') setAlignment('bottomRight');
  };

  const alignOptions = [
    { value: 'topLeft', label: 'topLeft' },
    { value: 'topCenter', label: 'topCenter' },
    { value: 'topRight', label: 'topRight' },
    { value: 'centerLeft', label: 'centerLeft' },
    { value: 'center', label: 'center' },
    { value: 'centerRight', label: 'centerRight' },
    { value: 'bottomLeft', label: 'bottomLeft' },
    { value: 'bottomCenter', label: 'bottomCenter' },
    { value: 'bottomRight', label: 'bottomRight' },
  ];

  // Map to Tailwind classes to simulate stack alignment
  const getTailwindAlignment = () => {
    switch (alignment) {
      case 'topLeft': return 'items-start justify-start';
      case 'topCenter': return 'items-start justify-center';
      case 'topRight': return 'items-start justify-end';
      case 'centerLeft': return 'items-center justify-start';
      case 'center': return 'items-center justify-center';
      case 'centerRight': return 'items-center justify-end';
      case 'bottomLeft': return 'items-end justify-start';
      case 'bottomCenter': return 'items-end justify-center';
      case 'bottomRight': return 'items-end justify-end';
      default: return 'items-center justify-center';
    }
  };

  const dartCode = `
import 'package:flutter/material.dart';

class StackExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 300,
      color: Colors.grey[200],
      child: Stack(
        alignment: Alignment.${alignment},
        children: [
          Container(width: 250, height: 250, color: Colors.blue),
          Container(width: 200, height: 200, color: Colors.red),
          Container(width: 150, height: 150, color: Colors.yellow),
        ],
      ),
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Controls & Code */}
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('interactiveControls')}</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stack Alignment</label>
            <p className="text-xs text-gray-500 mb-3">Controls where non-positioned children are placed relative to the stack's edges.</p>
            <div className="grid grid-cols-3 gap-2">
              {alignOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setAlignment(opt.value)}
                  className={`py-2 px-1 text-[11px] font-medium rounded-md border transition-all ${alignment === opt.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-blue-300 text-gray-600'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge 
          goal="Push all the containers to the bottom right corner of the stack using the Alignment class."
          codePrefix={"Stack(\n  alignment: Alignment."}
          codeSuffix={",\n  children: [\n    Container(width: 250, color: Colors.blue),\n    // ...\n  ]\n)"}
          answer={challengeAnswer}
          expectedAnswers={['bottomRight']}
          onChange={handleChallengeChange}
          placeholder="property"
          successMessage="Awesome! The Alignment class allows you to easily position everything in 2D space inside a Stack."
        />
      </div>

      {/* Phone Preview */}
      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Stack Example" />}>
            <div className="flex-1 p-2 flex flex-col justify-center bg-white">
              {/* Simulated Stack Wrapper */}
              <div className="w-full relative bg-gray-200 aspect-square overflow-hidden shadow-inner">
                 <div className={`absolute inset-0 flex w-full h-full ${getTailwindAlignment()}`}>
                    <div className="w-56 h-56 bg-blue-500 opacity-90 absolute shadow-sm transition-all duration-500" />
                    <div className="w-44 h-44 bg-red-500 opacity-95 absolute shadow-sm transition-all duration-500" />
                    <div className="w-32 h-32 bg-amber-400 absolute shadow-md transition-all duration-500 flex items-center justify-center font-bold text-amber-900 border-2 border-white/20">
                      Top Layer
                    </div>
                 </div>
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
