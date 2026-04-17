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
    // Reset state when questions change
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
      setCurrentQ(c => c + 1);
      setSelected(null);
      setWrongAttempts([]);
    } else {
      setAllCorrect(true);
      if (onComplete) onComplete();
    }
  };

  const handleOptionClick = (i: number) => {
    // If they already got it right, don't let them click again
    if (selected === q.correctAnswerIndex) return;

    setSelected(i);
    if (i !== q.correctAnswerIndex && !wrongAttempts.includes(i)) {
      setWrongAttempts(prev => [...prev, i]);
    }
  };

  const RTLArrow = lang === 'ar' ? ArrowLeft : ArrowRight;

  if (allCorrect) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('lessonComplete')}</h3>
        <p className="text-gray-500 mb-8">{t('lessonCompleteDesc')}</p>
        
        {hasNextLesson && onNextLesson && (
          <button
            onClick={onNextLesson}
            className={`px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition flex items-center gap-2 mx-auto shadow-md ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            {t('continueToNext')} <RTLArrow className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{t('checkUnderstanding')}</h3>
      <p className="text-sm font-medium text-gray-500 mb-6">
        {t('question')} {currentQ + 1} {t('ofText')} {questions.length}
      </p>

      <div className="mb-6 text-lg text-gray-800">
        {q.question}
      </div>

      <div className="space-y-3">
        {q.options.map((opt, i) => {
          const isThisCorrect = i === q.correctAnswerIndex;
          const isWrongAttempt = wrongAttempts.includes(i);
          const solved = selected === q.correctAnswerIndex;
          
          let btnStyle = "border-gray-200 hover:border-blue-400 hover:bg-blue-50 opacity-100 cursor-pointer";
          
          if (solved) {
            if (isThisCorrect) {
              btnStyle = "border-green-500 bg-green-50 text-green-900";
            } else {
              btnStyle = "border-gray-100 opacity-50 cursor-default";
            }
          } else if (isWrongAttempt) {
            btnStyle = "border-red-500 bg-red-50 text-red-900";
          }

          return (
            <button
              key={i}
              onClick={() => handleOptionClick(i)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${btnStyle} ${lang === 'ar' ? 'text-right' : ''}`}
            >
              {opt}
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
            className={`mt-6 p-4 rounded-xl flex items-start gap-3 overflow-hidden ${
              isCorrect ? 'bg-green-100 text-green-900' : 'bg-red-50 border border-red-100 text-red-900'
            }`}
          >
            {isCorrect ? <CheckCircle2 className="w-6 h-6 shrink-0 text-green-600 mt-0.5" /> : <XCircle className="w-6 h-6 shrink-0 text-red-500 mt-0.5" />}
            <div>
              <p className="font-bold mb-1">{isCorrect ? t('correct') : t('wrongTryAgain')}</p>
              <p className="text-sm opacity-90 leading-relaxed">{q.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCorrect && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-8 pt-6 border-t flex ${lang === 'ar' ? 'justify-start' : 'justify-end'}`}
          >
            <button
              onClick={handleNext}
              className={`px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition flex items-center gap-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
            >
              {currentQ < questions.length - 1 ? t('nextQuestion') : t('finishLesson')} <RTLArrow className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
