import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

export function RowColumnPreview() {
  const { t } = useLanguage();

  const [isRow, setIsRow] = useState(true);
  const [mainAxis, setMainAxis] = useState('center');
  const [crossAxis, setCrossAxis] = useState('center');
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const handleChallengeChange = (val: string) => {
    setChallengeAnswer(val);
    if (val.trim() === 'spaceEvenly') {
      setIsRow(true);
      setMainAxis('space-evenly');
    }
  };

  const mainAxisOptions = [
    { value: 'start', label: 'start' },
    { value: 'center', label: 'center' },
    { value: 'end', label: 'end' },
    { value: 'space-between', label: 'spaceBetween' },
    { value: 'space-around', label: 'spaceAround' },
    { value: 'space-evenly', label: 'spaceEvenly' },
  ];

  const crossAxisOptions = [
    { value: 'start', label: 'start' },
    { value: 'center', label: 'center' },
    { value: 'end', label: 'end' },
    { value: 'stretch', label: 'stretch' },
  ];

  // Map CSS flex classes to simulate Flutter
  const getSimulatedMainClass = () => {
    switch (mainAxis) {
      case 'start': return 'justify-start';
      case 'end': return 'justify-end';
      case 'center': return 'justify-center';
      case 'space-between': return 'justify-between';
      case 'space-around': return 'justify-around';
      case 'space-evenly': return 'justify-evenly';
      default: return 'justify-center';
    }
  };

  const getSimulatedCrossClass = () => {
    switch (crossAxis) {
      case 'start': return 'items-start';
      case 'end': return 'items-end';
      case 'center': return 'items-center';
      case 'stretch': return 'items-stretch';
      default: return 'items-center';
    }
  };

  const dartCode = `
import 'package:flutter/material.dart';

class FlexExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.grey[200],
      child: ${isRow ? 'Row' : 'Column'}(
        mainAxisAlignment: MainAxisAlignment.${mainAxisOptions.find(o => o.value === mainAxis)?.label},
        crossAxisAlignment: CrossAxisAlignment.${crossAxisOptions.find(o => o.value === crossAxis)?.label},
        children: [
          Container(color: Colors.blue, width: 50, height: 50),
          Container(color: Colors.red, width: 70, height: 70),
          Container(color: Colors.green, width: 50, height: 50),
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
          
          <div className="space-y-6">
            {/* Toggle Row/Column */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Widget Type</label>
              <div className="flex p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setIsRow(true)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${isRow ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Row
                </button>
                <button
                  onClick={() => setIsRow(false)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${!isRow ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Column
                </button>
              </div>
            </div>
            
            {/* Main Axis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">MainAxisAlignment</label>
              <p className="text-xs text-gray-500 mb-3">Controls layout along the {isRow ? 'horizontal' : 'vertical'} axis.</p>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {mainAxisOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setMainAxis(opt.value)}
                    className={`py-2 px-3 text-xs rounded-lg border transition-all ${mainAxis === opt.value ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 hover:border-blue-300'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Cross Axis */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CrossAxisAlignment</label>
              <p className="text-xs text-gray-500 mb-3">Controls layout along the {!isRow ? 'horizontal' : 'vertical'} axis.</p>
              <div className="grid grid-cols-2 gap-2">
                {crossAxisOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setCrossAxis(opt.value)}
                    className={`py-2 px-3 text-xs rounded-lg border transition-all ${crossAxis === opt.value ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 hover:border-blue-300'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge 
          goal="Change the layout so that the elements are distributed evenly. Set the correct MainAxisAlignment property."
          codePrefix={"Row(\n  mainAxisAlignment: MainAxisAlignment."}
          codeSuffix={",\n  children: [\n    Container(color: Colors.blue, width: 50, height: 50),\n    // ...\n  ]\n)"}
          answer={challengeAnswer}
          expectedAnswers={['spaceEvenly']}
          onChange={handleChallengeChange}
          placeholder="property"
          successMessage="Great! MainAxisAlignment.spaceEvenly adds equal space before, between, and after every element along the layout's main axis."
        />
      </div>

      {/* Phone Preview */}
      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={isRow ? "Row Example" : "Column Example"} />}>
            <div className="flex-1 bg-gray-200 p-2">
              {/* Simulated Flutter Row/Column */}
              <div 
                className={`flex w-full h-full border border-dashed border-gray-400 p-2 transition-all duration-500 ${isRow ? 'flex-row' : 'flex-col'} ${getSimulatedMainClass()} ${getSimulatedCrossClass()}`}
              >
                <div className="bg-blue-500 flex items-center justify-center text-white font-bold transition-all duration-300" style={{ width: crossAxis === 'stretch' && !isRow ? 'auto' : 50, height: crossAxis === 'stretch' && isRow ? 'auto' : 50 }}>1</div>
                <div className="bg-red-500 flex items-center justify-center text-white font-bold transition-all duration-300" style={{ width: crossAxis === 'stretch' && !isRow ? 'auto' : 70, height: crossAxis === 'stretch' && isRow ? 'auto' : 70 }}>2</div>
                <div className="bg-green-500 flex items-center justify-center text-white font-bold transition-all duration-300" style={{ width: crossAxis === 'stretch' && !isRow ? 'auto' : 50, height: crossAxis === 'stretch' && isRow ? 'auto' : 50 }}>3</div>
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
