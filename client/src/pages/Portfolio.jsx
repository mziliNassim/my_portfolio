import React, { useEffect } from "react";

import Hero from "../components/portfolio/Hero";
import About from "../components/portfolio/About";
import Experience from "../components/portfolio/Experience";
import Skills from "../components/portfolio/Skills";
import Education from "../components/portfolio/Education";
import Projects from "../components/portfolio/Projects";
import Contact from "../components/portfolio/Contact";

import { scrollToTop } from "../utils/helpers";

const Portfolio = ({ personalData, experiences, projects, educations }) => {
  useEffect(() => {
    scrollToTop();
  });

  return (
    <>
      <Hero personalData={personalData} />
      <About personalData={personalData} />
      <Experience experiences={experiences} />
      <Skills />
      <Projects projects={projects} />
      <Education educations={educations} />
      <Contact personalData={personalData} />
    </>
  );
};

export default Portfolio;
