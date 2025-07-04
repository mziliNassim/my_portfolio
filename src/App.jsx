import React, { useState } from "react";
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

  const withLayout = (Component) => (
    <>
      <NavBar />
      {Component}
      <Footer />
    </>
  );

  return (
    <div className={theme}>
      <Toaster theme={theme} />
      <ScrollToTop />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={withLayout(<Portfolio />)} />
          <Route path="/links" element={withLayout(<Links />)} />
          <Route path="/cv" element={<Cv />} />
          <Route path="/mycv" element={<Cv full={true} />} />

          <Route
            path="/projects"
            element={withLayout(<Projects page={true} />)}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
