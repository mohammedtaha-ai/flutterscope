import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

export function ContainerPreview() {
  const { t } = useLanguage();

  const [padding, setPadding] = useState(16);
  const [color, setColor] = useState('blue');
  const [borderRadius, setBorderRadius] = useState(8);
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const handleChallengeChange = (val: string) => {
    setChallengeAnswer(val);
    if (val.trim() === '32' || val.trim() === '32.0') setPadding(32);
    else if (val.trim() === '0' || val.trim() === '0.0') setPadding(0);
  };

  const colors: Record<string, string> = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
  };

  const dartCode = `
import 'package:flutter/material.dart';

class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(${padding}.0),
      decoration: BoxDecoration(
        color: Colors.${color},
        borderRadius: BorderRadius.circular(${borderRadius}.0),
      ),
      child: const Text(
        'I am a cool Container',
        style: TextStyle(color: Colors.white, fontSize: 20),
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
          
          <div className="space-y-4">
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>Padding</span>
                <span>{padding}px</span>
              </label>
              <input 
                type="range" min="0" max="64" step="4" 
                value={padding} onChange={(e) => setPadding(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
            
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                <span>Border Radius</span>
                <span>{borderRadius}px</span>
              </label>
              <input 
                type="range" min="0" max="40" step="4" 
                value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div className="flex gap-3">
                {Object.keys(colors).map(c => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-full transition-transform ${colors[c]} ${color === c ? 'scale-110 ring-2 ring-offset-2 ring-gray-800' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge 
          goal="Increase the padding to create more inner space. Type exactly 32.0 to make the padding 32 pixels on all sides."
          codePrefix={"Container(\n  padding: EdgeInsets.all("}
          codeSuffix={"),\n  color: Colors.blue,\n  child: Text('I am a cool Container'),\n)"}
          answer={challengeAnswer}
          expectedAnswers={['32.0', '32']}
          onChange={handleChallengeChange}
          placeholder="value"
          successMessage="Perfect! Notice how the text in the preview is pushed further inward from the edges of the blue background?"
        />
      </div>

      {/* Phone Preview */}
      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Container Example" />}>
            <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-100">
              {/* The Simulated Flutter Widget */}
              <div 
                className={`${colors[color]} transition-all duration-300 ease-in-out`}
                style={{ 
                  padding: `${padding}px`, 
                  borderRadius: `${borderRadius}px` 
                }}
              >
                <div className="text-white text-xl font-medium whitespace-nowrap text-center">
                  I am a cool Container
                </div>
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
