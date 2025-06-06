import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import NavBar from "./NavBar";
import ScrollToTop from "./ScrollToTop.jsx";

import Hero from "./Hero";
import About from "./About.jsx";
import Skills from "./Skills.jsx";
import Education from "./Education.jsx";
import Contact from "./Contact.jsx";

import Experience from "./Experience.jsx";
import Projects from "./Projects.jsx";

function App() {
  return (
    <>
      <Toaster theme="dark" />
      <ScrollToTop />
      <BrowserRouter>
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <NavBar />
          <Hero />
          <About />
          <Experience />
          <Skills />
          {/* <Projects /> */}
          <Education />
          <Contact />
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
