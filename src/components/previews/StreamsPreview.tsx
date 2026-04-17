import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useEffect, useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';
import { AnimatePresence, motion } from 'motion/react';

interface StreamEvent {
  id: number;
  price: number;
}

export function StreamsPreview() {
  const { t } = useLanguage();
  const [price, setPrice] = useState(144.2);
  const [events, setEvents] = useState<StreamEvent[]>([
    { id: 1, price: 144.2 },
    { id: 2, price: 144.9 },
    { id: 3, price: 145.4 },
  ]);
  const [challengeAnswer, setChallengeAnswer] = useState('');

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPrice((current) => {
        const delta = (Math.random() - 0.5) * 3.2;
        const nextPrice = Number((current + delta).toFixed(2));
        setEvents((currentEvents) => {
          const nextEvent: StreamEvent = {
            id: currentEvents[0].id + 1,
            price: nextPrice,
          };

          return [nextEvent, ...currentEvents].slice(0, 5);
        });
        return nextPrice;
      });
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  const dartCode = `
import 'package:flutter/material.dart';

final priceStream = Stream<double>.periodic(
  const Duration(seconds: 2),
  (_) => ${price.toFixed(2)},
);

class PriceTicker extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<double>(
      stream: priceStream,
      builder: (context, snapshot) {
        final latest = snapshot.data ?? 0;

        return Text('\\$' + latest.toStringAsFixed(2));
      },
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-lg">{t('streamPipeLabel')}</h3>
            <p className="mt-2 text-sm text-gray-600">{t('streamEmitting')}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              <span>Stream</span>
              <div className="h-px flex-1 bg-slate-300" />
              <span>StreamBuilder</span>
            </div>

            <div className="relative mt-5 h-14 overflow-hidden rounded-full bg-white px-4">
              <motion.div
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-500"
                animate={{ x: ['0%', '420%'] }}
                transition={{ duration: 1.7, ease: 'linear', repeat: Infinity }}
              />
              <motion.div
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-500"
                animate={{ x: ['0%', '420%'] }}
                transition={{ duration: 1.7, ease: 'linear', repeat: Infinity, delay: 0.55 }}
              />
              <motion.div
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-amber-500"
                animate={{ x: ['0%', '420%'] }}
                transition={{ duration: 1.7, ease: 'linear', repeat: Infinity, delay: 1.1 }}
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {events.map((event) => (
                <div key={event.id} className="rounded-full bg-slate-900 px-3 py-1 text-xs font-mono text-white">
                  ${event.price.toFixed(2)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('streamChallengeGoal')}
          codePrefix={'return '}
          codeSuffix={'<double>(\n  stream: priceStream,\n  builder: (context, snapshot) => Text("price"),\n);'}
          answer={challengeAnswer}
          expectedAnswers={['StreamBuilder']}
          onChange={setChallengeAnswer}
          placeholder="widgetName"
          successMessage={t('streamSuccess')}
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={t('streamTicker')} color="bg-slate-900" />}>
            <div className="flex-1 bg-slate-950 p-4 flex items-center justify-center">
              <div className="w-full rounded-[28px] border border-slate-800 bg-slate-900 p-5 shadow-sm">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">FLTR</div>
                <div className="mt-3 text-sm text-slate-400">{t('streamPriceLabel')}</div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={price}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-4xl font-bold text-emerald-300"
                  >
                    ${price.toFixed(2)}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 rounded-2xl bg-slate-800 p-4 text-sm text-slate-300">
                  {t('streamEmitting')}
                </div>
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
