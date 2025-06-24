import React, { useState, useEffect, useRef } from 'react';
import { Message, CandidateInfo, ConversationState, TechnicalQuestion } from './types';
import { ChatMessage } from './components/ChatMessage';
import { TypingIndicator } from './components/TypingIndicator';
import { ChatInput } from './components/ChatInput';
import { TechnicalQuestions } from './components/TechnicalQuestions';
import { CandidateInfoSummary } from './components/CandidateInfoSummary';
import { ThemeToggle } from './components/ThemeToggle';
import { AnimatedBackground } from './components/AnimatedBackground';
import { getNextState, getBotResponse, shouldShowTechnicalQuestions } from './utils/conversationFlow';
import { generateTechnicalQuestions } from './utils/technicalQuestions';
import { sanitizeInput, parseTechStack } from './utils/validation';
import { useTheme } from './hooks/useTheme';
import { Brain, Shield, Clock, Users, Sparkles, Award, Target } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [candidateInfo, setCandidateInfo] = useState<Partial<CandidateInfo>>({});
  const [conversationState, setConversationState] = useState<ConversationState>('greeting');
  const [isTyping, setIsTyping] = useState(false);
  const [technicalQuestions, setTechnicalQuestions] = useState<TechnicalQuestion[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initialize with greeting message
  useEffect(() => {
    setTimeout(() => {
      addBotMessage(getBotResponse('greeting', '', candidateInfo));
    }, 1500);
  }, []);

  const addMessage = (content: string, type: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content: sanitizeInput(content),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(content, 'bot');
    }, 1500 + Math.random() * 1000);
  };

  const updateCandidateInfo = (field: keyof CandidateInfo, value: string | string[]) => {
    setCandidateInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSendMessage = (userMessage: string) => {
    addMessage(userMessage, 'user');
    
    const nextState = getNextState(conversationState, userMessage, candidateInfo);
    
    // Update candidate info based on current state
    switch (conversationState) {
      case 'gathering-name':
        updateCandidateInfo('fullName', userMessage);
        break;
      case 'gathering-email':
        updateCandidateInfo('email', userMessage);
        break;
      case 'gathering-phone':
        updateCandidateInfo('phone', userMessage);
        break;
      case 'gathering-experience':
        updateCandidateInfo('yearsOfExperience', userMessage);
        break;
      case 'gathering-position':
        updateCandidateInfo('desiredPositions', userMessage);
        break;
      case 'gathering-location':
        updateCandidateInfo('currentLocation', userMessage);
        break;
      case 'gathering-tech-stack':
        const techStack = parseTechStack(userMessage);
        updateCandidateInfo('techStack', techStack);
        if (techStack.length > 0) {
          setTechnicalQuestions(generateTechnicalQuestions(techStack));
        }
        break;
    }
    
    setConversationState(nextState);
    
    const botResponse = getBotResponse(nextState, userMessage, {
      ...candidateInfo,
      techStack: conversationState === 'gathering-tech-stack' ? parseTechStack(userMessage) : candidateInfo.techStack
    });
    
    addBotMessage(botResponse);
  };

  const isConversationActive = conversationState !== 'ended' && conversationState !== 'conversation-complete';

  const getStateProgress = () => {
    const states = ['greeting', 'gathering-name', 'gathering-email', 'gathering-phone', 'gathering-experience', 'gathering-position', 'gathering-location', 'gathering-tech-stack', 'asking-technical-questions', 'conversation-complete'];
    const currentIndex = states.indexOf(conversationState);
    return Math.max(0, (currentIndex / (states.length - 1)) * 100);
  };

  return (
    <div className="min-h-screen transition-colors duration-1000 relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-white/20 dark:border-gray-700/30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-teal-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  TalentScout
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  AI-Powered Hiring Assistant
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-full border border-white/30 dark:border-gray-700/50">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Secure</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-full border border-white/30 dark:border-gray-700/50">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">5-10 min</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-full border border-white/30 dark:border-gray-700/50">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">AI-Powered</span>
                </div>
              </div>
              
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
              <span>Interview Progress</span>
              <span>{Math.round(getStateProgress())}%</span>
            </div>
            <div className="w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2 overflow-hidden backdrop-blur-sm">
              <div 
                className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${getStateProgress()}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="flex gap-8">
          {/* Chat Container */}
          <div className="flex-1 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/50 flex flex-col overflow-hidden">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8" style={{ maxHeight: 'calc(100vh - 300px)' }}>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isTyping && <TypingIndicator />}
              
              {shouldShowTechnicalQuestions(conversationState) && technicalQuestions.length > 0 && (
                <TechnicalQuestions questions={technicalQuestions} />
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={isTyping || !isConversationActive}
              placeholder={
                !isConversationActive 
                  ? "Interview completed" 
                  : "Share your thoughts..."
              }
            />
          </div>

          {/* Sidebar */}
          <div className="w-96 hidden xl:block space-y-6">
            <CandidateInfoSummary candidateInfo={candidateInfo} />
            
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl p-6 border border-white/30 dark:border-gray-700/50 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                Interview Stages
              </h3>
              
              <div className="space-y-4">
                <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  ['greeting', 'gathering-name', 'gathering-email', 'gathering-phone', 'gathering-experience', 'gathering-position', 'gathering-location', 'gathering-tech-stack'].includes(conversationState)
                    ? 'bg-blue-50/80 dark:bg-blue-900/30 border border-blue-200/50 dark:border-blue-700/30' 
                    : conversationState === 'asking-technical-questions' || conversationState === 'conversation-complete' || conversationState === 'ended'
                    ? 'bg-green-50/80 dark:bg-green-900/30 border border-green-200/50 dark:border-green-700/30'
                    : 'bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200/30 dark:border-gray-700/20'
                }`}>
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    ['greeting', 'gathering-name', 'gathering-email', 'gathering-phone', 'gathering-experience', 'gathering-position', 'gathering-location', 'gathering-tech-stack'].includes(conversationState)
                      ? 'bg-blue-500 animate-pulse' 
                      : conversationState === 'asking-technical-questions' || conversationState === 'conversation-complete' || conversationState === 'ended'
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                  <span className={`text-sm font-medium transition-colors duration-300 ${
                    ['greeting', 'gathering-name', 'gathering-email', 'gathering-phone', 'gathering-experience', 'gathering-position', 'gathering-location', 'gathering-tech-stack'].includes(conversationState)
                      ? 'text-blue-700 dark:text-blue-300' 
                      : conversationState === 'asking-technical-questions' || conversationState === 'conversation-complete' || conversationState === 'ended'
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    Information Gathering
                  </span>
                </div>
                
                <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  conversationState === 'asking-technical-questions'
                    ? 'bg-orange-50/80 dark:bg-orange-900/30 border border-orange-200/50 dark:border-orange-700/30' 
                    : conversationState === 'conversation-complete' || conversationState === 'ended'
                    ? 'bg-green-50/80 dark:bg-green-900/30 border border-green-200/50 dark:border-green-700/30'
                    : 'bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200/30 dark:border-gray-700/20'
                }`}>
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    conversationState === 'asking-technical-questions'
                      ? 'bg-orange-500 animate-pulse' 
                      : conversationState === 'conversation-complete' || conversationState === 'ended'
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                  <span className={`text-sm font-medium transition-colors duration-300 ${
                    conversationState === 'asking-technical-questions'
                      ? 'text-orange-700 dark:text-orange-300' 
                      : conversationState === 'conversation-complete' || conversationState === 'ended'
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    Technical Assessment
                  </span>
                </div>
                
                <div className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  conversationState === 'conversation-complete' || conversationState === 'ended'
                    ? 'bg-green-50/80 dark:bg-green-900/30 border border-green-200/50 dark:border-green-700/30'
                    : 'bg-gray-50/50 dark:bg-gray-800/30 border border-gray-200/30 dark:border-gray-700/20'
                }`}>
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    conversationState === 'conversation-complete' || conversationState === 'ended'
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                  <span className={`text-sm font-medium transition-colors duration-300 ${
                    conversationState === 'conversation-complete' || conversationState === 'ended'
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    Interview Complete
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-md rounded-3xl p-6 border border-blue-200/50 dark:border-blue-700/30 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h4 className="font-bold text-gray-800 dark:text-gray-100">Privacy & Security</h4>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Your information is encrypted and stored securely. We comply with GDPR and international privacy standards to protect your data.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border-t border-white/20 dark:border-gray-700/30 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 TalentScout AI Hiring Assistant • 
            <span className="mx-2">•</span>
            <span className="text-green-600 dark:text-green-400 font-medium">Secure</span>
            <span className="mx-2">•</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Private</span>
            <span className="mx-2">•</span>
            <span className="text-purple-600 dark:text-purple-400 font-medium">Efficient</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;