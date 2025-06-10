import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import ScrollToTop from "./components/layouts/ScrollToTop.jsx";
import NavBar from "./components/layouts/NavBar.jsx";
import Footer from "./components/layouts/Footer.jsx";

import Portfolio from "./pages/Portfolio.jsx";
import Cv from "./pages/Cv";
import Links from "./pages/Links.jsx";
import NotFound from "./pages/NotFound.jsx";

import Projects from "./components/portfolio/Projects.jsx";

function App() {
  const [theme] = useState("dark");
  return (
    <>
      <div class={theme}>
        <Toaster theme={theme} />
        <ScrollToTop />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <NavBar />
                  <Portfolio />
                  <Footer />
                </>
              }
            />
            <Route
              path="/links"
              element={
                <>
                  <NavBar />
                  <Links />
                  <Footer />
                </>
              }
            />
            <Route
              path="/projects"
              element={
                <>
                  <NavBar />
                  <Projects page={true} />
                  <Footer />
                </>
              }
            />

            <Route path="/cv" element=<Cv /> />
            <Route path="*" element=<NotFound /> />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
