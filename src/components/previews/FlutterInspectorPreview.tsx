import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

type InspectorNode = 'padding' | 'card' | 'text';

export function FlutterInspectorPreview() {
  const { t } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<InspectorNode>('card');
  const [showPadding, setShowPadding] = useState(true);
  const [showConstraints, setShowConstraints] = useState(false);
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const nodeLabel =
    selectedNode === 'padding'
      ? t('inspectorPaddingNode')
      : selectedNode === 'card'
        ? t('inspectorCardNode')
        : t('inspectorTextNode');
  const treePath = [t('inspectorScaffoldNode'), t('inspectorPaddingNode'), t('inspectorCardNode'), t('inspectorTextNode')].join(
    ' > '
  );

  const dartCode = `
class ProfileCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Card(
        child: Text('FlutterScope Debug Card'),
      ),
    );
  }
}

// Open Flutter Inspector in DevTools
// to inspect padding, constraints, and the widget tree.
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-lg">{t('interactiveControls')}</h3>
            <p className="mt-2 text-sm text-gray-600">{t('inspectorHint')}</p>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold text-slate-700">{t('inspectorSelectWidget')}</div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {(['padding', 'card', 'text'] as InspectorNode[]).map((node) => {
                const label =
                  node === 'padding'
                    ? t('inspectorPaddingNode')
                    : node === 'card'
                      ? t('inspectorCardNode')
                      : t('inspectorTextNode');

                return (
                  <button
                    key={node}
                    onClick={() => setSelectedNode(node)}
                    className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                      selectedNode === node ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="font-semibold text-slate-900">{label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={() => setShowPadding((current) => !current)}
              className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                showPadding ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="font-semibold text-slate-900">{t('inspectorShowPadding')}</div>
            </button>
            <button
              onClick={() => setShowConstraints((current) => !current)}
              className={`rounded-2xl border px-4 py-4 text-left transition-all ${
                showConstraints ? 'border-violet-500 bg-violet-50' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="font-semibold text-slate-900">{t('inspectorShowConstraints')}</div>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-700">{t('inspectorTreePath')}</div>
            <div className="mt-3 font-mono text-sm text-slate-600">{treePath}</div>
            <div className="mt-4 text-sm text-slate-700">
              {t('inspectorSelectedWidget')}: <span className="font-semibold text-slate-900">{nodeLabel}</span>
            </div>
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('inspectorChallengeGoal')}
          codePrefix={'Flutter '}
          codeSuffix={' lets you inspect the widget tree and layout details in DevTools.'}
          answer={challengeAnswer}
          expectedAnswers={['Inspector']}
          onChange={setChallengeAnswer}
          placeholder="toolName"
          successMessage={t('inspectorSuccess')}
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={t('inspectorTitle')} color="bg-cyan-600" />}>
            <div className="flex-1 bg-slate-100 p-4">
              <div
                className={`relative rounded-[30px] p-4 transition-all ${
                  selectedNode === 'padding' ? 'ring-2 ring-cyan-500 ring-offset-2 ring-offset-slate-100' : ''
                } ${showPadding ? 'bg-amber-100/70' : 'bg-transparent'}`}
              >
                <div
                  className={`rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition-all ${
                    selectedNode === 'card' ? 'ring-2 ring-cyan-500' : ''
                  }`}
                >
                  <div
                    className={`rounded-2xl bg-slate-50 p-4 transition-all ${
                      selectedNode === 'text' ? 'ring-2 ring-cyan-500 bg-cyan-50' : ''
                    }`}
                  >
                    <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{t('inspectorCardNode')}</div>
                    <div className="mt-3 text-lg font-bold text-slate-900">{t('inspectorSampleTitle')}</div>
                    <div className="mt-2 text-sm text-slate-600">{t('inspectorSampleBody')}</div>
                  </div>
                </div>

                {showConstraints ? (
                  <div className="absolute right-4 top-4 rounded-full bg-violet-600 px-3 py-1 text-[11px] font-semibold text-white">
                    {t('inspectorConstraintsValue')}
                  </div>
                ) : null}
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                <div>
                  {t('inspectorSelectedWidget')}: <span className="font-semibold text-slate-900">{nodeLabel}</span>
                </div>
                {showPadding ? (
                  <div className="mt-2">
                    {t('inspectorPaddingValue')}: <span className="font-semibold text-slate-900">16 px</span>
                  </div>
                ) : null}
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
