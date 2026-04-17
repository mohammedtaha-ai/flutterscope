import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useEffect, useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';
import { AnimatePresence, motion } from 'motion/react';

function ListCard({
  open,
  onOpen,
  title,
  buttonLabel,
  layoutId,
}: {
  open: boolean;
  onOpen: () => void;
  title: string;
  buttonLabel: string;
  layoutId: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      {open ? (
        <div className="h-28 rounded-2xl border border-dashed border-slate-200 bg-slate-50" />
      ) : (
        <motion.div layoutId={layoutId} className="h-28 rounded-2xl bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500" />
      )}
      <h4 className="mt-4 font-semibold text-slate-900">{title}</h4>
      <button
        onClick={onOpen}
        className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
      >
        {buttonLabel}
      </button>
    </div>
  );
}

function DetailCard({
  open,
  onBack,
  title,
  backLabel,
  layoutId,
}: {
  open: boolean;
  onBack: () => void;
  title: string;
  backLabel: string;
  layoutId: string;
}) {
  return (
    <div className="h-full rounded-none bg-white">
      <div className="p-4">
        {open ? (
          <motion.div layoutId={layoutId} className="h-36 rounded-3xl bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500" />
        ) : (
          <div className="h-36 rounded-3xl border border-dashed border-slate-200 bg-slate-50" />
        )}

        <h4 className="mt-4 text-xl font-bold text-slate-900">{title}</h4>
        <p className="mt-2 text-sm leading-6 text-slate-500">Hero(tag: 'product-hero')</p>
        <button
          onClick={onBack}
          className="mt-6 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
        >
          {backLabel}
        </button>
      </div>
    </div>
  );
}

export function HeroAnimationPreview() {
  const { t } = useLanguage();
  const [detailOpen, setDetailOpen] = useState(false);
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const [wideLayout, setWideLayout] = useState(false);

  useEffect(() => {
    const syncLayout = () => {
      setWideLayout(window.innerWidth >= 900);
    };

    syncLayout();
    window.addEventListener('resize', syncLayout);
    return () => window.removeEventListener('resize', syncLayout);
  }, []);

  const dartCode = `
Hero(
  tag: 'product-hero',
  child: ProductImageCard(),
)

Navigator.push(
  context,
  MaterialPageRoute(builder: (_) => const ProductDetailScreen()),
);

Hero(
  tag: 'product-hero',
  child: DetailHeaderImage(),
)
`;

  const layoutId = 'hero-product-card';

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h3 className="font-bold text-lg">{t('interactiveControls')}</h3>
          <p className="text-sm text-gray-600">{t('heroHint')}</p>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('heroChallengeGoal')}
          codePrefix={'Hero(\n  '}
          codeSuffix={": 'product-hero',\n  child: ProductImageCard(),\n)"}
          answer={challengeAnswer}
          expectedAnswers={['tag']}
          onChange={setChallengeAnswer}
          placeholder="property"
          successMessage={t('heroSuccess')}
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview className="w-[340px] md:w-[640px]">
          {wideLayout ? (
            <FlutterScaffold appBar={<FlutterAppBar title={t('heroAnimationTitle')} color="bg-slate-900" />}>
              <div className="flex-1 bg-slate-100 md:flex">
                <div className="flex-1 border-r border-slate-200 bg-white p-4">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t('heroScreen1')}</div>
                  <ListCard
                    open={detailOpen}
                    onOpen={() => setDetailOpen(true)}
                    title={t('heroProductTitle')}
                    buttonLabel={t('heroViewDetail')}
                    layoutId={layoutId}
                  />
                </div>
                <div className="flex-1 bg-white">
                  <div className="border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t('heroScreen2')}</div>
                  <DetailCard
                    open={detailOpen}
                    onBack={() => setDetailOpen(false)}
                    title={t('heroProductTitle')}
                    backLabel={t('heroGoBack')}
                    layoutId={layoutId}
                  />
                </div>
              </div>
            </FlutterScaffold>
          ) : (
            <FlutterScaffold appBar={<FlutterAppBar title={t('heroAnimationTitle')} color="bg-slate-900" />}>
              <div className="relative flex-1 overflow-hidden bg-slate-100">
                <AnimatePresence initial={false} mode="wait">
                  {!detailOpen ? (
                    <motion.div
                      key="hero-list"
                      initial={{ x: '-8%', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: '-8%', opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 bg-white p-4"
                    >
                      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t('heroScreen1')}</div>
                      <ListCard
                        open={false}
                        onOpen={() => setDetailOpen(true)}
                        title={t('heroProductTitle')}
                        buttonLabel={t('heroViewDetail')}
                        layoutId={layoutId}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hero-detail"
                      initial={{ x: '12%', opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: '12%', opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 bg-white"
                    >
                      <div className="border-b border-slate-200 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{t('heroScreen2')}</div>
                      <DetailCard
                        open={true}
                        onBack={() => setDetailOpen(false)}
                        title={t('heroProductTitle')}
                        backLabel={t('heroGoBack')}
                        layoutId={layoutId}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FlutterScaffold>
          )}
        </PhonePreview>
      </div>
    </div>
  );
}
