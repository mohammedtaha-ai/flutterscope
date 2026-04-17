import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeViewProps {
  code: string;
}

export function CodeView({ code }: CodeViewProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg border border-gray-800 bg-[#1E1E1E]">
      <div className="flex items-center px-4 py-2 border-b border-gray-800 bg-[#2D2D2D]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="ml-4 text-xs text-gray-400 font-mono">main.dart</div>
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
