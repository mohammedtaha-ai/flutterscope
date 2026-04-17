import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function ReusableWidgetsPreview() {
  const { t } = useLanguage();
  const [extracted, setExtracted] = useState(false);

  const beforeCode = `
import 'package:flutter/material.dart';

class MyList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // ❌ REPEATED CODE
        Container(
          padding: EdgeInsets.all(16),
          color: Colors.blue,
          child: Text('Item 1', style: TextStyle(color: Colors.white)),
        ),
        SizedBox(height: 10),
        // ❌ REPEATED CODE AGAIN!
        Container(
          padding: EdgeInsets.all(16),
          color: Colors.blue,
          child: Text('Item 2', style: TextStyle(color: Colors.white)),
        ),
      ],
    );
  }
}
`;

  const afterCode = `
import 'package:flutter/material.dart';

// ✅ EXTRACTED WIDGET
class MyCustomCard extends StatelessWidget {
  final String text; // Parameter!

  MyCustomCard({required this.text});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16),
      color: Colors.blue,
      child: Text(text, style: TextStyle(color: Colors.white)),
    );
  }
}

class MyList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        MyCustomCard(text: 'Item 1'), // ✅ CLEAN
        SizedBox(height: 10),
        MyCustomCard(text: 'Item 2'), // ✅ CLEAN
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
          
          <div className="flex gap-4">
             <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={!extracted} onChange={() => setExtracted(false)} className="w-4 h-4 text-blue-600" />
              <span>Repeated Code (Messy)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={extracted} onChange={() => setExtracted(true)} className="w-4 h-4 text-blue-600" />
              <span>Extracted Custom Widget (Clean)</span>
            </label>
          </div>
        </div>

        <CodeView code={extracted ? afterCode : beforeCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Reusable Widgets" />}>
            <div className="flex-1 bg-gray-100 p-4">
              <div className="flex flex-col gap-4">
                {/* Visually the exact same! That's the point of refactoring. */}
                <div className="p-4 bg-blue-600 text-white rounded font-medium shadow-sm flex items-center justify-between">
                  Item 1
                  {extracted && <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">MyCustomCard</span>}
                </div>
                <div className="p-4 bg-blue-600 text-white rounded font-medium shadow-sm flex items-center justify-between">
                  Item 2
                  {extracted && <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">MyCustomCard</span>}
                </div>
                <div className="p-4 bg-blue-600 text-white rounded font-medium shadow-sm flex items-center justify-between">
                  Item 3
                  {extracted && <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono">MyCustomCard</span>}
                </div>
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
