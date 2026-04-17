import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

type BoxSize = 'small' | 'large';
type CornerStyle = 'sharp' | 'round';
type BoxColor = 'blue' | 'rose' | 'emerald' | 'amber';

const BOX_SIZES: Record<BoxSize, number> = {
  small: 92,
  large: 164,
};

const BORDER_RADII: Record<CornerStyle, number> = {
  sharp: 10,
  round: 42,
};

const COLOR_STYLES: Record<
  BoxColor,
  {
    previewClass: string;
    swatchClass: string;
    dartColor: string;
  }
> = {
  blue: {
    previewClass: 'bg-blue-500',
    swatchClass: 'bg-blue-500',
    dartColor: 'Colors.blue',
  },
  rose: {
    previewClass: 'bg-rose-500',
    swatchClass: 'bg-rose-500',
    dartColor: 'Colors.pink',
  },
  emerald: {
    previewClass: 'bg-emerald-500',
    swatchClass: 'bg-emerald-500',
    dartColor: 'Colors.green',
  },
  amber: {
    previewClass: 'bg-amber-500',
    swatchClass: 'bg-amber-500',
    dartColor: 'Colors.orange',
  },
};

export function AnimatedContainerPreview() {
  const { t } = useLanguage();
  const [boxSize, setBoxSize] = useState<BoxSize>('small');
  const [cornerStyle, setCornerStyle] = useState<CornerStyle>('sharp');
  const [boxColor, setBoxColor] = useState<BoxColor>('blue');
  const [durationMs, setDurationMs] = useState(450);
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const currentColor = COLOR_STYLES[boxColor];

  const dartCode = `
import 'package:flutter/material.dart';

class AnimatedBoxDemo extends StatefulWidget {
  const AnimatedBoxDemo({super.key});

  @override
  State<AnimatedBoxDemo> createState() => _AnimatedBoxDemoState();
}

class _AnimatedBoxDemoState extends State<AnimatedBoxDemo> {
  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: Duration(milliseconds: ${durationMs}),
      curve: Curves.easeInOut,
      width: ${BOX_SIZES[boxSize]}.0,
      height: ${BOX_SIZES[boxSize]}.0,
      decoration: BoxDecoration(
        color: ${currentColor.dartColor},
        borderRadius: BorderRadius.circular(${BORDER_RADII[cornerStyle]}.0),
      ),
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg">{t('interactiveControls')}</h3>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-gray-700">{t('animSize')}</div>
            <div className="flex gap-2">
              <button
                onClick={() => setBoxSize('small')}
                className={`rounded-xl px-4 py-2 font-semibold transition ${boxSize === 'small' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {t('animSmall')}
              </button>
              <button
                onClick={() => setBoxSize('large')}
                className={`rounded-xl px-4 py-2 font-semibold transition ${boxSize === 'large' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {t('animLarge')}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-gray-700">{t('animColor')}</div>
            <div className="flex gap-3">
              {(Object.keys(COLOR_STYLES) as BoxColor[]).map((color) => (
                <button
                  key={color}
                  onClick={() => setBoxColor(color)}
                  className={`h-10 w-10 rounded-full border-4 transition ${COLOR_STYLES[color].swatchClass} ${boxColor === color ? 'border-gray-900 scale-105' : 'border-white hover:scale-105'}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-gray-700">{t('animCorners')}</div>
            <div className="flex gap-2">
              <button
                onClick={() => setCornerStyle('sharp')}
                className={`rounded-xl px-4 py-2 font-semibold transition ${cornerStyle === 'sharp' ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {t('animSharp')}
              </button>
              <button
                onClick={() => setCornerStyle('round')}
                className={`rounded-xl px-4 py-2 font-semibold transition ${cornerStyle === 'round' ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                {t('animRound')}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 flex items-center justify-between text-sm font-semibold text-gray-700">
              <span>{t('animDuration')}</span>
              <span>{durationMs}ms</span>
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={durationMs}
              onChange={(event) => setDurationMs(Number(event.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('animatedContainerChallengeGoal')}
          codePrefix={'AnimatedContainer(\n  '}
          codeSuffix={': Duration(milliseconds: 400),\n  curve: Curves.easeInOut,\n)'}
          answer={challengeAnswer}
          expectedAnswers={['duration']}
          onChange={setChallengeAnswer}
          placeholder="parameter"
          successMessage={t('animatedContainerSuccess')}
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={t('animatedContainerTitle')} color="bg-blue-600" />}>
            <div className="flex-1 bg-slate-50 flex items-center justify-center">
              <div
                className={`${currentColor.previewClass} shadow-xl transition-all ease-in-out ${boxSize === 'large' ? 'shadow-blue-900/20' : 'shadow-slate-900/15'}`}
                style={{
                  width: `${BOX_SIZES[boxSize]}px`,
                  height: `${BOX_SIZES[boxSize]}px`,
                  borderRadius: `${BORDER_RADII[cornerStyle]}px`,
                  transitionDuration: `${durationMs}ms`,
                }}
              />
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
