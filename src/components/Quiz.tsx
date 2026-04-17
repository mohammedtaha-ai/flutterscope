import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { QuizQuestion } from '@/src/data/lessons';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/src/i18n/LanguageContext';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete?: () => void;
  onNextLesson?: () => void;
  hasNextLesson?: boolean;
}

export function Quiz({ questions, onComplete, onNextLesson, hasNextLesson }: QuizProps) {
  const { lang, t } = useLanguage();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState<number[]>([]);
  const [allCorrect, setAllCorrect] = useState(false);

  useEffect(() => {
    setCurrentQ(0);
    setSelected(null);
    setWrongAttempts([]);
    setAllCorrect(false);
  }, [questions]);

  if (!questions || questions.length === 0) return null;

  const q = questions[currentQ];
  const isCorrect = selected === q.correctAnswerIndex;

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((currentIndex) => currentIndex + 1);
      setSelected(null);
      setWrongAttempts([]);
    } else {
      setAllCorrect(true);
      if (onComplete) onComplete();
    }
  };

  const handleOptionClick = (index: number) => {
    if (selected === q.correctAnswerIndex) return;

    setSelected(index);
    if (index !== q.correctAnswerIndex && !wrongAttempts.includes(index)) {
      setWrongAttempts((previousAttempts) => [...previousAttempts, index]);
    }
  };

  const RTLArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  if (allCorrect) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/15">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-slate-100">{t('lessonComplete')}</h3>
        <p className="mb-8 text-gray-500 dark:text-slate-400">{t('lessonCompleteDesc')}</p>

        {hasNextLesson && onNextLesson && (
          <button
            onClick={onNextLesson}
            className={`mx-auto flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 font-medium text-white shadow-md transition hover:bg-blue-700 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            {t('continueToNext')} <RTLArrow className="h-5 w-5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-slate-100">{t('checkUnderstanding')}</h3>
      <p className="mb-6 text-sm font-medium text-gray-500 dark:text-slate-400">
        {t('question')} {currentQ + 1} {t('ofText')} {questions.length}
      </p>

      <div className="mb-6 text-lg text-gray-800 dark:text-slate-200">{q.question}</div>

      <div className="space-y-3">
        {q.options.map((option, index) => {
          const isThisCorrect = index === q.correctAnswerIndex;
          const isWrongAttempt = wrongAttempts.includes(index);
          const solved = selected === q.correctAnswerIndex;

          let buttonStyle =
            'border-gray-200 hover:border-blue-400 hover:bg-blue-50 opacity-100 cursor-pointer dark:border-slate-700 dark:bg-slate-950/40 dark:hover:border-blue-500 dark:hover:bg-blue-500/10';

          if (solved) {
            if (isThisCorrect) {
              buttonStyle = 'border-green-500 bg-green-50 text-green-900 dark:bg-green-500/10 dark:text-green-200';
            } else {
              buttonStyle = 'border-gray-100 opacity-50 cursor-default dark:border-slate-800';
            }
          } else if (isWrongAttempt) {
            buttonStyle = 'border-red-500 bg-red-50 text-red-900 dark:bg-red-500/10 dark:text-red-200';
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`w-full rounded-xl border-2 p-4 text-left transition-all duration-200 ${buttonStyle} ${lang === 'ar' ? 'text-right' : ''}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="popLayout">
        {selected !== null && (
          <motion.div
            key={isCorrect ? 'correct' : 'wrong'}
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mt-6 flex items-start gap-3 overflow-hidden rounded-xl p-4 ${
              isCorrect
                ? 'bg-green-100 text-green-900 dark:bg-green-500/10 dark:text-green-200'
                : 'border border-red-100 bg-red-50 text-red-900 dark:border-red-900/40 dark:bg-red-500/10 dark:text-red-200'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-green-600" />
            ) : (
              <XCircle className="mt-0.5 h-6 w-6 shrink-0 text-red-500" />
            )}
            <div>
              <p className="mb-1 font-bold">{isCorrect ? t('correct') : t('wrongTryAgain')}</p>
              <p className="text-sm leading-relaxed opacity-90">{q.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCorrect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-8 flex border-t pt-6 dark:border-slate-800 ${lang === 'ar' ? 'justify-start' : 'justify-end'}`}
          >
            <button
              onClick={handleNext}
              className={`flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-2.5 font-medium text-white transition hover:bg-gray-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-white ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              {currentQ < questions.length - 1 ? t('nextQuestion') : t('finishLesson')} <RTLArrow className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
