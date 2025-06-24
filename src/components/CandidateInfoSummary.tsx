import React from 'react';
import { CandidateInfo } from '../types';
import { User, Mail, Phone, Clock, MapPin, Briefcase, Code, CheckCircle } from 'lucide-react';

interface CandidateInfoSummaryProps {
  candidateInfo: Partial<CandidateInfo>;
}

export function CandidateInfoSummary({ candidateInfo }: CandidateInfoSummaryProps) {
  const infoItems = [
    { icon: User, label: 'Name', value: candidateInfo.fullName, color: 'from-blue-500 to-blue-600' },
    { icon: Mail, label: 'Email', value: candidateInfo.email, color: 'from-green-500 to-green-600' },
    { icon: Phone, label: 'Phone', value: candidateInfo.phone, color: 'from-purple-500 to-purple-600' },
    { icon: Clock, label: 'Experience', value: candidateInfo.yearsOfExperience ? `${candidateInfo.yearsOfExperience} years` : undefined, color: 'from-orange-500 to-orange-600' },
    { icon: Briefcase, label: 'Position', value: candidateInfo.desiredPositions, color: 'from-teal-500 to-teal-600' },
    { icon: MapPin, label: 'Location', value: candidateInfo.currentLocation, color: 'from-red-500 to-red-600' },
    { icon: Code, label: 'Tech Stack', value: candidateInfo.techStack?.join(', '), color: 'from-indigo-500 to-indigo-600' },
  ];

  const completedItems = infoItems.filter(item => item.value);
  
  if (completedItems.length === 0) return null;

  return (
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-6 mb-6 border border-white/30 dark:border-gray-700/50 shadow-xl animate-slide-up">
      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        Information Collected
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          ({completedItems.length}/7)
        </span>
      </h3>
      
      <div className="space-y-3">
        {completedItems.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-600/30 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-300 group"
          >
            <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
              <item.icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {item.label}
              </div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                {item.value}
              </div>
            </div>
            <CheckCircle className="w-4 h-4 text-green-500 opacity-80" />
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50/80 to-teal-50/80 dark:from-blue-900/30 dark:to-teal-900/30 rounded-xl backdrop-blur-sm border border-white/20 dark:border-gray-600/20">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
            {Math.round((completedItems.length / 7) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-teal-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
            style={{ width: `${(completedItems.length / 7) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}