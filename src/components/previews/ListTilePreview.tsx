import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { User, ChevronRight } from 'lucide-react';

export function ListTilePreview() {
  const { t } = useLanguage();
  const [showLeading, setShowLeading] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(true);
  const [showTrailing, setShowTrailing] = useState(true);

  const dartCode = `
import 'package:flutter/material.dart';

class MyListTileApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        ListTile(
          ${showLeading ? "leading: CircleAvatar(child: Icon(Icons.person)),\n          " : ""}title: Text('John Doe'),
          ${showSubtitle ? "subtitle: Text('Software Engineer'),\n          " : ""}${showTrailing ? "trailing: Icon(Icons.chevron_right),\n          " : ""}onTap: () {
            print('Tapped!');
          },
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
          
          <div className="flex flex-col gap-3">
             <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={showLeading} onChange={(e) => setShowLeading(e.target.checked)} className="w-4 h-4 rounded text-blue-600" />
              <span>Show <code>leading</code> widget</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={showSubtitle} onChange={(e) => setShowSubtitle(e.target.checked)} className="w-4 h-4 rounded text-blue-600" />
              <span>Show <code>subtitle</code></span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={showTrailing} onChange={(e) => setShowTrailing(e.target.checked)} className="w-4 h-4 rounded text-blue-600" />
              <span>Show <code>trailing</code> widget</span>
            </label>
          </div>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="ListTile" />}>
            <div className="flex-1 bg-white pt-2">
              <div className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100">
                {showLeading && (
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-gray-900 font-medium text-[15px] truncate">John Doe</h4>
                  {showSubtitle && <p className="text-gray-500 text-sm truncate">Software Engineer</p>}
                </div>
                {showTrailing && (
                  <div className="text-gray-400 shrink-0">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
