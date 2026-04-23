import { useState, useEffect } from 'react';

const WELCOME_STORAGE_KEY = 'flutterscope_welcome_seen';

export function useWelcomePanel() {
  const [showWelcomePanel, setShowWelcomePanel] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem(WELCOME_STORAGE_KEY);
    if (!hasSeenWelcome) {
      setShowWelcomePanel(true);
    }
  }, []);

  const dismissWelcomePanel = () => {
    localStorage.setItem(WELCOME_STORAGE_KEY, 'true');
    setShowWelcomePanel(false);
  };

  const openWelcomePanel = () => {
    setShowWelcomePanel(true);
  };

  return { showWelcomePanel, dismissWelcomePanel, openWelcomePanel };
}
