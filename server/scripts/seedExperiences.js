// scripts/seedExperiences.js
require("dotenv").config();
const mongoose = require("mongoose");
const Experience = require("../models/Experience");

const experiences = [
  {
    role: "Junior Full Stack Developer",
    company: {
      name: "WEB4JOBS",
      link: "https://www.linkedin.com/company/web4jobs/",
    },
    duration: "Avril 2025 - Mai 2025",
    logo: "/companies/web4jobs.jpeg",
    description:
      "Contributed to the development of two key web applications: a planning and certificate generation tool, and a content management dashboard. Collaborated on both frontend and backend tasks using the MERN stack. Implemented interactive data visualizations with Recharts, optimized API endpoints, and participated in code reviews and agile meetings.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Recharts"],
    timeType: "Full-time",
    type: "Stage PFE",
  },
];

const seedExperiences = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Experience.deleteMany();
    await Experience.insertMany(experiences);
    console.log("✅ Experiences seeded!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err.message);
    process.exit(1);
  }
};

seedExperiences();
