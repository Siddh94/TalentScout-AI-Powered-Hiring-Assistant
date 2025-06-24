# TalentScout-AI-Powered-Hiring-Assistant

TalentScout is an AI-powered hiring assistant designed to streamline the candidate screening and interview process for technology roles. It provides an interactive, chat-based interface to collect candidate information, assess technical skills, and summarize results for recruiters—all while ensuring privacy and security.

## Features

- **Conversational UI:** Engages candidates in a friendly, step-by-step chat to collect essential information (name, email, phone, experience, desired position, location, tech stack).
- **AI-Driven Technical Assessment:** Dynamically generates technical questions based on the candidate’s tech stack.
- **Progress Tracking:** Visual progress indicators and summaries of collected information.
- **Privacy & Security:** All candidate data is encrypted and handled in compliance with GDPR and international privacy standards.
- **Modern UI:** Responsive, animated, and theme-switchable interface using React and Tailwind CSS.

## Demo

[> _demo here if available._
](https://drive.google.com/file/d/14siMLsnmTsw-s27biKOWae1mMtObS2_j/view?usp=sharing)
## Getting Started

### Prerequisites

- **Node.js** (v16+ recommended)
- **npm** (v8+ recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/TalentScout-AI-Powered-Hiring-Assistant.git
   cd TalentScout-AI-Powered-Hiring-Assistant
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the App

- **Development mode:**
  ```bash
  npm run dev
  ```
  The app will be available at `http://localhost:5173` (or as indicated in your terminal).

- **Production build:**
  ```bash
  npm run build
  npm run preview
  ```

### Linting

- To check code quality:
  ```bash
  npm run lint
  ```

## Usage

1. Open the app in your browser.
2. Follow the chat prompts to enter your information and answer technical questions.
3. At the end, review your summary and next steps.

## Project Structure

- `src/` – Main source code
  - `components/` – React UI components
  - `hooks/` – Custom React hooks (e.g., theme switching)
  - `utils/` – Utility functions (conversation flow, technical questions, validation)
  - `types/` – TypeScript type definitions
- `index.html` – App entry point
- `index.css` – Tailwind and custom styles
- `vite.config.ts` – Vite configuration

## Customization

- **Technical Questions:** Add or modify questions in `src/utils/technicalQuestions.ts`.
- **Styling:** Adjust Tailwind config in `tailwind.config.js` and custom styles in `src/index.css`.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for new features, bug fixes, or improvements.

## License

> _Specify your license here (e.g., MIT, Apache 2.0)._

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
