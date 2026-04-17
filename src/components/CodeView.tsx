import React, { useEffect, useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import dart from 'react-syntax-highlighter/dist/esm/languages/prism/dart';
import { Check, Copy } from 'lucide-react';
import { useLanguage } from '@/src/i18n/LanguageContext';

interface CodeViewProps {
  code: string;
}

SyntaxHighlighter.registerLanguage('dart', dart);

export function CodeView({ code }: CodeViewProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    const text = code.trim();

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      return;
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
    }
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-800 bg-[#1E1E1E]">
      <div className="flex items-center justify-between gap-4 px-4 py-2 border-b border-gray-800 bg-[#2D2D2D]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <div className="text-xs text-gray-400 font-mono">{t('mainDartFile')}</div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-700 bg-gray-900/80 px-2.5 py-1.5 text-xs font-medium text-gray-200 transition hover:border-gray-600 hover:bg-gray-800"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? t('copiedCode') : t('copyCode')}</span>
          </button>
        </div>
      </div>
      <SyntaxHighlighter
        language="dart"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          background: 'transparent'
        }}
        showLineNumbers={true}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
