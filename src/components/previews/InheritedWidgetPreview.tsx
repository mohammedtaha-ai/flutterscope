import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

type ThemeColorKey = 'blue' | 'emerald' | 'rose' | 'amber';

const COLOR_OPTIONS: Record<
  ThemeColorKey,
  {
    swatchClass: string;
    borderClass: string;
    fillClass: string;
    badgeClass: string;
    dartColor: string;
  }
> = {
  blue: {
    swatchClass: 'bg-blue-500',
    borderClass: 'border-blue-400',
    fillClass: 'bg-blue-50',
    badgeClass: 'bg-blue-500 text-white',
    dartColor: 'Colors.blue',
  },
  emerald: {
    swatchClass: 'bg-emerald-500',
    borderClass: 'border-emerald-400',
    fillClass: 'bg-emerald-50',
    badgeClass: 'bg-emerald-500 text-white',
    dartColor: 'Colors.green',
  },
  rose: {
    swatchClass: 'bg-rose-500',
    borderClass: 'border-rose-400',
    fillClass: 'bg-rose-50',
    badgeClass: 'bg-rose-500 text-white',
    dartColor: 'Colors.pink',
  },
  amber: {
    swatchClass: 'bg-amber-500',
    borderClass: 'border-amber-400',
    fillClass: 'bg-amber-50',
    badgeClass: 'bg-amber-500 text-white',
    dartColor: 'Colors.orange',
  },
};

function TreeLevel({
  title,
  description,
  borderClass,
  fillClass,
  badgeClass,
  indent,
}: {
  title: string;
  description: string;
  borderClass: string;
  fillClass: string;
  badgeClass: string;
  indent: string;
}) {
  return (
    <div className={`rounded-2xl border-2 ${borderClass} ${fillClass} p-4 shadow-sm transition-all duration-300 ${indent}`}>
      <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>{title}</div>
      <p className="mt-3 text-sm text-gray-700">{description}</p>
    </div>
  );
}

export function InheritedWidgetPreview() {
  const { t } = useLanguage();
  const [colorKey, setColorKey] = useState<ThemeColorKey>('blue');
  const [challengeAnswer, setChallengeAnswer] = useState('');

  const activeColor = COLOR_OPTIONS[colorKey];

  const dartCode = `
import 'package:flutter/material.dart';

class ThemeColorScope extends InheritedWidget {
  const ThemeColorScope({
    super.key,
    required this.themeColor,
    required super.child,
  });

  final Color themeColor;

  static ThemeColorScope of(BuildContext context) {
    return context.dependOnInheritedWidgetOfExactType<ThemeColorScope>()!;
  }

  @override
  bool updateShouldNotify(ThemeColorScope oldWidget) {
    return oldWidget.themeColor != themeColor;
  }
}

class ChildWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final themeColor = ThemeColorScope.of(context).themeColor;

    return Container(
      color: ${activeColor.dartColor}.withOpacity(0.12),
      child: Text('${t('inheritedChild')}'),
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
            <p className="mt-2 text-sm text-gray-600">{t('inheritedThemeColor')}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {(Object.keys(COLOR_OPTIONS) as ThemeColorKey[]).map((option) => {
              const swatch = COLOR_OPTIONS[option];
              const isActive = option === colorKey;

              return (
                <button
                  key={option}
                  onClick={() => setColorKey(option)}
                  className={`h-11 w-11 rounded-full border-4 transition-all ${swatch.swatchClass} ${isActive ? 'border-gray-900 scale-105' : 'border-white hover:scale-105'}`}
                />
              );
            })}
          </div>
        </div>

        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('inheritedChallengeGoal')}
          codePrefix={'static ThemeColorScope '}
          codeSuffix={'(BuildContext context) {\n  return context.dependOnInheritedWidgetOfExactType<ThemeColorScope>()!;\n}'}
          answer={challengeAnswer}
          expectedAnswers={['of']}
          onChange={setChallengeAnswer}
          placeholder="methodName"
          successMessage={t('inheritedSuccess')}
        />
      </div>

      <div className="shrink-0 flex justify-center sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={t('inheritedWidgetTitle')} color="bg-slate-800" />}>
            <div className="flex-1 bg-slate-50 p-4">
              <div className="mb-4 rounded-2xl border border-dashed border-slate-300 bg-white p-3 text-center text-xs text-slate-500">
                {t('inheritedAnyDescendant')}
              </div>

              <div className="space-y-4">
                <TreeLevel
                  title={t('inheritedGrandParent')}
                  description={t('inheritedGrandParentDesc')}
                  borderClass={activeColor.borderClass}
                  fillClass={activeColor.fillClass}
                  badgeClass={activeColor.badgeClass}
                  indent=""
                />
                <TreeLevel
                  title={t('inheritedParent')}
                  description={t('inheritedParentDesc')}
                  borderClass={activeColor.borderClass}
                  fillClass={activeColor.fillClass}
                  badgeClass={activeColor.badgeClass}
                  indent="ml-5"
                />
                <TreeLevel
                  title={t('inheritedChild')}
                  description={t('inheritedChildDesc')}
                  borderClass={activeColor.borderClass}
                  fillClass={activeColor.fillClass}
                  badgeClass={activeColor.badgeClass}
                  indent="ml-10"
                />
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>
      </div>
    </div>
  );
}
