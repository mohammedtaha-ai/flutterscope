import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

interface ParsedUser {
  name: string;
  age: number;
  email: string;
}

const DEFAULT_JSON = `{
  "name": "Maya",
  "age": 28,
  "email": "maya@example.com"
}`;

export function JsonSerializationPreview() {
  const { t } = useLanguage();
  const [jsonText, setJsonText] = useState(DEFAULT_JSON);
  const [challengeAnswer, setChallengeAnswer] = useState('');

  let parsedUser: ParsedUser | null = null;
  let isValid = true;

  try {
    const parsed = JSON.parse(jsonText) as Partial<ParsedUser>;
    parsedUser = {
      name: typeof parsed.name === 'string' ? parsed.name : '',
      age: typeof parsed.age === 'number' ? parsed.age : 0,
      email: typeof parsed.email === 'string' ? parsed.email : '',
    };
  } catch {
    isValid = false;
  }

  const dartCode = `
import 'dart:convert';

class User {
  User({
    required this.name,
    required this.age,
    required this.email,
  });

  final String name;
  final int age;
  final String email;

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      name: json['name'] ?? '',
      age: json['age'] ?? 0,
      email: json['email'] ?? '',
    );
  }
}

final userMap = jsonDecode(responseBody) as Map<String, dynamic>;
final user = User.fromJson(userMap);
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <label className="block">
            <div className="mb-3 font-bold text-lg">{t('jsonEditorLabel')}</div>
            <textarea
              value={jsonText}
              onChange={(event) => setJsonText(event.target.value)}
              className="h-56 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              spellCheck={false}
            />
          </label>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('jsonChallengeGoal')}
          codePrefix={'factory User.'}
          codeSuffix={'(Map<String, dynamic> json) {\n  return User(...);\n}'}
          answer={challengeAnswer}
          expectedAnswers={['fromJson']}
          onChange={setChallengeAnswer}
          placeholder="constructorName"
          successMessage={t('jsonSuccess')}
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={t('jsonPreviewTitle')} color="bg-emerald-600" />}>
            <div className="flex-1 bg-slate-50 p-4 flex items-center justify-center">
              <div className="w-full rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <h4 className="font-bold text-slate-900">{t('jsonParsedLabel')}</h4>

                {isValid && parsedUser ? (
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <div className="font-mono text-slate-500">name</div>
                      <div className="mt-1 font-semibold text-slate-900">{parsedUser.name || '""'}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <div className="font-mono text-slate-500">age</div>
                      <div className="mt-1 font-semibold text-slate-900">{parsedUser.age}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3">
                      <div className="font-mono text-slate-500">email</div>
                      <div className="mt-1 font-semibold text-slate-900">{parsedUser.email || '""'}</div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                    {t('jsonInvalid')}
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
