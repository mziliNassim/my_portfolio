import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Code, Plus, Search, Clock, CheckCircle, Edit } from "lucide-react";
import { Trash2, ExternalLink, Calendar, Building, Timer } from "lucide-react";

import DashboardSideBar from "./DashboardSideBar.jsx";
import DashboardHeader from "./DashboardHeader.jsx";

import FloatingParticles from "../styles/FloatingParticles.jsx";
import AnimatedBackgroundElements from "../styles/AnimatedBackgroundElements.jsx";
import Loading from "../styles/Loading.jsx";

import { scrollToTop } from "../../utils/helpers.js";

const DashboardExperiences = ({
  experiences,
  setExperiences,
  loadingExperiences,
}) => {
  const { admin } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    scrollToTop();
    if (!admin) {
      window.location.href = "/admin/auth";
      return;
    }
  }, [admin]);

  // Delete Experience
  const deleteExperience = async (experienceId) => {
    if (!window.confirm("Are you sure you want to delete this experience?"))
      return;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URI}/api/experiences/${experienceId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      toast.success(
        response.data.message || "Experience deleted successfully!",
        {
          description: new Date().toUTCString(),
          action: { label: "✖️" },
        }
      );
      if (admin.data?.role == "admin")
        setExperiences(experiences.filter((exp) => exp._id !== experienceId));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    }
  };

  // Filter experiences
  const filteredExperiences = experiences.filter((experience) => {
    const matchesSearch =
      experience.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      experience.company?.name
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase()) ||
      experience.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || experience.type === filterType;

    return matchesSearch && matchesType;
  });

  // Get unique experience types for filter
  const experienceTypes = [...new Set(experiences.map((exp) => exp.type))];

  // Calculate stats
  const totalExperiences = experiences.length;
  const fullTimeExperiences = experiences.filter(
    (exp) => exp.timeType === "Full-time"
  ).length;
  const internshipExperiences = experiences.filter(
    (exp) => exp.type === "Internship" || exp.type === "Stage PFE"
  ).length;

  return (
    <section className="min-h-screen relative bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54] py-20 pt-20 pb-8 lg:py-16 lg:pt-28">
      <AnimatedBackgroundElements />
      <FloatingParticles />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <DashboardSideBar />
          {/* Right Side */}
          <div className="lg:col-span-3">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    My Experiences
                  </h1>
                  <p className="text-slate-400">
                    Manage your professional experience and work history
                  </p>
                </div>
                <Link
                  to="/admin/dashboard/add-experience"
                  className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </Link>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search experiences..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:border-blue-500/50 focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:border-blue-500/50 focus:outline-none transition-colors"
                  >
                    <option value="all">All Types</option>
                    {experienceTypes.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
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
                        {totalExperiences}
                      </p>
                      <p className="text-slate-400 text-sm">
                        Total Experiences
                      </p>
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
                        {fullTimeExperiences}
                      </p>
                      <p className="text-slate-400 text-sm">Full-time Roles</p>
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
                        {internshipExperiences}
                      </p>
                      <p className="text-slate-400 text-sm">Internships</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experiences cards Grid */}
              {loadingExperiences ? (
                <Loading size="md" />
              ) : (
                <>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {filteredExperiences.map((experience, i) => (
                      <div
                        key={experience._id}
                        className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:border-slate-600/50 transition-all duration-200 group"
                      >
                        {/* Experience Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-700/50 flex items-center justify-center">
                              {experience.logo ? (
                                <img
                                  src={experience.logo}
                                  alt={experience.company.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.nextSibling.style.display = "flex";
                                  }}
                                />
                              ) : (
                                <Building className="w-6 h-6 text-slate-400" />
                              )}
                              <div className="hidden w-full h-full items-center justify-center">
                                <Building className="w-6 h-6 text-slate-400" />
                              </div>
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-1">
                                {experience.role}
                              </h3>
                              <div className="flex items-center space-x-2 text-slate-400">
                                <a
                                  href={experience.company.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-blue-400 transition-colors flex items-center space-x-1"
                                >
                                  <span>{experience.company.name}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                              to={`/admin/dashboard/edit-experience/${experience._id}`}
                              className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => deleteExperience(experience._id)}
                              className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Experience Details */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center space-x-4 text-sm text-slate-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{experience.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Timer className="w-4 h-4" />
                              <span>{experience.timeType}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 text-sm">
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">
                              {experience.type}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {experience.description}
                          </p>
                        </div>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {filteredExperiences.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Code className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        No experiences found
                      </h3>
                      <p className="text-slate-400 mb-6">
                        {searchTerm || filterType !== "all"
                          ? "Try adjusting your search or filter criteria"
                          : "Start by adding your first professional experience"}
                      </p>
                      <Link
                        to="/admin/dashboard/add-experience"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Experience</span>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardExperiences;
