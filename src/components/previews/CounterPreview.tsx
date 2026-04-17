import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview, FlutterFloatingActionButton } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';
import { Plus } from 'lucide-react';

export function CounterPreview() {
  const [count, setCount] = useState(0);
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const handleChallengeChange = (val: string) => {
    setChallengeAnswer(val);
    if (val.trim() === 'setState') {
      setCount(prev => prev === 0 ? 1 : prev);
    }
  };

  const dartCode = `
import 'package:flutter/material.dart';

class CounterApp extends StatefulWidget {
  @override
  _CounterAppState createState() => _CounterAppState();
}

class _CounterAppState extends State<CounterApp> {
  int _counter = ${count}; // Current state

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Counter Example')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text('You have pushed the button this many times:'),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        child: Icon(Icons.add),
      ),
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* Explanation & Code */}
      <div className="flex-1 space-y-8">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-blue-900 space-y-4">
          <h3 className="font-bold text-lg">Interactive State!</h3>
          <p className="text-sm leading-relaxed">
            Unlike stateless widgets which are immutable (cannot change), <strong>StatefulWidgets</strong> hold state that might change during the widget's lifetime.
          </p>
          <p className="text-sm leading-relaxed">
            Click the floating action button on the preview phone. You will see the counter update in the preview <em>and</em> the Dart code update live to reflect the exact state. 
            When <code>setState()</code> is called, Flutter rebuilds the widget with the new data.
          </p>
          <button 
            onClick={() => setCount(0)}
            className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow-sm font-medium hover:bg-gray-50"
          >
            Reset Counter
          </button>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge 
          goal="Complete the missing function call that tells Flutter the state has changed and the screen needs to be redrawn."
          codePrefix={"  void _incrementCounter() {\n    "}
          codeSuffix={"(() {\n      _counter++;\n    });\n  }"}
          answer={challengeAnswer}
          expectedAnswers={['setState']}
          onChange={handleChallengeChange}
          placeholder="functionName"
          successMessage="Exactly! setState is the core mechanism in Flutter for triggering a UI update when variables change."
        />
      </div>

      {/* Phone Preview */}
      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Counter Example" />}>
            <div className="flex-1 flex flex-col items-center justify-center p-4 bg-white text-center">
              <p className="text-gray-600 mb-2">You have pushed the button this many times:</p>
              <p className="text-5xl text-gray-800" style={{ fontFamily: 'system-ui' }}>{count}</p>
            </div>
            {/* Simulated FAB */}
            <FlutterFloatingActionButton 
              icon={Plus} 
              onClick={() => setCount(c => c + 1)} 
            />
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
