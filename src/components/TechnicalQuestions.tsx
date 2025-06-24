import React from 'react';
import { TechnicalQuestion } from '../types';
import { Code, ChevronRight, Lightbulb } from 'lucide-react';

interface TechnicalQuestionsProps {
  questions: TechnicalQuestion[];
}

export function TechnicalQuestions({ questions }: TechnicalQuestionsProps) {
  if (questions.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-md rounded-3xl p-8 mb-6 border border-blue-200/50 dark:border-blue-700/30 shadow-xl animate-slide-up">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Code className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Technical Assessment</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Tailored questions for your expertise</p>
        </div>
      </div>
      
      <div className="space-y-6">
        {questions.map((techQuestion, index) => (
          <div 
            key={index} 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 group"
          >
            <h4 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-4 flex items-center gap-3 group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors duration-300">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
              {techQuestion.technology}
            </h4>
            
            <div className="space-y-3">
              {techQuestion.questions.map((question, qIndex) => (
                <div 
                  key={qIndex} 
                  className="flex gap-4 p-3 bg-gray-50/80 dark:bg-gray-700/50 rounded-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/30 hover:bg-gray-100/80 dark:hover:bg-gray-700/70 transition-all duration-300"
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-gray-400 to-gray-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {qIndex + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                    {question}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-orange-50/80 to-yellow-50/80 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-2xl border border-orange-200/50 dark:border-orange-700/30 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-orange-800 dark:text-orange-300 mb-1">
              Interview Preparation
            </p>
            <p className="text-sm text-orange-700 dark:text-orange-400 leading-relaxed">
              These questions are designed to assess your technical proficiency. Take time to think through your answers and prepare examples from your experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}