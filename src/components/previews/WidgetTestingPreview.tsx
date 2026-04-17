import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useEffect, useRef, useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

type TestStatus = 'idle' | 'running' | 'passed';

const TEST_STEP_KEYS = ['pump', 'tap', 'expect'] as const;

type TestStepKey = (typeof TEST_STEP_KEYS)[number];

export function WidgetTestingPreview() {
  const { t } = useLanguage();
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<TestStatus>('idle');
  const [activeStep, setActiveStep] = useState<TestStepKey | null>(null);
  const [completedSteps, setCompletedSteps] = useState<TestStepKey[]>([]);
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const timeoutIds = useRef<number[]>([]);

  const clearQueuedSteps = () => {
    timeoutIds.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutIds.current = [];
  };

  useEffect(() => clearQueuedSteps, []);

  const queueStep = (callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(callback, delay);
    timeoutIds.current.push(timeoutId);
  };

  const handleReset = () => {
    clearQueuedSteps();
    setCount(0);
    setStatus('idle');
    setActiveStep(null);
    setCompletedSteps([]);
  };

  const handleRunTest = () => {
    handleReset();
    setStatus('running');

    queueStep(() => {
      setActiveStep('pump');
      setCompletedSteps(['pump']);
    }, 250);

    queueStep(() => {
      setActiveStep('tap');
      setCount(1);
      setCompletedSteps(['pump', 'tap']);
    }, 900);

    queueStep(() => {
      setActiveStep('expect');
      setCompletedSteps(['pump', 'tap', 'expect']);
    }, 1550);

    queueStep(() => {
      setStatus('passed');
      setActiveStep(null);
    }, 2150);
  };

  const steps: Array<{ key: TestStepKey; label: string }> = [
    { key: 'pump', label: t('widgetTestingStepPump') },
    { key: 'tap', label: t('widgetTestingStepTap') },
    { key: 'expect', label: t('widgetTestingStepExpect') },
  ];

  const statusLabel =
    status === 'running' ? t('widgetTestingRunning') : status === 'passed' ? t('widgetTestingPassed') : t('widgetTestingIdle');

  const statusClass =
    status === 'running'
      ? 'bg-amber-100 text-amber-800'
      : status === 'passed'
        ? 'bg-emerald-100 text-emerald-800'
        : 'bg-slate-100 text-slate-700';

  const dartCode = `
import 'package:flutter_test/flutter_test.dart';
import 'package:my_app/main.dart';

void main() {
  testWidgets('counter increments when tapped', (tester) async {
    await tester.pumpWidget(const MyApp());
    await tester.tap(find.text('Increment'));
    await tester.pump();

    expect(find.text('${count}'), findsOneWidget);
  });
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-lg">{t('interactiveControls')}</h3>
              <p className="mt-2 text-sm text-gray-600">{t('widgetTestingHint')}</p>
            </div>
            <div className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}>{statusLabel}</div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleRunTest}
              className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              {t('widgetTestingRun')}
            </button>
            <button
              onClick={handleReset}
              className="rounded-xl bg-slate-100 px-4 py-3 font-semibold text-slate-800 transition-colors hover:bg-slate-200"
            >
              {t('widgetTestingReset')}
            </button>
          </div>

          <div className="grid gap-3">
            {steps.map((step, index) => {
              const isActive = activeStep === step.key;
              const isDone = completedSteps.includes(step.key);

              return (
                <div
                  key={step.key}
                  className={`rounded-2xl border px-4 py-3 transition-all ${
                    isActive
                      ? 'border-blue-500 bg-blue-50'
                      : isDone
                        ? 'border-emerald-300 bg-emerald-50'
                        : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                        isDone ? 'bg-emerald-500 text-white' : isActive ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="text-sm font-semibold text-slate-800">{step.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('widgetTestingChallengeGoal')}
          codePrefix={"void main() {\n  "}
          codeSuffix={"('counter increments when tapped', (tester) async {\n    await tester.pumpWidget(const MyApp());\n  });\n}"}
          answer={challengeAnswer}
          expectedAnswers={['testWidgets']}
          onChange={setChallengeAnswer}
          placeholder="testFunction"
          successMessage={t('widgetTestingSuccess')}
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={t('widgetTestingTitle')} color="bg-blue-700" />}>
            <div className="flex-1 bg-slate-50 p-4 flex items-center justify-center">
              <div className="w-full rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-sm text-slate-500">{t('widgetTestingCounter')}</div>
                <div className="mt-2 text-5xl font-bold text-slate-900">{count}</div>

                <button
                  onClick={() => setCount((current) => current + 1)}
                  className="mt-6 w-full rounded-2xl bg-blue-600 px-4 py-4 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  {t('widgetTestingIncrement')}
                </button>
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
