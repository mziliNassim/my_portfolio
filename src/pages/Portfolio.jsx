import React from "react";

import NavBar from "../components/layouts/NavBar";
import Footer from "../components/layouts/Footer.jsx";

import Hero from "../components/portfolio/Hero";
import About from "../components/portfolio/About";
import Experience from "../components/portfolio/Experience";
import Skills from "../components/portfolio/Skills";
import Education from "../components/portfolio/Education";
import Contact from "../components/portfolio/Contact";

import Projects from "../components/portfolio/Projects";

const Portfolio = () => {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      {/* <Projects /> */}
      <Education />
      <Contact />
    </>
  );
};

export default Portfolio;
