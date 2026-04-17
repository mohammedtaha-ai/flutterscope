import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';

export function FormValidationPreview() {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorVisible(true);
    } else {
      setErrorVisible(false);
      alert('Form Validated!');
    }
  };

  const dartCode = `
import 'package:flutter/material.dart';

class MyForm extends StatefulWidget {
  @override
  _MyFormState createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            decoration: InputDecoration(labelText: 'Name'),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter some text';
              }
              return null; // Valid
            },
          ),
          ElevatedButton(
            onPressed: () {
              if (_formKey.currentState!.validate()) {
                print("Form is valid");
              }
            },
            child: Text('Submit'),
          ),
        ],
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
          <p className="text-sm text-gray-500">Leave the field empty and click Submit to see the validation error.</p>
        </div>

        <CodeView code={dartCode} />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title="Form Validation" />}>
            <div className="flex-1 bg-white p-6">
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className={`border-b-2 pb-2 transition-colors \${errorVisible ? 'border-red-500' : 'border-gray-400 focus-within:border-blue-500'}`}>
                    <label className={`block text-xs font-medium mb-1 transition-colors \${errorVisible ? 'text-red-500' : 'text-gray-600'}`}>Name</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errorVisible) setErrorVisible(false);
                      }}
                      className="w-full text-lg outline-none"
                    />
                  </div>
                  {errorVisible && <p className="text-xs text-red-500 mt-1">Please enter some text</p>}
                </div>
                
                <div className="flex justify-center pt-4">
                  <button type="submit" className="bg-blue-600 text-white px-8 py-2.5 rounded shadow hover:bg-blue-700 transition-colors font-medium">
                    Submit
                  </button>
                </div>
              </form>

            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
