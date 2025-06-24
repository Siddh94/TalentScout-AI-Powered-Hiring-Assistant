import { TechnicalQuestion } from '../types';

export const technicalQuestionsDatabase: Record<string, string[]> = {
  // Programming Languages
  'javascript': [
    'Explain the difference between let, const, and var in JavaScript.',
    'What is closure in JavaScript? Provide an example.',
    'How does event delegation work in JavaScript?',
    'What are Promises and how do they differ from callbacks?',
    'Explain the concept of hoisting in JavaScript.'
  ],
  'python': [
    'What is the difference between list and tuple in Python?',
    'Explain Python decorators and provide an example.',
    'What is the GIL (Global Interpreter Lock) in Python?',
    'How do you handle exceptions in Python?',
    'What are Python generators and when would you use them?'
  ],
  'java': [
    'Explain the difference between abstract classes and interfaces in Java.',
    'What is the purpose of the static keyword in Java?',
    'How does garbage collection work in Java?',
    'What are the different types of inheritance in Java?',
    'Explain the concept of multithreading in Java.'
  ],
  'typescript': [
    'What are the benefits of using TypeScript over JavaScript?',
    'Explain generic types in TypeScript with examples.',
    'What is the difference between interface and type in TypeScript?',
    'How does TypeScript handle null and undefined values?',
    'What are decorators in TypeScript?'
  ],
  'c++': [
    'Explain the difference between stack and heap memory allocation.',
    'What are virtual functions in C++?',
    'How does RAII (Resource Acquisition Is Initialization) work?',
    'What is the difference between shallow copy and deep copy?',
    'Explain smart pointers in modern C++.'
  ],

  // Frontend Frameworks
  'react': [
    'What is the Virtual DOM and how does it work?',
    'Explain the useState and useEffect hooks.',
    'What is the difference between controlled and uncontrolled components?',
    'How do you optimize performance in React applications?',
    'What is Redux and when would you use it?'
  ],
  'angular': [
    'What is dependency injection in Angular?',
    'Explain the difference between components and services.',
    'What are Angular directives and their types?',
    'How does change detection work in Angular?',
    'What is RxJS and how is it used in Angular?'
  ],
  'vue': [
    'What is the Vue.js reactivity system?',
    'Explain the difference between v-if and v-show.',
    'What are Vue.js lifecycle hooks?',
    'How do you handle state management in Vue.js?',
    'What is the difference between props and data in Vue components?'
  ],

  // Backend Frameworks
  'node.js': [
    'What is the event loop in Node.js?',
    'How do you handle asynchronous operations in Node.js?',
    'What is the difference between require() and import?',
    'How do you implement middleware in Express.js?',
    'What are streams in Node.js and when would you use them?'
  ],
  'django': [
    'What is the MVC pattern in Django?',
    'How do Django models work with databases?',
    'What are Django middlewares and how do you create custom ones?',
    'Explain Django\'s ORM and querysets.',
    'How do you handle authentication and authorization in Django?'
  ],
  'flask': [
    'What is the difference between Flask and Django?',
    'How do you handle routing in Flask?',
    'What are Flask blueprints and when would you use them?',
    'How do you implement database connections in Flask?',
    'Explain Flask\'s application context and request context.'
  ],
  'spring': [
    'What is dependency injection in Spring?',
    'Explain the Spring MVC architecture.',
    'What are Spring Boot auto-configurations?',
    'How do you handle transactions in Spring?',
    'What is the difference between @Component, @Service, and @Repository?'
  ],

  // Databases
  'mysql': [
    'What is the difference between INNER JOIN and LEFT JOIN?',
    'How do you optimize slow MySQL queries?',
    'What are database indexes and how do they work?',
    'Explain ACID properties in database transactions.',
    'What is database normalization and its benefits?'
  ],
  'postgresql': [
    'What are the advantages of PostgreSQL over MySQL?',
    'How do you handle JSON data in PostgreSQL?',
    'What are PostgreSQL stored procedures and functions?',
    'Explain PostgreSQL\'s MVCC (Multi-Version Concurrency Control).',
    'How do you implement full-text search in PostgreSQL?'
  ],
  'mongodb': [
    'What is the difference between SQL and NoSQL databases?',
    'How do you model relationships in MongoDB?',
    'What are MongoDB aggregation pipelines?',
    'Explain sharding in MongoDB.',
    'How do you ensure data consistency in MongoDB?'
  ],

  // Cloud Platforms
  'aws': [
    'What are the core services of AWS?',
    'How do you secure AWS resources using IAM?',
    'What is the difference between EC2 and Lambda?',
    'How do you implement auto-scaling in AWS?',
    'What are VPCs and how do they work?'
  ],
  'azure': [
    'What are Azure Resource Groups?',
    'How do you implement CI/CD with Azure DevOps?',
    'What is Azure Active Directory and its features?',
    'How do you monitor applications in Azure?',
    'What are Azure Functions and when would you use them?'
  ],
  'gcp': [
    'What are the core services of Google Cloud Platform?',
    'How does Google App Engine work?',
    'What is BigQuery and its use cases?',
    'How do you implement authentication with Google Cloud IAM?',
    'What are Google Cloud Functions?'
  ],

  // DevOps Tools
  'docker': [
    'What is containerization and how does Docker work?',
    'What is the difference between Docker images and containers?',
    'How do you optimize Docker images for production?',
    'What are Docker volumes and when would you use them?',
    'How do you implement multi-stage Docker builds?'
  ],
  'kubernetes': [
    'What are Kubernetes pods and how do they work?',
    'How do you implement service discovery in Kubernetes?',
    'What are ConfigMaps and Secrets in Kubernetes?',
    'How do you handle rolling updates and rollbacks?',
    'What is the difference between Deployment and StatefulSet?'
  ],
  'git': [
    'What is the difference between merge and rebase?',
    'How do you resolve merge conflicts in Git?',
    'What are Git hooks and how do you use them?',
    'Explain the Git workflow (GitFlow) strategy.',
    'How do you undo changes in Git?'
  ]
};

export function generateTechnicalQuestions(techStack: string[]): TechnicalQuestion[] {
  const questions: TechnicalQuestion[] = [];
  
  techStack.forEach(tech => {
    const normalizedTech = tech.toLowerCase().trim();
    const questionsForTech = technicalQuestionsDatabase[normalizedTech];
    
    if (questionsForTech) {
      // Select 3-5 random questions for each technology
      const shuffled = [...questionsForTech].sort(() => 0.5 - Math.random());
      const selectedQuestions = shuffled.slice(0, Math.min(4, questionsForTech.length));
      
      questions.push({
        technology: tech,
        questions: selectedQuestions
      });
    } else {
      // Fallback for unknown technologies
      questions.push({
        technology: tech,
        questions: [
          `What are the key features and benefits of ${tech}?`,
          `How would you explain ${tech} to a non-technical person?`,
          `What are some common challenges when working with ${tech}?`,
          `Can you describe a project where you used ${tech} effectively?`
        ]
      });
    }
  });
  
  return questions;
}

export function isValidTechStack(techStack: string[]): boolean {
  return techStack.length > 0 && techStack.every(tech => tech.trim().length > 0);
}