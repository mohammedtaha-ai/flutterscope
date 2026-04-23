import { useState, useEffect } from 'react';

const STORAGE_KEY = 'flutterscope_completed';

export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCompletedLessons(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse completed lessons from localStorage', e);
      }
    }
  }, []);

  const markCompleted = (lessonId: string) => {
    setCompletedLessons((previousLessons) => {
      if (previousLessons.includes(lessonId)) return previousLessons;
      const nextLessons = [...previousLessons, lessonId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLessons));
      return nextLessons;
    });
  };

  return { completedLessons, markCompleted };
}
