// First-run content for the projects section. This is only used to fill the
// database (or data/projects.json) when it is empty — after that, edit
// projects from the site itself using the admin key.
export default [
  {
    title: 'Organize Pixels Store',
    tagline: 'A digital store for my YouTube channel’s editing assets — with real payments.',
    description:
      'A production-deployed e-commerce platform where I sell digital editing assets (LUTs, presets, project files) to the audience of my YouTube channel, Organize Pixels.\n\nThe backend is a REST API built with Express and MongoDB that handles product listings, orders and user sessions. Authentication uses JWT with separate admin and buyer roles, and there is an admin dashboard for full product and order management.\n\nPayments go through Razorpay (UPI, cards, net banking) with server-side payment verification before digital files are delivered. Assets are stored securely on Cloudinary, and the app is deployed on Render and Vercel.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Razorpay', 'Cloudinary'],
    github: 'https://github.com/AbhilekhSingh-CS',
    live: '',
    videoUrl: '',
  },
  {
    title: 'ScriptAI',
    tagline: 'AI YouTube script generator powered by the Groq LLaMA API.',
    description:
      'A tool that turns a topic prompt into a structured, ready-to-record YouTube script — built to scratch my own itch as a YouTube creator.\n\nThe Express backend talks to the Groq LLaMA API and exposes RESTful endpoints with request validation, error handling and API-key authentication. The server is rate-limit aware and is structured with a clean separation of routes, controllers and middleware.\n\nThe frontend is built with React and Vite and consumes the API directly.',
    tech: ['Node.js', 'Express', 'Groq LLaMA API', 'React', 'Vite'],
    github: 'https://github.com/AbhilekhSingh-CS',
    live: '',
    videoUrl: '',
  },
  {
    title: 'PhishGuard',
    tagline: 'Machine-learning phishing URL detector with ~97.6% accuracy.',
    description:
      'A phishing URL detector built around a Random Forest classifier trained on the UCI phishing dataset.\n\nI did the feature engineering on URL structure, domain properties and character patterns myself, and evaluated the model with a confusion matrix and precision-recall metrics — it reaches roughly 97.6% classification accuracy.\n\nThe project ships with a real-time URL checking interface, and the trained model is serialized so it loads fast at runtime.',
    tech: ['Python', 'Scikit-Learn', 'Random Forest'],
    github: 'https://github.com/AbhilekhSingh-CS',
    live: '',
    videoUrl: '',
  },
];
