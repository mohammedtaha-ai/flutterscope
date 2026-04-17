import React from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function RunAppPreview() {
  const dartCode = `
import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Text('Welcome to Flutter'),
    ),
  );
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 text-emerald-900 space-y-4">
          <h3 className="font-bold text-lg">The Entry Point</h3>
          <p className="text-sm leading-relaxed">
            Every Flutter app begins executing at the <code>main()</code> function.
          </p>
          <p className="text-sm leading-relaxed">
            Inside <code>main()</code>, we call <code>runApp()</code>. This function takes a Widget and tells Flutter to attach it to the screen to start the application!
          </p>
        </div>
        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <div className="w-full h-full bg-black flex items-start justify-start pt-12 pl-2">
            <span className="text-red-500 font-serif text-[10px] underline decoration-yellow-500">Welcome to Flutter</span>
          </div>
        </PhonePreview>
      </div>
    </div>
  );
}
