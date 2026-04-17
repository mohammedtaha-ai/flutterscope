import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';
import { ShoppingCart } from 'lucide-react';

export function ProviderBasicsPreview() {
  const { t } = useLanguage();
  const [cartCount, setCartCount] = useState(0);
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const [flashState, setFlashState] = useState(0);

  const products = [t('providerProductOne'), t('providerProductTwo'), t('providerProductThree')];

  const triggerVisualUpdate = () => {
    setFlashState((value) => value + 1);
  };

  const addToCart = () => {
    setCartCount((value) => value + 1);
    triggerVisualUpdate();
  };

  const handleChallengeChange = (value: string) => {
    setChallengeAnswer(value);
    if (value.trim().toLowerCase() === 'notifylisteners') {
      triggerVisualUpdate();
    }
  };

  const dartCode = `
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CartModel extends ChangeNotifier {
  int itemCount = ${cartCount};

  void addItem() {
    itemCount++;
    notifyListeners();
  }
}

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => CartModel(),
      child: const StoreApp(),
    ),
  );
}

class StoreApp extends StatelessWidget {
  const StoreApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Provider'),
        actions: [
          Consumer<CartModel>(
            builder: (_, cart, __) => Padding(
              padding: const EdgeInsets.all(12),
              child: Text('${t('cartBadge')}: ' + cart.itemCount.toString()),
            ),
          ),
        ],
      ),
      body: ListView(
        children: [
          ElevatedButton(
            onPressed: () => context.read<CartModel>().addItem(),
            child: Text('${t('addToCart')}'),
          ),
        ],
      ),
    );
  }
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
          <div>
            <h3 className="font-bold text-lg">{t('interactiveControls')}</h3>
            <p className="mt-2 text-sm text-gray-600">{t('providerTapProductHint')}</p>
          </div>

          <div className={`rounded-2xl border p-4 transition-all ${flashState % 2 === 0 ? 'border-blue-200 bg-blue-50/80' : 'border-emerald-200 bg-emerald-50/80'}`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">{t('providerCartModelTitle')}</p>
                <h4 className="mt-1 text-xl font-bold text-gray-900">CartModel extends ChangeNotifier</h4>
              </div>
              <div className="rounded-full bg-gray-900 px-3 py-1 text-sm font-semibold text-white">
                {cartCount}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white p-3 shadow-sm">
                <p className="text-gray-500">{t('providerCartItems')}</p>
                <p className="mt-1 font-semibold text-gray-900">{cartCount}</p>
              </div>
              <div className="rounded-xl bg-white p-3 shadow-sm">
                <p className="text-gray-500">{t('providerListenersTitle')}</p>
                <p className="mt-1 font-semibold text-gray-900">Consumer + watch()</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-gray-900 p-3 font-mono text-sm text-emerald-300">
              notifyListeners();
            </div>
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('providerChallengeGoal')}
          codePrefix={'  void addItem() {\n    itemCount++;\n    '}
          codeSuffix={'();\n  }'}
          answer={challengeAnswer}
          expectedAnswers={['notifyListeners']}
          onChange={handleChallengeChange}
          placeholder="methodName"
          successMessage={t('providerSuccess')}
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold
            appBar={
              <FlutterAppBar
                title={t('providerPreviewTitle')}
                color="bg-blue-600"
              />
            }
          >
            <div className="absolute right-4 top-[72px] z-20 flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
              <ShoppingCart className="h-4 w-4" />
              <span>
                {t('cartBadge')}: {cartCount}
              </span>
            </div>

            <div className="flex-1 bg-slate-50 p-4 space-y-3">
              {products.map((product, index) => (
                <div key={product} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-slate-900">{product}</h4>
                      <p className="mt-1 text-sm text-slate-500">#{index + 1}</p>
                    </div>
                    <button
                      onClick={addToCart}
                      className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      {t('addToCart')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
