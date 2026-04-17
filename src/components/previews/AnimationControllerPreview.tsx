import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useEffect, useRef, useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

type AnimationMode = 'stopped' | 'forward' | 'reverse' | 'repeat';

const CONTROLLER_DURATION_MS = 1400;

export function AnimationControllerPreview() {
  const { t } = useLanguage();
  const [mode, setMode] = useState<AnimationMode>('stopped');
  const [progress, setProgress] = useState(0);
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const repeatDirection = useRef<1 | -1>(1);

  useEffect(() => {
    if (mode === 'stopped') {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setProgress((current) => {
        const step = 16 / CONTROLLER_DURATION_MS;

        if (mode === 'forward') {
          const next = Math.min(1, current + step);
          if (next >= 1) {
            setMode('stopped');
          }
          return next;
        }

        if (mode === 'reverse') {
          const next = Math.max(0, current - step);
          if (next <= 0) {
            setMode('stopped');
          }
          return next;
        }

        let next = current + step * repeatDirection.current;
        if (next >= 1) {
          next = 1;
          repeatDirection.current = -1;
        }
        if (next <= 0) {
          next = 0;
          repeatDirection.current = 1;
        }
        return next;
      });
    }, 16);

    return () => window.clearInterval(interval);
  }, [mode]);

  const handlePlay = () => {
    repeatDirection.current = 1;
    setProgress((current) => (current >= 0.99 ? 0 : current));
    setMode('forward');
  };

  const handleReverse = () => {
    repeatDirection.current = -1;
    setProgress((current) => (current <= 0.01 ? 1 : current));
    setMode('reverse');
  };

  const handleRepeat = () => {
    repeatDirection.current = 1;
    setMode('repeat');
  };

  const handleStop = () => {
    setMode('stopped');
  };

  const ballOffset = 190 - progress * 150;

  const dartCode = `
import 'package:flutter/material.dart';

class BallDemo extends StatefulWidget {
  const BallDemo({super.key});

  @override
  State<BallDemo> createState() => _BallDemoState();
}

class _BallDemoState extends State<BallDemo>
    with SingleTickerProviderStateMixin {
  late final AnimationController controller;
  late final Animation<double> height;

  @override
  void initState() {
    super.initState();
    controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: ${CONTROLLER_DURATION_MS}),
    );
    height = Tween<double>(begin: 190, end: 40).animate(controller);
    ${mode === 'forward' ? 'controller.forward();' : mode === 'reverse' ? 'controller.reverse(from: 1.0);' : mode === 'repeat' ? 'controller.repeat(reverse: true);' : '// controller.stop();'}
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-lg">{t('animationControllerPanelTitle')}</h3>
            <p className="mt-2 text-sm text-gray-600">{t('animationControllerHint')}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <button onClick={handlePlay} className="rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white">
              {t('animPlay')}
            </button>
            <button onClick={handleReverse} className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white">
              {t('animReverse')}
            </button>
            <button onClick={handleRepeat} className="rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white">
              {t('animRepeat')}
            </button>
            <button onClick={handleStop} className="rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white">
              {t('animStop')}
            </button>
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('animationControllerChallengeGoal')}
          codePrefix={'  @override\n  void '}
          codeSuffix={'() {\n    controller.dispose();\n    super.dispose();\n  }'}
          answer={challengeAnswer}
          expectedAnswers={['dispose']}
          onChange={setChallengeAnswer}
          placeholder="methodName"
          successMessage={t('animationControllerSuccess')}
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={t('animationControllerTitle')} color="bg-violet-600" />}>
            <div className="flex-1 bg-slate-50 p-4">
              <div className="relative h-[310px] rounded-[28px] border border-slate-200 bg-white shadow-sm">
                <div className="absolute inset-x-0 bottom-6 h-3 rounded-full bg-slate-200" />
                <div
                  className="absolute left-1/2 h-12 w-12 -translate-x-1/2 rounded-full bg-violet-500 shadow-lg shadow-violet-300/60 transition-transform duration-75 linear"
                  style={{ transform: `translateX(-50%) translateY(${ballOffset}px)` }}
                />
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-sm font-semibold text-slate-700">
                  <span>{t('animValue')}</span>
                  <span>{progress.toFixed(2)}</span>
                </div>
                <div className="mt-3 h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-violet-500 transition-all duration-75"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
