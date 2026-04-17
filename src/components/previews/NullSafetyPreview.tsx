import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';
import { AnimatePresence, motion } from 'motion/react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

type NullSafetyTab = 'question' | 'bang' | 'fallback' | 'late';

export function NullSafetyPreview() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<NullSafetyTab>('question');
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const scenarios: Record<
    NullSafetyTab,
    {
      tabLabel: string;
      description: string;
      safe: boolean;
      code: string;
    }
  > = {
    question: {
      tabLabel: '?',
      description: t('nullSafetyQuestionDesc'),
      safe: true,
      code: `String? nickname;\nprint(nickname?.length);`,
    },
    bang: {
      tabLabel: '!',
      description: t('nullSafetyBangDesc'),
      safe: false,
      code: `String? nickname;\nprint(nickname!.length);`,
    },
    fallback: {
      tabLabel: '??',
      description: t('nullSafetyFallbackDesc'),
      safe: true,
      code: `String? nickname;\nfinal displayName = nickname ?? 'Guest';`,
    },
    late: {
      tabLabel: 'late',
      description: t('nullSafetyLateDesc'),
      safe: true,
      code: `late String token;\ntoken = 'ready';\nprint(token);`,
    },
  };

  const currentScenario = scenarios[activeTab];

  const dartCode = `
void main() {
  ${currentScenario.code
    .split('\n')
    .map((line) => `  ${line}`)
    .join('\n')}
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <h3 className="font-bold text-lg">{t('interactiveControls')}</h3>

          <div className="flex flex-wrap gap-2">
            {(Object.keys(scenarios) as NullSafetyTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl border px-4 py-2 font-semibold transition ${activeTab === tab ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                {scenarios[tab].tabLabel}
              </button>
            ))}
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('nullSafetyChallengeGoal')}
          codePrefix={'final displayName = nickname '}
          codeSuffix={" 'Guest';"}
          answer={challengeAnswer}
          expectedAnswers={['??']}
          onChange={setChallengeAnswer}
          placeholder="operator"
          successMessage={t('nullSafetySuccess')}
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={t('nullSafetyTitle')} color="bg-slate-800" />}>
            <div className="flex-1 bg-slate-50 p-4 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.25 }}
                  className="w-full rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${currentScenario.safe ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {currentScenario.safe ? <ShieldCheck className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                    {currentScenario.safe ? t('nullSafeTab') : t('crashTab')}
                  </div>

                  <div className="mt-4 rounded-2xl bg-[#111827] p-4 font-mono text-sm text-blue-200">
                    <div className="whitespace-pre-wrap">{currentScenario.code}</div>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">{currentScenario.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
