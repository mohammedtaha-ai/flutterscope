import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';
import { AnimatePresence, motion } from 'motion/react';
import { Heart } from 'lucide-react';

export function ValueNotifierPreview() {
  const { t } = useLanguage();
  const [likes, setLikes] = useState(24);
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const [flashKey, setFlashKey] = useState(0);

  const handleLike = () => {
    setLikes((value) => value + 1);
    setFlashKey((value) => value + 1);
  };

  const dartCode = `
import 'package:flutter/material.dart';

class LikeCard extends StatefulWidget {
  const LikeCard({super.key});

  @override
  State<LikeCard> createState() => _LikeCardState();
}

class _LikeCardState extends State<LikeCard> {
  final likes = ValueNotifier<int>(${likes});

  @override
  void dispose() {
    likes.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        IconButton(
          onPressed: () => likes.value++,
          icon: const Icon(Icons.favorite),
        ),
        ValueListenableBuilder<int>(
          valueListenable: likes,
          builder: (_, value, __) {
            return Text('${t('valueNotifierLikes')}: ' + value.toString());
          },
        ),
      ],
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
          <h3 className="font-bold text-lg">{t('interactiveControls')}</h3>
          <p className="text-sm text-gray-600">{t('valueNotifierHint')}</p>
          <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-4">
            <p className="text-sm text-rose-700">{t('valueNotifierRebuildNote')}</p>
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('valueNotifierChallengeGoal')}
          codePrefix={'        '}
          codeSuffix={'<int>(\n          valueListenable: likes,\n          builder: (_, value, __) => Text("$value"),\n        )'}
          answer={challengeAnswer}
          expectedAnswers={['ValueListenableBuilder']}
          onChange={setChallengeAnswer}
          placeholder="widgetName"
          successMessage={t('valueNotifierSuccess')}
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={t('valueNotifierTitle')} color="bg-rose-500" />}>
            <div className="flex-1 bg-rose-50/50 p-4 flex items-center justify-center">
              <div className="w-full rounded-[28px] border border-rose-100 bg-white p-5 shadow-sm">
                <div className="mb-4 rounded-2xl bg-gradient-to-br from-rose-100 to-orange-100 p-4">
                  <h4 className="font-semibold text-slate-900">{t('valueNotifierPostTitle')}</h4>
                  <p className="mt-2 text-sm text-slate-600">{t('valueNotifierPostBody')}</p>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={handleLike}
                    className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                    {t('likeButton')}
                  </button>

                  <div className="text-right">
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-400">{t('valueNotifierRebuildLabel')}</div>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={flashKey}
                        initial={{ scale: 0.92, backgroundColor: 'rgba(244, 63, 94, 0.18)' }}
                        animate={{ scale: 1, backgroundColor: 'rgba(244, 63, 94, 0.06)' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="mt-1 rounded-xl px-3 py-2 text-sm font-semibold text-rose-700"
                      >
                        {t('valueNotifierLikes')}: {likes}
                      </motion.div>
                    </AnimatePresence>
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
