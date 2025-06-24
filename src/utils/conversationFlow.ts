import { ConversationState, CandidateInfo } from '../types';
import { isValidEmail, isValidPhone, isValidName, isValidExperience, parseTechStack } from './validation';

export function getNextState(currentState: ConversationState, userInput: string, candidateInfo: Partial<CandidateInfo>): ConversationState {
  // Check for conversation ending keywords
  const endingKeywords = ['bye', 'goodbye', 'exit', 'quit', 'end', 'stop', 'thanks', 'thank you'];
  const isEnding = endingKeywords.some(keyword => 
    userInput.toLowerCase().includes(keyword)
  );
  
  if (isEnding && currentState !== 'greeting') {
    return 'ended';
  }

  switch (currentState) {
    case 'greeting':
      return 'gathering-name';
    
    case 'gathering-name':
      if (isValidName(userInput)) {
        return 'gathering-email';
      }
      return 'gathering-name';
    
    case 'gathering-email':
      if (isValidEmail(userInput)) {
        return 'gathering-phone';
      }
      return 'gathering-email';
    
    case 'gathering-phone':
      if (isValidPhone(userInput)) {
        return 'gathering-experience';
      }
      return 'gathering-phone';
    
    case 'gathering-experience':
      if (isValidExperience(userInput)) {
        return 'gathering-position';
      }
      return 'gathering-experience';
    
    case 'gathering-position':
      if (userInput.trim().length >= 2) {
        return 'gathering-location';
      }
      return 'gathering-position';
    
    case 'gathering-location':
      if (userInput.trim().length >= 2) {
        return 'gathering-tech-stack';
      }
      return 'gathering-location';
    
    case 'gathering-tech-stack':
      const techStack = parseTechStack(userInput);
      if (techStack.length > 0) {
        return 'asking-technical-questions';
      }
      return 'gathering-tech-stack';
    
    case 'asking-technical-questions':
      return 'conversation-complete';
    
    default:
      return currentState;
  }
}

export function getBotResponse(state: ConversationState, userInput: string, candidateInfo: Partial<CandidateInfo>): string {
  switch (state) {
    case 'greeting':
      return "Hello! 👋 Welcome to TalentScout's AI Hiring Assistant. I'm here to help streamline your application process by gathering some essential information and asking a few technical questions based on your expertise.\n\nThis conversation will take about 5-10 minutes, and all information will be kept confidential in accordance with data privacy standards.\n\nLet's get started! What's your full name?";
    
    case 'gathering-name':
      if (!isValidName(userInput)) {
        return "I need your full name to proceed. Please provide your first and last name (letters only, no numbers or special characters).";
      }
      return `Nice to meet you, ${userInput}! Now, what's your email address?`;
    
    case 'gathering-email':
      if (!isValidEmail(userInput)) {
        return "Please provide a valid email address (e.g., john.doe@example.com).";
      }
      return "Great! What's your phone number? You can include country code if needed.";
    
    case 'gathering-phone':
      if (!isValidPhone(userInput)) {
        return "Please provide a valid phone number. It should be at least 10 digits and can include spaces, dashes, or parentheses.";
      }
      return "Perfect! How many years of professional experience do you have in technology/software development? (You can use decimals, e.g., 2.5)";
    
    case 'gathering-experience':
      if (!isValidExperience(userInput)) {
        return "Please provide a valid number of years (0-50). For example: 2, 3.5, or 0 for entry level.";
      }
      return "Excellent! What position(s) are you interested in? You can mention multiple roles if you're open to different opportunities.";
    
    case 'gathering-position':
      if (userInput.trim().length < 2) {
        return "Please tell me what kind of position you're looking for (e.g., Software Engineer, Data Scientist, DevOps Engineer, etc.).";
      }
      return "Thanks! What's your current location? (City, State/Country)";
    
    case 'gathering-location':
      if (userInput.trim().length < 2) {
        return "Please provide your current location (city and state/country).";
      }
      return "Almost done with the basics! Now, please list your technical skills and tech stack. Include programming languages, frameworks, databases, tools, etc. You can separate them with commas.\n\nFor example: JavaScript, React, Node.js, Python, Django, PostgreSQL, AWS, Docker";
    
    case 'gathering-tech-stack':
      const techStack = parseTechStack(userInput);
      if (techStack.length === 0) {
        return "Please provide at least one technology from your tech stack. This helps me generate relevant technical questions for you.";
      }
      return `Excellent! I've recorded your tech stack: ${techStack.join(', ')}.\n\nBased on your expertise, I've prepared some technical questions to assess your proficiency. These questions will help our recruitment team understand your skill level better.\n\nAre you ready to proceed with the technical questions? Just say "yes" or "ready" to continue.`;
    
    case 'asking-technical-questions':
      return `Thank you for completing the technical assessment! 🎉\n\nHere's a summary of your information:\n• Name: ${candidateInfo.fullName}\n• Email: ${candidateInfo.email}\n• Experience: ${candidateInfo.yearsOfExperience} years\n• Position Interest: ${candidateInfo.desiredPositions}\n• Location: ${candidateInfo.currentLocation}\n• Tech Stack: ${candidateInfo.techStack?.join(', ')}\n\n**Next Steps:**\n1. Our recruitment team will review your information and responses\n2. If you're a good fit, we'll contact you within 2-3 business days\n3. We may schedule a more detailed technical interview or connect you directly with hiring managers\n\n**Data Privacy Note:** All your information is stored securely and will only be used for recruitment purposes. You can request data deletion at any time by contacting us.\n\nThank you for your interest in TalentScout! Is there anything else you'd like to know about our process?`;
    
    case 'conversation-complete':
      return "Thank you for your time! Your application has been recorded. You can type 'bye' or 'exit' to end this conversation. Have a great day! 🌟";
    
    case 'ended':
      return "Thank you for using TalentScout's Hiring Assistant! Goodbye and best of luck with your job search! 👋";
    
    default:
      return "I apologize, but I didn't understand that. Could you please rephrase your response?";
  }
}

export function getFallbackResponse(): string {
  const fallbacks = [
    "I'm sorry, I didn't quite understand that. Could you please rephrase?",
    "I'm not sure I follow. Could you provide that information again?",
    "Let me help you with that. Could you clarify your response?",
    "I want to make sure I get this right. Could you please repeat that?"
  ];
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

export function shouldShowTechnicalQuestions(state: ConversationState): boolean {
  return state === 'asking-technical-questions';
}