import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface InlineChallengeProps {
  goal: string;
  codePrefix: string;
  codeSuffix: string;
  answer: string;
  expectedAnswers: string[];
  onChange: (val: string) => void;
  successMessage?: string;
  placeholder?: string;
}

export function InlineChallenge({ goal, codePrefix, codeSuffix, answer, expectedAnswers, onChange, successMessage, placeholder = "________" }: InlineChallengeProps) {
  const isCorrect = expectedAnswers.some(a => a.toLowerCase() === answer.toLowerCase().trim());

  return (
    <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 shadow-sm mt-8 relative overflow-hidden">
      <h3 className="font-bold text-lg mb-2 text-indigo-900">💻 Code Challenge</h3>
      <p className="text-sm text-indigo-800 mb-6">{goal}</p>

      <div className="bg-[#1e1e1e] text-blue-300 font-mono text-[13px] md:text-sm p-5 rounded-xl leading-relaxed overflow-x-auto shadow-inner">
        <div className="whitespace-pre">
          {codePrefix}
          <input 
            type="text" 
            value={answer}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            spellCheck={false}
            className={`bg-transparent text-white border-b-2 outline-none px-1 py-0 min-w-[60px] max-w-[200px] inline-block focus:border-blue-400 transition-colors ${isCorrect ? 'border-green-500 text-green-300' : 'border-gray-500 text-yellow-300'}`}
            style={{ width: Math.max(placeholder.length, answer.length) * 8 + 16 + 'px' }}
          />
          {codeSuffix}
        </div>
      </div>

      {isCorrect && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-green-100/50 border border-green-200 rounded-xl flex items-start gap-3 text-green-900"
        >
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <span className="font-medium text-sm">{successMessage || "Great job! Challenge completed. Watch the preview update!"}</span>
        </motion.div>
      )}
    </div>
  );
}
