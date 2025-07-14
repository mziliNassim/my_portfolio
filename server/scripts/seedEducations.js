require("dotenv").config();

const mongoose = require("mongoose");
const Education = require("../models/Education.js");

const educations = [
  {
    title: "Web Full-Stack Développement | Développement Digital",
    institution: "Institut Supérieur des Techniques Appliquées",
    duration: "2023 - En cours",
    city: "Tinghir",
    description: "",
    achievements: [
      "Full-Stack Development",
      "Hardware and Software",
      "SQL and NoSQL DBs",
      "DevOps and Microservices",
      "Soft-skills",
      "Languages: English & French",
    ],
    type: "Degree",
    status: "Progress",
  },
  {
    title: "Mathematical and Computer Sciences (SMI)",
    institution: 'Faculty of Sciences "SEMLALIA"',
    duration: "2019 - 2022",
    city: "Marrakech",
    description: "",
    achievements: [
      "Computer hardware and software",
      "Algorithms and problem solving",
      "Mathematics",
    ],
    type: "Degree",
    status: "Completed",
  },
  {
    title: "Mastering Microsoft Office Tools",
    institution: "Centre de Formation de Compétence et d’Accompagnement",
    duration: "3 Months - 2022",
    city: "Marrakech",
    description: "",
    achievements: ["Computer hardware", "Microsoft Office Tools"],
    type: "Certification",
    status: "Certified",
  },
  {
    title: "Automobile Electronic Diagnostics",
    institution: 'Training Center "Atlantic"',
    duration: "6 Months - 2022",
    city: "Marrakech",
    description: "",
    achievements: [
      "Diagnose electronic vehicle issues",
      "Identify malfunctions using advanced diagnostic tools",
      "Proficient with a wide range of car brands and models",
    ],
    type: "Certification",
    status: "Certified",
  },
  {
    title: "Baccalaureate in Mathematical Sciences (B)",
    institution: 'Technical High School "Ibn Al Haitam"',
    duration: "2018 - 2019",
    city: "Ouarzazate",
    description: "",
    achievements: [
      "Mathematics",
      "Physics & Chemistry",
      "General Science",
      "Languages: English & French",
    ],
    type: "Certification",
    status: "Certified",
  },
];

const seedEducations = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Education.deleteMany(); // supprime les anciennes données
    await Education.insertMany(educations);
    console.log("✅ Education data seeded!");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding education data:", err.message);
    process.exit(1);
  }
};

seedEducations();
