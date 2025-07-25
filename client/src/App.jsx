import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import ScrollToTop from "./components/layouts/ScrollToTop.jsx";
import NavBar from "./components/layouts/NavBar.jsx";
import Footer from "./components/layouts/Footer.jsx";

import Portfolio from "./pages/Portfolio.jsx";
import Projects from "./components/portfolio/Projects.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Links from "./pages/Links.jsx";
import Cv from "./pages/Cv";

import NotFound from "./pages/NotFound.jsx";
import ServerError from "./pages/ServerError.jsx";

import DashboardInfos from "./components/dashboard/DashboardInfos.jsx";

import DashboardProjects from "./components/dashboard/DashboardProjects.jsx";
import DashboardAddProjects from "./components/dashboard/DashboardAddProjects.jsx";
import DashboardEditProject from "./components/dashboard/DashboardEditProject.jsx";

import DashboardExperiences from "./components/dashboard/DashboardExperiences.jsx";
import DashboardAddExperience from "./components/dashboard/DashboardAddExperience.jsx";
import DashboardEditExperience from "./components/dashboard/DashboardEditExperience.jsx";

import DashboardEducations from "./components/dashboard/DashboardEducations.jsx";
import DashboardAddEducation from "./components/dashboard/DashboardAddEducation.jsx";
import DashboardEditEducation from "./components/dashboard/DashboardEditEducation.jsx";

import DashboardAnalytics from "./components/dashboard/DashboardAnalytics.jsx";

import SignIn from "./components/dashboard/SignIn.jsx";

import Loading from "./components/styles/Loading.jsx";

import { clearAdmin, setAdmin } from "./features/adminSlice.js";
import { clearStats, setStats } from "./features/statsSlice.js";

const App = () => {
  const { admin } = useSelector((state) => state.admin);

  const [theme] = useState("dark");
  const [serverError, setServerError] = useState(false);

  const [loadingNassimInfo, setLoadingNassimInfo] = useState(true);
  const [loadingExperiences, setLoadingExperiences] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingEducations, setLoadingEducations] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  const [infos, setInfos] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [educations, setEducations] = useState([]);
  // const [stats, setStats] = useState({});

  const dispatch = useDispatch();

  // incriment visters stats
  const updateStatsIncrimentVisiters = async () => {
    try {
      // Determine device type
      const width = window.innerWidth;
      let device = "Desktop";
      if (width <= 768) device = "Mobile";
      else if (width > 768 && width <= 1024) device = "Tablet";

      // Current month abbreviation "Jul"
      const currentMonth = new Date().toLocaleString("default", {
        month: "short",
      });

      await axios.put(
        `${import.meta.env.VITE_SERVER_URI}/api/stats/incriment-visiters`,
        { device, currentMonth }
      );
    } catch (error) {
      if (!error.response) setServerError(true);
      toast.error(error?.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    }
  };

  const isValidToken = async (token) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/api/auth/verify-token`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // toast.success("Token is valid");
      return response.status === 200 && response.data.valid;
    } catch (error) {
      // toast.error("Token is invalid or expired");
      if (!error.response) setServerError(true);
      return false;
    }
  };

  // Fech Nassim's infos
  const getNassimInfos = async () => {
    try {
      setLoadingNassimInfo(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/api/nassim`
      );
      setInfos(response.data);
    } catch (error) {
      if (!error.response) setServerError(true);
      toast.error(error?.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingNassimInfo(false);
    }
  };

  // Fetch Experiences
  const getExperiences = async () => {
    try {
      setLoadingExperiences(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/api/experiences`
      );
      setExperiences(response.data.reverse());
    } catch (error) {
      if (!error.response) setServerError(true);
      toast.error(error?.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingExperiences(false);
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
      if (!error.response) setServerError(true);
      toast.error(error?.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingProjects(false);
    }
  };

  // Fech Education
  const getEducations = async () => {
    try {
      setLoadingEducations(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/api/educations`
      );
      setEducations(response.data.reverse());
    } catch (error) {
      if (!error.response) setServerError(true);
      toast.error(error?.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingEducations(false);
    }
  };

  // Fetch stats
  const getStats = async () => {
    setLoadingStats(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/api/stats`
      );
      dispatch(setStats(response.data));
    } catch (error) {
      if (!error.response) setServerError(true);
      dispatch(clearStats());
      toast.error(error?.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    // check admin localStorage
    const adminStorage = JSON.parse(localStorage.getItem("admin"));

    // Check if the token is expired
    if (adminStorage && isValidToken(adminStorage?.token))
      dispatch(setAdmin(adminStorage));
    else dispatch(clearAdmin());

    // Fetch API
    updateStatsIncrimentVisiters();
    getStats();
    getNassimInfos();
    getProjects();
    getEducations();
    getExperiences();
  }, []);

  if (
    loadingNassimInfo ||
    loadingExperiences ||
    loadingProjects ||
    loadingEducations ||
    loadingStats
  )
    return (
      <div className="h-screen flex items-center justify-center overflow-hidden">
        <Toaster theme={theme} />
        <Loading size="md" />
      </div>
    );

  if (serverError)
    return (
      <>
        <ServerError />
        <Toaster theme={theme} />
      </>
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
            element={
              <Portfolio
                personalData={infos}
                experiences={experiences}
                projects={projects}
                educations={educations}
              />
            }
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

              {/* Infos */}
              <Route
                path="infos"
                element={
                  <DashboardInfos
                    infos={infos}
                    setInfos={setInfos}
                    loadingNassimInfo={loadingProjects}
                  />
                }
              />

              {/* Projects */}
              <Route
                path="projects"
                element={
                  <DashboardProjects
                    setProjects={setProjects}
                    projects={projects}
                    loadingProjects={loadingProjects}
                  />
                }
              />
              <Route
                path="add-project"
                element={
                  <DashboardAddProjects
                    projects={projects}
                    setProjects={setProjects}
                  />
                }
              />
              <Route
                path="edit-project/:id"
                element={
                  <DashboardEditProject
                    projects={projects}
                    experiences={experiences}
                    setProjects={setProjects}
                  />
                }
              />

              {/* Experiences */}
              <Route
                path="experiences"
                element={
                  <DashboardExperiences
                    setExperiences={setExperiences}
                    experiences={experiences}
                    loadingExperiences={loadingExperiences}
                  />
                }
              />
              <Route
                path="add-experience"
                element={
                  <DashboardAddExperience
                    experiences={experiences}
                    setExperiences={setExperiences}
                  />
                }
              />
              <Route
                path="edit-experience/:id"
                element={
                  <DashboardEditExperience
                    experiences={experiences}
                    setExperiences={setExperiences}
                  />
                }
              />

              {/* Educations */}
              <Route
                path="educations"
                element={
                  <DashboardEducations
                    educations={educations}
                    setEducations={setEducations}
                    loadingEducations={loadingEducations}
                  />
                }
              />
              <Route
                path="add-education"
                element={
                  <DashboardAddEducation
                    educations={educations}
                    setEducations={setEducations}
                    loadingEducations={loadingEducations}
                  />
                }
              />
              <Route
                path="edit-education/:id"
                element={
                  <DashboardEditEducation
                    educations={educations}
                    setEducations={setEducations}
                  />
                }
              />

              {/* Analytics */}
              <Route
                path="analytics"
                element={<DashboardAnalytics loadingStats={loadingStats} />}
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
