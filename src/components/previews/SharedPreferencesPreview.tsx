import { useLanguage } from '@/src/i18n/LanguageContext';
import React, { useEffect, useRef, useState } from 'react';
import { FlutterAppBar, FlutterScaffold, PhonePreview } from '../PhonePreview';
import { CodeView } from '../CodeView';
import { InlineChallenge } from '../InlineChallenge';

interface SettingsState {
  username: string;
  darkMode: boolean;
  notifications: boolean;
}

const DEFAULT_SETTINGS: SettingsState = {
  username: '',
  darkMode: false,
  notifications: true,
};

export function SharedPreferencesPreview() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [storageState, setStorageState] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [challengeAnswer, setChallengeAnswer] = useState('');
  const [restarting, setRestarting] = useState(false);
  const restartTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (restartTimer.current !== null) {
        window.clearTimeout(restartTimer.current);
      }
    };
  }, []);

  const handleSave = () => {
    setStorageState(formState);
  };

  const handleRestart = () => {
    if (restartTimer.current !== null) {
      window.clearTimeout(restartTimer.current);
    }

    setRestarting(true);
    setFormState(DEFAULT_SETTINGS);

    restartTimer.current = window.setTimeout(() => {
      setFormState(storageState);
      setRestarting(false);
    }, 500);
  };

  const dartCode = `
import 'package:shared_preferences/shared_preferences.dart';

Future<void> saveSettings() async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setString('username', '${formState.username}');
  await prefs.setBool('darkMode', ${formState.darkMode});
  await prefs.setBool('notifications', ${formState.notifications});
}

Future<void> loadSettings() async {
  final prefs = await SharedPreferences.getInstance();
  username = prefs.getString('username') ?? '';
  darkMode = prefs.getBool('darkMode') ?? false;
  notifications = prefs.getBool('notifications') ?? true;
}
`;

  return (
    <div className="flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-8">
        <CodeView code={dartCode} />

        <InlineChallenge
          goal={t('prefsChallengeGoal')}
          codePrefix={'final prefs = await SharedPreferences.'}
          codeSuffix={'();'}
          answer={challengeAnswer}
          expectedAnswers={['getInstance']}
          onChange={setChallengeAnswer}
          placeholder="methodName"
          successMessage={t('prefsSuccess')}
        />
      </div>

      <div className="shrink-0 flex flex-col items-center gap-4 sticky top-8">
        <PhonePreview>
          <FlutterScaffold appBar={<FlutterAppBar title={t('prefsTitle')} color="bg-slate-900" />}>
            <div className={`flex-1 p-4 transition-colors ${formState.darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
              <div className={`rounded-[28px] border p-4 shadow-sm ${formState.darkMode ? 'border-slate-700 bg-slate-800 text-white' : 'border-slate-200 bg-white text-slate-900'}`}>
                <div>
                  <label className="text-sm font-semibold">{t('prefsUsername')}</label>
                  <input
                    type="text"
                    value={formState.username}
                    onChange={(event) => setFormState((value) => ({ ...value, username: event.target.value }))}
                    placeholder={t('prefsUsernamePlaceholder')}
                    className={`mt-2 w-full rounded-xl border px-3 py-2 outline-none ${formState.darkMode ? 'border-slate-600 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-900'}`}
                  />
                </div>

                <div className="mt-4 space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{t('prefsDarkMode')}</span>
                    <input
                      type="checkbox"
                      checked={formState.darkMode}
                      onChange={(event) => setFormState((value) => ({ ...value, darkMode: event.target.checked }))}
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{t('prefsNotifications')}</span>
                    <input
                      type="checkbox"
                      checked={formState.notifications}
                      onChange={(event) => setFormState((value) => ({ ...value, notifications: event.target.checked }))}
                    />
                  </label>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleSave}
                    className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white"
                  >
                    {t('prefsSave')}
                  </button>
                  <button
                    onClick={handleRestart}
                    className="w-full rounded-xl bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-900"
                  >
                    {t('prefsRestart')}
                  </button>
                </div>

                {restarting && (
                  <div className="mt-4 rounded-xl bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-800">
                    {t('prefsRestarting')}
                  </div>
                )}
              </div>
            </div>
          </FlutterScaffold>
        </PhonePreview>

        <div className="w-[300px] rounded-2xl border bg-white p-4 shadow-sm">
          <h3 className="font-bold text-lg">{t('prefsStorage')}</h3>
          <div className="mt-4 space-y-2 font-mono text-sm">
            <div className="rounded-xl bg-slate-50 p-3">username: "{storageState.username}"</div>
            <div className="rounded-xl bg-slate-50 p-3">darkMode: {String(storageState.darkMode)}</div>
            <div className="rounded-xl bg-slate-50 p-3">notifications: {String(storageState.notifications)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
