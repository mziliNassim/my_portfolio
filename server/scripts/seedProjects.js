// scripts/seedProjects.js
require("dotenv").config();
const mongoose = require("mongoose");
const Project = require("../models/Project");

const projects = [
  {
    id: `dbc-${Date.now()}`,
    name: "Digital Business Cards",
    poster: "/projects/posters/digital-business-cards.png",
    // gif: "/projects/gif/digital-business-cards.gif",
    description:
      "A modern solution for seamless professional networking, enabling users to create, share, and manage digital business cards effortlessly. The platform offers a 30-day free trial and supports team-based card distribution, making it ideal for businesses and individuals alike. Designed for accessibility, it allows instant connections anywhere, ensuring every interaction leaves a lasting impression. Note: Currently in active development, with features being progressively enhanced.",
    tools: [
      "Node JS",
      "MongoDB",
      "Express",
      "Tailwindcss",
      "React JS",
      "motion",
      "Mongoose",
      "Nodemailer",
      "@reduxjs/toolkit",
      "bcryptjs",
      "lucide-react",
      "react-redux",
      "react-router-dom",
      "sonner",
      "vite",
      "cookie-parser",
      "jsonwebtoken",
      "dotenv",
      "crypto",
    ],
    role: "Full Stack Developer",
    code: "https://github.com/mziliNassim/modern-digital-business-card",
    demo: "https://digital-business-cards-client.netlify.app/",
    inDevelopment: true,
    collabWith: [],
  },
  {
    id: `prtfolio-${Date.now()}`,
    name: "My Portfolio",
    poster: "/projects/posters/portfolio.png",
    // gif: "/projects/gif/portfolio.gif",
    description:
      "Application web moderne conçue pour présenter mes projets, mes compétences et mon parcours en tant que développeur web. Il offre une navigation fluide et une interface épurée grâce à React JS et Tailwind CSS, tout en intégrant des animations interactives pour améliorer l’expérience utilisateur. Le formulaire de contact est entièrement fonctionnel via EmailJS, permettant aux visiteurs de me contacter facilement.",
    tools: [
      "React JS",
      "emailjs",
      "Tailwindcss",
      "sonner",
      "lucide-react",
      "react-router-dom",
      "vite",
    ],
    role: "Front end Developer",
    code: "",
    demo: "https://nassim.online/",
    collabWith: [],
  },
  {
    id: `calculator-${Date.now()}`,
    name: "Trading Calculator",
    poster: "/projects/posters/tradingcalculator.png",
    // gif: "/projects/gif/tradingcalculator.gif",
    description:
      "Web Application Simple Trading Calculator est un outil convivial conçu pour aider les traders à calculer efficacement les indicateurs de trading essentiels, garantissant une planification précise des transactions et une gestion efficace des risques. Conçue à l'aide de React JS pour une fonctionnalité dynamique et de Bootstrap pour une conception réactive, cette application est à la fois pratique et facile à utiliser.",
    tools: ["React JS", "Bootstrap", "sonner", "bootstrap-icons"],
    role: "Front end Developer",
    code: "https://github.com/mziliNassim/trading-calculator-react",
    demo: "https://nassimtradingcalculator.netlify.app/",
    collabWith: [],
  },
  {
    id: `wiki-${Date.now()}`,
    name: "Wiki Search",
    poster: "/projects/posters/wiki.png",
    // gif: "/projects/gif/wiki.gif",
    description:
      "Web Application de recherche simple et intuitif qui permet aux utilisateurs de rechercher des articles et de récupérer des informations pertinentes rapidement et efficacement. Conçue avec React JS, stylisée à l'aide de Bootstrap et alimentée par l'API Wikipedia, l'application offre un moyen simple d'explorer un vaste éventail de connaissances.",
    tools: [
      "React JS",
      "Bootstrap",
      "Wikipidia API",
      "Axios",
      "API",
      "Lucide React",
    ],
    role: "Front end Developer",
    code: "https://github.com/mziliNassim/wiki-react",
    demo: "https://wikipedia-searching.netlify.app/",
    collabWith: [],
  },
  {
    id: `LibriTech-${Date.now()}`,
    name: "LibriTech",
    poster: "/projects/posters/libritech.png",
    // gif: "/projects/gif/libritech.png",
    description:
      "Une application de prêt de livres technologiques qui permet aux utilisateurs d'emprunter et de suivre facilement des livres. Elle offre un accès sécurisé permettant aux administrateurs de gérer les livres, les prêts et les utilisateurs.",
    tools: [
      "Express JS",
      "React JS",
      "Tailwindcss",
      "MongoDB",
      "Netlify Deploy",
      "Axios",
      "Nodemailer",
      "Redux",
      "Bcrypt JS",
      "Sonner",
      "Crypto",
      "Cors",
      "Dotenv",
      "Jsonwebtoken",
      "Serverless-http",
      "Git",
      "Lottie React",
      "Lucide React",
      "Mongoose",
      "React Type Animation",
      "Reduxjs/toolkit",
      "Vite",
    ],
    role: "Full Stack Developer",
    code: "https://github.com/mziliNassim/library-management",
    demo: "https://library-system-pfe.netlify.app/",
    collabWith: [
      {
        name: "EL OUALI Abderrahim",
        email: "contact@elouali.online",
        linkedIn: "https://www.linkedin.com/in/abderrahim-el/",
        github: "https://github.com/abderrahimelouali",
        Website: "https://elouali.online/",
        instagram: "https://www.instagram.com/abderrahim_elouali04/",
        phone: "",
        address: "",
        facebook: "",
        twitter: "",
        profile: "https://elouali.online/me.jpeg",
      },
    ],
  },
  {
    id: `generateur-de-certificats-${Date.now()}`,
    name: "Generateur De Dertificats",
    poster: "/projects/posters/generateur-de-certificats.png",
    // gif: "/projects/gif/generateur-de-certificats.gif",
    description:
      "Une application web intuitive permettant de créer et personnaliser des certificats de formation. Les utilisateurs peuvent saisir les informations du participant (prénom, nom, date d'obtention), sélectionner le titre de la formation, et générer un certificat téléchargeable au format PDF. L'application inclut un QR code unique pour vérification en ligne, offrant une solution professionnelle et sécurisée pour valider les compétences acquises.",
    tools: [
      "React JS",
      "Tailwindcss",
      "qrcode.react",
      "react-router-dom",
      "lucide-react",
      "@react-pdf",
      "vite",
    ],
    role: "Front end Developer",
    code: "",
    demo: "https://web4jobs-formation.netlify.app/generateur-de-certificats",
    collabWith: [],
  },
  {
    id: `planificateur-de-formation-${Date.now()}`,
    name: "Planificateur De Formation",
    poster: "/projects/posters/planificateur.png",
    // gif: "/projects/gif/planificateur.gif",
    description:
      "Outil de gestion de formations conçu pour simplifier l'organisation des modules pédagogiques. L'application permet de définir le nombre de modules, d'assigner des thèmes spécifiques à chacun, et de planifier les sessions selon les jours disponibles. Une interface claire et efficace pour les formateurs, facilitant la structuration et la visualisation du déroulé des formations.",
    tools: [
      "React JS",
      "Tailwindcss",
      "react-router-dom",
      "lucide-react",
      "@react-pdf",
      "vite",
    ],
    role: "Front end Developer",
    code: "",
    demo: "https://web4jobs-formation.netlify.app/planificateur-de-Formation",
    collabWith: [],
  },
  {
    id: `postman-${Date.now()}`,
    name: "Postman Clone",
    poster: "/projects/posters/postman_project.png",
    // gif: "/projects/gif/postman_project.gif",
    description:
      "Une application web puissante et intuitive conçue pour tester les requêtes HTTP telles que 'GET', 'POST', 'PUT', et bien d'autres. Développée avec React JS, stylisée avec Bootstrap, et utilisant Redux Toolkit pour la gestion de l'état, cette application offre une expérience fluide aux développeurs pour interagir avec des API. Grâce à Axios pour la gestion des appels API, cet outil simplifie l'envoi de requêtes et l'analyse des réponses, en faisant un outil indispensable pour le débogage et les tests d'API.",
    tools: ["React JS", "Bootstrap", "Axios", "Redux", "Redux/toolkit", "API"],
    role: "Front end Developer",
    code: "https://github.com/mziliNassim/postman-clone-react",
    demo: "https://postman-nassim.netlify.app/",
    collabWith: [],
  },
];

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Project.deleteMany();
    await Project.insertMany(projects);
    console.log("✅ Projects seeded");
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

seedProjects();
