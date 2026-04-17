import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

type ImplementationMode = 'correct' | 'buggy';

interface TestCase {
  id: string;
  subtotal: number;
  taxRate: number;
  expected: number;
}

const TEST_CASES: TestCase[] = [
  { id: 'a', subtotal: 100, taxRate: 0.1, expected: 110 },
  { id: 'b', subtotal: 48, taxRate: 0.05, expected: 50.4 },
  { id: 'c', subtotal: 80, taxRate: 0.15, expected: 92 },
];

export function UnitTestingPreview() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<ImplementationMode>('correct');
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const calculateTotal = (subtotal: number, taxRate: number) => {
    if (mode === 'buggy') {
      return Number((subtotal + taxRate).toFixed(2));
    }

    return Number((subtotal + subtotal * taxRate).toFixed(2));
  };

  const testResults = TEST_CASES.map((testCase) => {
    const actual = calculateTotal(testCase.subtotal, testCase.taxRate);

    return {
      ...testCase,
      actual,
      passed: actual === testCase.expected,
    };
  });

  const sample = TEST_CASES[2];
  const sampleTotal = calculateTotal(sample.subtotal, sample.taxRate);

  const dartCode = `
double calculateTotal(double subtotal, double taxRate) {
  return ${mode === 'buggy' ? 'subtotal + taxRate;' : 'subtotal + (subtotal * taxRate);'};
}

void main() {
  test('adds tax to the subtotal', () {
    expect(calculateTotal(100, 0.10), 110.0);
  });
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-lg">{t('interactiveControls')}</h3>
            <p className="mt-2 text-sm text-gray-600">{t('unitTestingHint')}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={() => setMode('correct')}
              className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                mode === 'correct' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="font-semibold text-slate-900">{t('unitTestingCorrect')}</div>
            </button>
            <button
              onClick={() => setMode('buggy')}
              className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                mode === 'buggy' ? 'border-rose-500 bg-rose-50' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="font-semibold text-slate-900">{t('unitTestingBuggy')}</div>
            </button>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-slate-700">{t('unitTestingCases')}</div>

            {testResults.map((result) => (
              <div key={result.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-mono text-slate-700">
                    calculateTotal({result.subtotal}, {result.taxRate})
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      result.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {result.passed ? t('unitTestingPass') : t('unitTestingFail')}
                  </div>
                </div>

                <div className="mt-3 text-sm text-slate-600">
                  {t('unitTestingExpected')}: {result.expected.toFixed(2)} | {t('unitTestingActual')}: {result.actual.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('unitTestingChallengeGoal')}
          codePrefix={"test('adds tax to the subtotal', () {\n  "}
          codeSuffix={'(\n    calculateTotal(100, 0.10),\n    110.0,\n  );\n});'}
          answer={challengeAnswer}
          expectedAnswers={['expect']}
          onChange={setChallengeAnswer}
          placeholder="assertion"
          successMessage={t('unitTestingSuccess')}
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={t('unitTestingTitle')} color="bg-emerald-600" />}>
            <div className="flex-1 bg-slate-50 p-4 flex items-center justify-center">
              <div className="w-full rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <h4 className="font-bold text-slate-900">{t('unitTestingReceipt')}</h4>

                <div className="mt-5 space-y-3 text-sm text-slate-700">
                  <div className="flex items-center justify-between">
                    <span>{t('unitTestingSubtotal')}</span>
                    <span>${sample.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t('unitTestingTax')}</span>
                    <span>{(sample.taxRate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-px bg-slate-200" />
                  <div className="flex items-center justify-between text-base font-bold text-slate-900">
                    <span>{t('unitTestingTotal')}</span>
                    <span>${sampleTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
