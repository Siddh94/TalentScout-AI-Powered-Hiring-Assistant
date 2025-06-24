import React from 'react';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex gap-4 mb-6 justify-start animate-slide-up">
      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20 dark:ring-white/10 backdrop-blur-sm">
        <Bot className="w-5 h-5 text-white" />
      </div>
      
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-800 dark:text-gray-100 rounded-2xl rounded-tl-md p-4 border border-white/30 dark:border-gray-700/50 shadow-lg">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
      </div>
    </div>
  );
}