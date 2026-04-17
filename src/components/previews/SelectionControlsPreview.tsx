import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function SelectionControlsPreview() {
  const { t } = useLanguage();
  const [useCheckbox, setUseCheckbox] = useState(true);
  const [useSwitch, setUseSwitch] = useState(false);
  const [radioVal, setRadioVal] = useState(1);

  const dartCode = `
import 'package:flutter/material.dart';

class SelectionScreen extends StatefulWidget {
  @override
  _SelectionScreenState createState() => _SelectionScreenState();
}

class _SelectionScreenState extends State<SelectionScreen> {
  bool _isChecked = ${useCheckbox};
  bool _isSwitched = ${useSwitch};
  int _radioVal = ${radioVal};

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Checkbox(
          value: _isChecked,
          onChanged: (val) => setState(() => _isChecked = val!),
        ),
        Switch(
          value: _isSwitched,
          onChanged: (val) => setState(() => _isSwitched = val),
        ),
        Row(
          children: [
            Radio(value: 1, groupValue: _radioVal, onChanged: (v) => setState(() => _radioVal = v!)),
            Radio(value: 2, groupValue: _radioVal, onChanged: (v) => setState(() => _radioVal = v!)),
          ]
        )
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
          <p className="text-sm text-gray-500">Interact with the phone directly to see state changes.</p>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Selection" />}>
            <div className="flex-1 bg-white p-4 space-y-6">
              
              <div className="flex justify-between items-center px-2 py-4 border-b">
                <span className="text-lg">Checkbox</span>
                <input 
                  type="checkbox" 
                  checked={useCheckbox} 
                  onChange={(e) => setUseCheckbox(e.target.checked)} 
                  className="w-6 h-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>

              <div className="flex justify-between items-center px-2 py-4 border-b">
                <span className="text-lg">Switch</span>
                <button 
                  onClick={() => setUseSwitch(!useSwitch)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors relative \${useSwitch ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform \${useSwitch ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="px-2 py-4">
                <span className="text-lg block mb-4">Radio Group</span>
                <div className="flex flex-col gap-4">
                  <label className="flex items-center gap-4 cursor-pointer">
                    <input 
                      type="radio" 
                      name="radioGroup" 
                      checked={radioVal === 1} 
                      onChange={() => setRadioVal(1)} 
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Option 1</span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer">
                    <input 
                      type="radio" 
                      name="radioGroup" 
                      checked={radioVal === 2} 
                      onChange={() => setRadioVal(2)} 
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Option 2</span>
                  </label>
                </div>
              </div>

            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
