import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Code, Plus, Search, Clock, CheckCircle } from "lucide-react";

import DashboardSideBar from "./DashboardSideBar.jsx";
import DashboardHeader from "./DashboardHeader.jsx";

import FloatingParticles from "../styles/FloatingParticles.jsx";
import AnimatedBackgroundElements from "../styles/AnimatedBackgroundElements.jsx";
import Loading from "../styles/Loading.jsx";

import ProjectCard from "../portfolio/ProjectCard.jsx";

import { scrollToTop } from "../../utils/helpers.js";

const DashboardProjects = ({ projects, loadingProjects }) => {
  const { admin } = useSelector((state) => state.admin);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (!admin) {
      window.location.href = "/admin/auth";
      return;
    }
    scrollToTop();
  }, []);

  // Delete Project
  const deleteProject = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URI}/api/projects/${projectId}`
      );
      toast.success(response.data.message || "Project deleted successfully!", {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
      setProjects(projects.filter((p) => p._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error(error.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "development" && project.inDevelopment) ||
      (filterStatus === "completed" && !project.inDevelopment);
    return matchesSearch && matchesFilter;
  });

  return (
    <section className="min-h-screen relative bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54] py-20 pt-20 pb-8 lg:py-16 lg:pt-28">
      <AnimatedBackgroundElements />
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <DashboardSideBar />

          <div className="lg:col-span-3">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    My Projects
                  </h1>
                  <p className="text-slate-400">
                    Manage and showcase your development projects
                  </p>
                </div>
                <Link
                  to="/admin/dashboard/add-project"
                  className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </Link>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-500/50 focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:border-blue-500/50 focus:outline-none transition-colors"
                  >
                    <option value="all">All Projects</option>
                    <option value="development">In Development</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Code className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {projects.length}
                      </p>
                      <p className="text-slate-400 text-sm">Total Projects</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {projects.filter((p) => p.inDevelopment).length}
                      </p>
                      <p className="text-slate-400 text-sm">In Development</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {projects.filter((p) => !p.inDevelopment).length}
                      </p>
                      <p className="text-slate-400 text-sm">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            {loadingProjects ? (
              <Loading size="md" />
            ) : (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {filteredProjects.map((project, i) => (
                    <ProjectCard
                      key={i}
                      index={i}
                      project={project}
                      desc={false}
                      onDeleteProject={deleteProject}
                    />
                  ))}
                </div>

                {filteredProjects.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-slate-700/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="text-slate-400 text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      No projects found
                    </h3>
                    <p className="text-slate-400">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardProjects;
