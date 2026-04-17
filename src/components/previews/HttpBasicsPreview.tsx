import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

type HttpStage = 'idle' | 'loading' | 'success' | 'error';

interface RemoteUser {
  name: string;
  email: string;
  phone: string;
  website: string;
}

export function HttpBasicsPreview() {
  const { t } = useLanguage();
  const [stage, setStage] = useState<HttpStage>('idle');
  const [user, setUser] = useState<RemoteUser | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const handleRequest = async () => {
    setStage('loading');
    setUser(null);
    setStatusCode(null);

    try {
      const [response] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users/1'),
        new Promise((resolve) => window.setTimeout(resolve, 1500)),
      ]);

      setStatusCode(response.status);

      if (!response.ok) {
        setStage('error');
        return;
      }

      const data = (await response.json()) as RemoteUser;
      setUser(data);
      setStage('success');
    } catch {
      setStage('error');
    }
  };

  const dartCode = `
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<void> loadUser() async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/users/1'),
  );

  if (response.statusCode == 200) {
    final user = jsonDecode(response.body);
    setState(() => data = user);
  } else {
    throw Exception('Request failed');
  }
}
`;

  const flowSteps = [
    { key: 'request', label: t('httpRequestStage'), active: stage === 'idle' },
    { key: 'loading', label: t('httpLoading'), active: stage === 'loading' },
    { key: 'response', label: t('httpResponse'), active: stage === 'success' || stage === 'error' },
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <div className="flex flex-wrap gap-3">
            {flowSteps.map((step) => (
              <div
                key={step.key}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${step.active ? 'border-blue-300 bg-blue-50 text-blue-700' : 'border-slate-200 bg-slate-50 text-slate-500'}`}
              >
                {step.label}
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            https://jsonplaceholder.typicode.com/users/1
          </div>

          <button
            onClick={handleRequest}
            className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm"
          >
            {t('httpMakeRequest')}
          </button>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('httpChallengeGoal')}
          codePrefix={'if (response.'}
          codeSuffix={' == 200) {\n  final user = jsonDecode(response.body);\n}'}
          answer={challengeAnswer}
          expectedAnswers={['statusCode']}
          onChange={setChallengeAnswer}
          placeholder="property"
          successMessage={t('httpSuccess')}
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={t('httpPreviewTitle')} color="bg-blue-600" />}>
            <div className="flex-1 bg-slate-50 p-4 flex items-center justify-center">
              <div className="w-full rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                {stage === 'idle' && <div className="text-sm text-slate-500">{t('httpRequestHint')}</div>}
                {stage === 'loading' && <div className="text-sm font-semibold text-blue-600">{t('httpLoading')}</div>}
                {stage === 'error' && <div className="text-sm font-semibold text-red-600">{t('httpError')}</div>}

                {stage === 'success' && user && (
                  <div className="space-y-3 text-sm">
                    <div className="font-bold text-slate-900">{user.name}</div>
                    <div className="text-slate-600">{user.email}</div>
                    <div className="text-slate-600">{user.phone}</div>
                    <div className="text-slate-600">{user.website}</div>
                  </div>
                )}

                {statusCode !== null && (
                  <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
                    {t('httpStatusCode')}: {statusCode}
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
