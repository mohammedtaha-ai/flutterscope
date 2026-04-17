import React from 'react';
import { FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function ScaffoldPreview() {
  const dartCode = `
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Scaffold Structure'),
        ),
        body: Center(
          child: Text('This is the body!'),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {},
          child: Icon(Icons.add),
        ),
      ),
    ),
  );
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-sky-50 p-6 rounded-2xl border border-sky-100 text-sky-900 space-y-4">
          <h3 className="font-bold text-lg">The Scaffold Grid</h3>
          <p className="text-sm leading-relaxed">
            Without <code>Scaffold</code>, your app looks like an ugly unstyled black screen (like the previous lesson!).
          </p>
          <p className="text-sm leading-relaxed">
            The <code>Scaffold</code> widget automatically provides the standard white background, and gives you neat "slots" to drop in an <code>appBar</code>, a <code>body</code>, and a <code>floatingActionButton</code>.
          </p>
        </div>
        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold 
            appBar={
              <div className="relative bg-blue-500 border-b-2 border-blue-600 text-white h-14 flex items-center px-4 shrink-0 shadow-md z-20">
                <div className="absolute -left-12 -top-4 text-xs font-bold text-blue-700 bg-white px-2 py-1 flex items-center gap-1 rounded shadow-lg border-2 border-blue-200">
                  AppBar
                </div>
                <span className="font-medium text-lg tracking-wide">Scaffold Structure</span>
              </div>
            }
          >
            <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-800 font-medium relative">
              <div className="absolute inset-0 border-4 border-dashed border-sky-200/50 m-2 flex flex-col pointer-events-none">
                 <div className="absolute top-2 left-2 text-[10px] text-sky-500 font-bold uppercase tracking-wider bg-white px-1">Body</div>
              </div>
              This is the body!
            </div>
            {/* Simulated FAB */}
            <div className="absolute bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full shadow-lg border-2 border-blue-400 flex items-center justify-center group relative cursor-pointer z-20">
              <span className="text-white text-2xl font-light">+</span>
              <div className="absolute -top-6 -right-8 text-[10px] text-blue-700 bg-white px-2 py-1 flex items-center font-bold uppercase tracking-wider rounded border border-blue-200 shadow">
                FAB
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
