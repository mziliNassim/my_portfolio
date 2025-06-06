import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

import ScrollToTop from "./components/layouts/ScrollToTop.jsx";

import Portfolio from "./pages/Portfolio.jsx";
import Cv from "./pages/Cv";
import Links from "./pages/Links.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <>
      <Toaster theme="dark" />
      <ScrollToTop />
      <BrowserRouter>
        <Routes>
          <Route path="/" element=<Portfolio /> />

          {/* <Route path="/links" element=<Links /> /> */}
          <Route path="/cv" element=<Cv /> />

          <Route path="*" element=<NotFound /> />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
