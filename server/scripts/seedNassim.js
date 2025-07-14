// scripts/seedMe.js
require("dotenv").config();
const mongoose = require("mongoose");
const Nassim = require("../models/Nassim");

const nassimData = {
  name: "Nassim MZILI",
  profile: "/profile.jpeg",
  designation: ["Full Stack Developer", "MERN Stack Developer"],
  description:
    "Aspiring Full-Stack Web Developer and dedicated student with a passion for creating dynamic, user-friendly web applications. Actively learning front-end and back-end technologies to build innovative solutions for modern web challenges. Committed to growing skills and contributing to impactful digital experiences.",
  email: "mzilinassim@gmail.com",
  phone: "+212681930875",
  address: "",
  github: "https://github.com/mziliNassim/",
  facebook: "https://www.facebook.com/mziliNassim/",
  linkedIn: "https://www.linkedin.com/in/mziliNassim/",
  twitter: "https://twitter.com/nassim__dev",
  instagram: "https://instagram.com/nassim__dev",
  Website: "https://nassim.online/",
  tele: "+212681930875",
  stackOverflow: "",
  leetcode: "",
  devUsername: "mzilinassim",
  interests: ["Web Development", "Open Source", "Tech Innovation"],
  resume:
    "https://drive.google.com/file/d/1tGt1C4MSChUJkIqziQOv9rtcpOAooJsi/view",
  fullResume:
    "https://drive.google.com/file/d/1epugv6uTOMMgdIQuPCSS9_8OFN_8-nbN/view",
  skills: [
    "React",
    "Node JS",
    "TailwindCSS",
    "Docker",
    "Markdown",
    "MongoDB",
    "Microsoft Office",
    "Bootstrap",
    "Python",
    "PHP",
    "Git",
    "Figma",
    "Canva",
    "ViteJS",
    "MySQL",
    "Redux",
    "HTML",
    "CSS",
    "JS",
  ],
  experience: "2+ Years",
  projects: "10+ Projects",
  clients: "10+ Happy Clients",
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Nassim.deleteMany(); // clear old
    await Nassim.create(nassimData);
    console.log("✅ Seeded 'Nassim' data");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
