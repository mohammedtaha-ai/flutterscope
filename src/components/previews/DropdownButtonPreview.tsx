import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function DropdownButtonPreview() {
  const { t } = useLanguage();
  const [val, setVal] = useState('Apple');

  const dartCode = `
import 'package:flutter/material.dart';

class MyDropdownScreen extends StatefulWidget {
  @override
  _MyDropdownScreenState createState() => _MyDropdownScreenState();
}

class _MyDropdownScreenState extends State<MyDropdownScreen> {
  String selectedValue = '${val}';
  final List<String> fruits = ['Apple', 'Banana', 'Orange', 'Mango'];

  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
      value: selectedValue,
      items: fruits.map((String fruit) {
        return DropdownMenuItem<String>(
          value: fruit,
          child: Text(fruit),
        );
      }).toList(),
      onChanged: (String? newValue) {
        setState(() {
          selectedValue = newValue!;
        });
      },
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg mb-4">{t('interactiveControls')}</h3>
          <p className="text-sm text-gray-500">Interact with the dropdown in the phone preview.</p>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="DropdownButton" />}>
            <div className="flex-1 bg-white p-8 flex flex-col items-center">
              
              <select 
                value={val} 
                onChange={(e) => setVal(e.target.value)}
                className="w-full px-4 py-3 border-b-2 border-gray-300 bg-white text-lg focus:outline-none focus:border-blue-500 cursor-pointer appearance-none"
                style={{ 
                  backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                <option value="Apple">Apple</option>
                <option value="Banana">Banana</option>
                <option value="Orange">Orange</option>
                <option value="Mango">Mango</option>
              </select>

              <div className="mt-12 text-center text-gray-500">
                You selected: <span className="block text-2xl font-bold text-blue-600 mt-2">{val}</span>
              </div>

            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
