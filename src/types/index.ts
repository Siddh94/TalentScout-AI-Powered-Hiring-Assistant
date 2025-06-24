export interface CandidateInfo {
  fullName: string;
  email: string;
  phone: string;
  yearsOfExperience: string;
  desiredPositions: string;
  currentLocation: string;
  techStack: string[];
}

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface TechnicalQuestion {
  technology: string;
  questions: string[];
}

export type ConversationState = 
  | 'greeting'
  | 'gathering-name'
  | 'gathering-email'
  | 'gathering-phone'
  | 'gathering-experience'
  | 'gathering-position'
  | 'gathering-location'
  | 'gathering-tech-stack'
  | 'asking-technical-questions'
  | 'conversation-complete'
  | 'ended';