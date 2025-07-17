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

import DashboardInfos from "./components/dashboard/DashboardInfos.jsx";
import DashboardProjects from "./components/dashboard/DashboardProjects.jsx";
import DashboardExperiences from "./components/dashboard/DashboardExperiences.jsx";
import DashboardEducations from "./components/dashboard/DashboardEducations.jsx";
import DashboardAnalytics from "./components/dashboard/DashboardAnalytics.jsx";

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
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUpdateStats, setLoadingUpdateStats] = useState(true);

  const [infos, setInfos] = useState({});
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalExperiences: 0,
    totalEducations: 0,
    totalVisitors: 0,
    viewsData: [
      { name: "Aug", views: 0 },
      { name: "Sep", views: 0 },
      { name: "Oct", views: 0 },
      { name: "Nov", views: 0 },
      { name: "Dec", views: 0 },
      { name: "Jan", views: 0 },
      { name: "Feb", views: 0 },
      { name: "Mar", views: 0 },
      { name: "Apr", views: 0 },
      { name: "May", views: 0 },
      { name: "Jun", views: 0 },
      { name: "Jul", views: 0 },
    ],
    deviceData: [
      { name: "Desktop", value: 0, color: "#3B82F6" },
      { name: "Mobile", value: 0, color: "#10B981" },
      { name: "Tablet", value: 0, color: "#F59E0B" },
    ],
  });

  const dispatch = useDispatch();

  // incriment visters stats
  const updateStatsIncrimentVisiters = async () => {
    setLoadingUpdateStats(true);
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
      toast.error(error?.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingUpdateStats(false);
    }
  };

  // Fetch stats
  const getStats = async () => {
    setLoadingStats(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/api/stats`
      );
      setStats(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingStats(false);
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
    updateStatsIncrimentVisiters();
    getStats();
    getNassimInfos();
    getProjects();
  }, []);

  if (loadingNassimInfo || loadingProjects || loadingStats)
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
              <Route path="experiences" element={<DashboardExperiences />} />
              <Route path="educations" element={<DashboardEducations />} />
              <Route
                path="analytics"
                element={
                  <DashboardAnalytics
                    stats={stats}
                    loadingStats={loadingStats}
                  />
                }
              />

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
