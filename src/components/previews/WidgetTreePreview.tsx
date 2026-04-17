import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

export function WidgetTreePreview() {
  const { t } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<string>('App');
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const nodeData: Record<string, { desc: string, code: string }> = {
    'App': { desc: 'The root of the application running the initial widget.', code: 'runApp(MyApp());' },
    'MaterialApp': { desc: 'Provides Material Design capabilities and routing.', code: 'MaterialApp(\n  home: ...\n)' },
    'Scaffold': { desc: 'Provides the visual layout structure (app bar, body, etc.).', code: 'Scaffold(\n  appBar: AppBar(),\n  body: ...\n)' },
    'Center': { desc: 'A layout widget that centers its child.', code: 'Center(\n  child: ...\n)' },
    'Text': { desc: 'A basic widget that displays text.', code: 'Text("Hello World")' },
  };

  const dartCode = `
import 'package:flutter/material.dart';

void main() {
  ${nodeData[selectedNode]?.code || '// Select a node'}
}
`;

  const NodeItem = ({ name, children }: { name: string, children?: React.ReactNode }) => {
    const isSelected = selectedNode === name;
    return (
      <div className="pl-6 border-l-2 border-gray-200 mt-2 relative">
        <div className="absolute -left-[3px] top-3 w-4 border-t-2 border-gray-200" />
        <button
          onClick={() => setSelectedNode(name)}
          className={`px-3 py-1.5 rounded-md font-mono text-sm transition-colors border \${isSelected ? 'bg-blue-100 border-blue-300 text-blue-800 font-bold' : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'}`}
        >
          {name}
        </button>
        {children}
      </div>
    );
  };

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('interactiveControls')}</h3>
          <p className="text-sm text-gray-600 mb-4">Click a node in the tree below to understand its role.</p>
          
          <div className="p-4 bg-gray-50 rounded-xl border">
            <button
              onClick={() => setSelectedNode('App')}
              className={`px-3 py-1.5 rounded-md font-mono text-sm transition-colors border \${selectedNode === 'App' ? 'bg-blue-100 border-blue-300 text-blue-800 font-bold' : 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700'}`}
            >
              App
            </button>
            <NodeItem name="MaterialApp">
              <NodeItem name="Scaffold">
                <NodeItem name="Center">
                  <NodeItem name="Text" />
                </NodeItem>
              </NodeItem>
            </NodeItem>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <h4 className="font-bold text-blue-800">{selectedNode}</h4>
            <p className="text-sm text-blue-700 mt-1">{nodeData[selectedNode]?.desc}</p>
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge 
          goal="What widget is typically at the root of a Flutter application?"
          codePrefix={"void main() {\n  runApp(\n    "}
          codeSuffix={"(\n      home: Scaffold(),\n    ),\n  );\n}"}
          answer={challengeAnswer}
          expectedAnswers={['MaterialApp']}
          onChange={setChallengeAnswer}
          placeholder="WidgetName"
          successMessage="Exactly! MaterialApp usually wraps the whole app to provide routing and styling."
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Widget Tree" />}>
            <div className="flex-1 flex items-center justify-center p-6 bg-white">
              <div className="text-center">
                <div className={`p-4 rounded-xl border-2 transition-colors \${selectedNode === 'Center' ? 'border-blue-500 bg-blue-50/50' : 'border-dashed border-gray-300'}`}>
                  <span className={`text-lg transition-colors \${selectedNode === 'Text' ? 'text-blue-600 font-bold bg-blue-100 px-2 py-1 rounded' : 'text-gray-800'}`}>
                    Hello World
                  </span>
                </div>
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
