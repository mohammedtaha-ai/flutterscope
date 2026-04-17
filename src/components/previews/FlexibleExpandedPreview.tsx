import React from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function FlexibleExpandedPreview() {
  const dartCode = `
import 'package:flutter/material.dart';

class ExpandedExample extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(color: Colors.blue, width: 50, height: 50),
        Expanded(
          child: Container(color: Colors.red, height: 50),
        ),
        Container(color: Colors.green, width: 50, height: 50),
      ],
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 text-purple-900 space-y-4">
          <h3 className="font-bold text-lg">Expanded takes the remaining space!</h3>
          <p className="text-sm leading-relaxed">
            In the code below, we have a Row with three containers. The first and last containers have a strict width of 50.
            But the middle container is wrapped in <code>Expanded</code>.
          </p>
          <p className="text-sm leading-relaxed">
            <code>Expanded</code> forces its child to expand to fill all available empty space along the main axis (horizontally here).
            This is critical for building responsive layouts!
          </p>
        </div>
        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Expanded Example" />}>
            <div className="flex-1 bg-gray-200 p-4">
              <div className="flex w-full bg-white h-20 items-center">
                <div className="bg-blue-500 w-[50px] h-12 flex items-center justify-center text-white text-xs font-bold shrink-0">50px</div>
                <div className="bg-red-500 flex-1 h-12 flex items-center justify-center text-white text-xs font-bold px-2 relative after:absolute after:inset-0 after:border-2 after:border-dashed after:border-white/50">
                  Expanded (fills rest)
                </div>
                <div className="bg-green-500 w-[50px] h-12 flex items-center justify-center text-white text-xs font-bold shrink-0">50px</div>
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
