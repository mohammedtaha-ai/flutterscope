import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

const TILE_COLORS = [
  'bg-red-50 text-red-700', 'bg-blue-50 text-blue-700', 
  'bg-green-50 text-green-700', 'bg-purple-50 text-purple-700', 
  'bg-amber-50 text-amber-700', 'bg-pink-50 text-pink-700', 
  'bg-teal-50 text-teal-700', 'bg-indigo-50 text-indigo-700'
];

export function ListViewPreview() {
  const { t } = useLanguage();

  const [itemCount, setItemCount] = useState(5);
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const handleChallengeChange = (val: string) => {
    setChallengeAnswer(val);
  };

  const dartCode = `
import 'package:flutter/material.dart';

class MyListApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('ListView')),
      body: ListView.builder(
        itemCount: ${itemCount},
        itemBuilder: (context, index) {
          return ListTile(
            leading: CircleAvatar(child: Text('\${index + 1}')),
            title: Text('Item \${index + 1}'),
            subtitle: Text('This is a scrolling list item.'),
          );
        },
      ),
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
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>{t('itemCount')}</span>
              <span>{itemCount}</span>
            </label>
            <input 
              type="range" min="3" max="8" step="1" 
              value={itemCount} onChange={(e) => setItemCount(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
          <p className="text-xs text-gray-500">{t('listViewNotice')}</p>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge 
          goal="Complete the widget name that provides a vertically scrollable list."
          codePrefix={"  body: "}
          codeSuffix={".builder(\n    itemCount: items.length,\n  )"}
          answer={challengeAnswer}
          expectedAnswers={['ListView']}
          onChange={handleChallengeChange}
          placeholder="WidgetName"
          successMessage="Exactly! ListView is the standard way to build scrolling content in Flutter."
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="ListView" />}>
            <div className="flex-1 overflow-y-auto bg-white custom-scrollbar h-full">
              {Array.from({ length: itemCount }).map((_, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 border-b border-gray-100 transition-colors ${TILE_COLORS[i % TILE_COLORS.length]}`}>
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center font-bold shrink-0 opacity-80">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold">Item {i + 1}</h4>
                    <p className="text-sm opacity-80">This is a colored scrolling list tile.</p>
                  </div>
                </div>
              ))}
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
