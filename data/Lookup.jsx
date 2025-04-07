import dedent from "dedent";
import { Code, Rocket, Star, Zap } from "lucide-react";

export default {
  SUGGSTIONS: ['Create a Recipe Finder App', 'Develop a Personal Portfolio Website', 'Create a Music Playlist App', 'Develop a Task Management App', 'Build a Weather Forecast App'],
  INPUT_PLACEHOLDER: 'What you want to build?',
  SIGNIN_HEADING: 'Continue With NextDev',
  SIGNIN_SUBHEADING: 'To use Bolt you must log into an existing account or create one.',
  SIGNIn_AGREEMENT_TEXT: 'By continuing, you agree to the collection of usage data for analytics.',


  DEFAULT_FILE: {
    '/public/index.html': {
      code: `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      <div id="root"></div>
      <script type="module" src="/index.js"></script>
    </body>
  </html>`
    },
    '/index.js': {
      code: `
  import React from "react";
  import ReactDOM from "react-dom/client";
  import App from "./App";
  import "./App.css";
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );`
    },
    '/App.js': {
      code: `
  import React from "react";
  
  function App() {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">Hello, World!</h1>
      </div>
    );
  }
  
  export default App;
  `
    },
    '/App.css': {
      code: `
  @tailwind base;
  @tailwind components;
  @tailwind utilities;`
    },
    '/tailwind.config.js': {
      code: `
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      "./**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }`
    },
    '/postcss.config.js': {
      code: `/** @type {import('postcss-load-config').Config} */
  const config = {
    plugins: {
      tailwindcss: {},
    },
  };
  
  export default config;
  `
    }
  },
  DEPENDANCY: {

    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    autoprefixer: "^10.0.0",
    "uuid4": "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.469.0",
    "react-router-dom": "^7.1.1",
    "firebase": "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
  },
  PRICING_DESC: 'Start with a free account to speed up your workflow on public projects or boost your entire team with instantly-opening production environments.',
  PRICING_OPTIONS: [
    {
      name: 'Basic',
      tokens: '50K',
      value: 50000,
      desc: 'Ideal for hobbyists and casual users for light, exploratory use.',
      price: 4.99,
      features: [
        { text: "Up to 5 users", included: true },
        { text: "Basic analytics", included: false },
        { text: "24-hour support", included: false },
        { text: "1GB storage", included: false },
        { text: "API access", included: false },
        { text: "Custom branding", included: false },
      ],
    },
    {
      name: 'Starter',
      tokens: '120K',
      value: 120000,
      desc: 'Designed for professionals who need to use Bolt a few times per week.',
      price: 9.99,
      features: [
        { text: "Up to 5 users", included: true },
        { text: "Basic analytics", included: true },
        { text: "24-hour support", included: false },
        { text: "1GB storage", included: false },
        { text: "API access", included: false },
        { text: "Custom branding", included: false },
      ],
    },
    {
      name: 'Pro',
      tokens: '2.5M',
      value: 2500000,
      desc: 'Designed for professionals who need to use Bolt a few times per week.',
      price: 19.99,
      features: [
        { text: "Up to 5 users", included: true },
        { text: "Basic analytics", included: true },
        { text: "24-hour support", included: true },
        { text: "1GB storage", included: true },
        { text: "API access", included: false },
        { text: "Custom branding", included: false },
      ],
    },
    {
      name: 'Unlimted (License)',
      tokens: 'Unmited',
      value: 999999999,
      desc: 'Designed for professionals who need to use Bolt a few times per week.',
      price: 49.99,
      features: [
        { text: "Up to 5 users", included: true },
        { text: "Basic analytics", included: true },
        { text: "24-hour support", included: true },
        { text: "1GB storage", included: true },
        { text: "API access", included: true },
        { text: "Custom branding", included: true },
      ],
    }
  ],
  FEATURES: [
    {
      icon: <Zap size={24} className="text-emerald-400" />,
      title: "Lightning Fast",
      description: "Build and deploy in minutes, not days"
    },
    {
      icon: <Code size={24} className="text-blue-400" />,
      title: "Developer Friendly",
      description: "Clean code that's easy to customize"
    },
    {
      icon: <Star size={24} className="text-yellow-400" />,
      title: "AI-Powered",
      description: "Smart suggestions that learn from you"
    },
    {
      icon: <Rocket size={24} className="text-purple-400" />,
      title: "Ready to Launch",
      description: "Everything you need to go live"
    }
  ],


}