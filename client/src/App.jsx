import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import ScrollToTop from "./components/layouts/ScrollToTop.jsx";
import NavBar from "./components/layouts/NavBar.jsx";
import Footer from "./components/layouts/Footer.jsx";

import Portfolio from "./pages/Portfolio.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Links from "./pages/Links.jsx";
import NotFound from "./pages/NotFound.jsx";
import Cv from "./pages/Cv";

import Projects from "./components/portfolio/Projects.jsx";

import DashboardProjects from "./components/dashboard/DashboardProjects.jsx";
import DashboardInfos from "./components/dashboard/DashboardInfos.jsx";
import DashboardAddProjects from "./components/dashboard/DashboardAddProjects.jsx";
import DashboardEditProject from "./components/dashboard/DashboardEditProject.jsx";

import SignIn from "./components/dashboard/SignIn.jsx";

import Loading from "./components/styles/Loading.jsx";

import { clearAdmin, setAdmin } from "./features/adminSlice.js";

const App = () => {
  const { admin } = useSelector((state) => state.admin);
  const [theme] = useState("dark");

  const [loadingNassimInfo, setLoadingNassimInfo] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const [infos, setInfos] = useState({});
  const [projects, setProjects] = useState([]);

  const dispatch = useDispatch();

  // Fech Nassim's infos
  const getNassimInfos = async () => {
    try {
      setLoadingNassimInfo(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/api/nassim`
      );
      setInfos(response.data);
    } catch (error) {
      toast.error(error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingNassimInfo(false);
    }
  };

  // Fech Projects
  const getProjects = async () => {
    try {
      setLoadingProjects(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/api/projects`
      );
      setProjects(response.data.reverse());
    } catch (error) {
      toast.error(error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    // check admin localStorage
    const adminStorage = JSON.parse(localStorage.getItem("admin"));
    if (adminStorage) dispatch(setAdmin(adminStorage));
    else dispatch(clearAdmin());

    // Fetch API
    getNassimInfos();
    getProjects();
  }, []);

  if (loadingNassimInfo || loadingProjects)
    return (
      <div className="h-screen flex items-center justify-center overflow-hidden">
        <Toaster theme={theme} />
        <Loading size="md" />
      </div>
    );

  return (
    <div className={theme}>
      <Toaster theme={theme} />
      <ScrollToTop />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<Portfolio personalData={infos} projects={projects} />}
          />
          <Route path="/cv" element={<Cv personalData={infos} />} />
          <Route path="/mycv" element={<Cv personalData={infos} />} />
          <Route path="/links" element={<Links personalData={infos} />} />

          <Route
            path="/projects"
            element={<Projects page={true} projects={projects} />}
          />

          <Route path="/admin">
            <Route path="auth">
              <Route path="" element={<SignIn />} />
            </Route>

            <Route path="dashboard">
              <Route path="" element={<Dashboard />} />
              <Route path="infos" element={<DashboardInfos />} />
              <Route path="projects" element={<DashboardProjects />} />
              <Route path="add-project" element={<DashboardAddProjects />} />
              <Route
                path="edit-project/:id"
                element={<DashboardEditProject />}
              />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer personalData={infos} />
      </BrowserRouter>
    </div>
  );
};

export default App;
