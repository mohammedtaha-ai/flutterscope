import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

interface ClassMixins {
  swim: boolean;
  fly: boolean;
}

function buildClassCode(className: 'Bird' | 'Fish', mixins: ClassMixins) {
  const activeMixins = [mixins.swim ? 'Swimmable' : null, mixins.fly ? 'Flyable' : null].filter(Boolean);

  if (activeMixins.length === 0) {
    return `class ${className} {}`;
  }

  return `class ${className} with ${activeMixins.join(', ')} {}`;
}

function DiagramCard({
  className,
  mixins,
  emptyLabel,
}: {
  className: string;
  mixins: ClassMixins;
  emptyLabel: string;
}) {
  const activeMixins = [mixins.swim ? 'Swimmable' : null, mixins.fly ? 'Flyable' : null].filter(Boolean);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="font-mono text-sm font-semibold text-slate-900">{className}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        {activeMixins.length > 0 ? (
          activeMixins.map((mixin) => (
            <div
              key={mixin}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${mixin === 'Swimmable' ? 'bg-cyan-100 text-cyan-700' : 'bg-violet-100 text-violet-700'}`}
            >
              {mixin}
            </div>
          ))
        ) : (
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">{emptyLabel}</div>
        )}
      </div>
    </div>
  );
}

export function DartMixinsPreview() {
  const { t } = useLanguage();
  const [birdMixins, setBirdMixins] = useState<ClassMixins>({ swim: false, fly: true });
  const [fishMixins, setFishMixins] = useState<ClassMixins>({ swim: true, fly: false });
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const dartCode = `
mixin Swimmable {
  void swim() {}
}

mixin Flyable {
  void fly() {}
}

${buildClassCode('Bird', birdMixins)}
${buildClassCode('Fish', fishMixins)}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h3 className="font-bold text-lg">{t('mixinDiagram')}</h3>

          <div className="grid gap-3 md:grid-cols-2">
            <button
              onClick={() => setBirdMixins((value) => ({ ...value, swim: !value.swim }))}
              className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${birdMixins.swim ? 'border-cyan-300 bg-cyan-50 text-cyan-700' : 'border-slate-200 bg-white text-slate-700'}`}
            >
              {t('mixinsBirdSwim')}
            </button>
            <button
              onClick={() => setBirdMixins((value) => ({ ...value, fly: !value.fly }))}
              className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${birdMixins.fly ? 'border-violet-300 bg-violet-50 text-violet-700' : 'border-slate-200 bg-white text-slate-700'}`}
            >
              {t('mixinsBirdFly')}
            </button>
            <button
              onClick={() => setFishMixins((value) => ({ ...value, swim: !value.swim }))}
              className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${fishMixins.swim ? 'border-cyan-300 bg-cyan-50 text-cyan-700' : 'border-slate-200 bg-white text-slate-700'}`}
            >
              {t('mixinsFishSwim')}
            </button>
            <button
              onClick={() => setFishMixins((value) => ({ ...value, fly: !value.fly }))}
              className={`rounded-xl border px-4 py-3 text-left font-semibold transition ${fishMixins.fly ? 'border-violet-300 bg-violet-50 text-violet-700' : 'border-slate-200 bg-white text-slate-700'}`}
            >
              {t('mixinsFishFly')}
            </button>
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('mixinsChallengeGoal')}
          codePrefix={'class Bird '}
          codeSuffix={' Swimmable, Flyable {}'}
          answer={challengeAnswer}
          expectedAnswers={['with']}
          onChange={setChallengeAnswer}
          placeholder="keyword"
          successMessage={t('mixinsSuccess')}
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={t('mixinsTitle')} color="bg-violet-600" />}>
            <div className="flex-1 bg-slate-50 p-4 space-y-4">
              <DiagramCard className="Bird" mixins={birdMixins} emptyLabel={t('mixinsNone')} />
              <div className="flex justify-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">with</div>
              <DiagramCard className="Fish" mixins={fishMixins} emptyLabel={t('mixinsNone')} />
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
