import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.type === 'bot';
  
  return (
    <div className={`flex gap-4 mb-6 animate-slide-up ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20 dark:ring-white/10 backdrop-blur-sm">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className={`max-w-[75%] group ${isBot ? 'order-2' : 'order-1'}`}>
        <div className={`p-4 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-[1.02] ${
          isBot 
            ? 'bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 rounded-tl-md border-white/30 dark:border-gray-700/50 shadow-lg' 
            : 'bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-tr-md border-white/20 shadow-lg'
        }`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed font-medium">
            {message.content}
          </div>
          <div className={`text-xs mt-3 flex items-center gap-1 ${
            isBot ? 'text-gray-500 dark:text-gray-400' : 'text-blue-100'
          }`}>
            <div className={`w-1 h-1 rounded-full ${
              isBot ? 'bg-gray-400 dark:bg-gray-500' : 'bg-blue-200'
            }`} />
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
      
      {!isBot && (
        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20 dark:ring-white/10 backdrop-blur-sm order-2">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
}