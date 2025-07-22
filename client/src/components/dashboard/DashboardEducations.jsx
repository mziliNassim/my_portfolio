import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { GraduationCap, Plus, Search, Clock } from "lucide-react";
import { Edit, Trash2, Calendar, MapPin, Award } from "lucide-react";
import { Target, School, Trophy, BookOpen, CheckCircle } from "lucide-react";

import DashboardSideBar from "./DashboardSideBar.jsx";
import DashboardHeader from "./DashboardHeader.jsx";

import FloatingParticles from "../styles/FloatingParticles.jsx";
import AnimatedBackgroundElements from "../styles/AnimatedBackgroundElements.jsx";
import Loading from "../styles/Loading.jsx";

import { scrollToTop } from "../../utils/helpers.js";

const DashboardEducations = ({
  educations,
  setEducations,
  loadingEducations,
}) => {
  const { admin } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    scrollToTop();
    if (!admin) {
      window.location.href = "/admin/auth";
      return;
    }
  }, [admin]);

  // Delete Education
  const deleteEducation = async (educationId) => {
    if (!window.confirm("Are you sure you want to delete this education?"))
      return;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URI}/api/educations/${educationId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin?.token}`,
          },
        }
      );
      toast.success(
        response.data.message || "Education deleted successfully!",
        {
          description: new Date().toUTCString(),
          action: { label: "✖️" },
        }
      );
      if (admin.data.role === "admin")
        setEducations(educations?.filter((e) => e._id !== educationId));
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    }
  };

  // Filter educations
  const filteredEducations = educations?.filter((education) => {
    const matchesSearch =
      education.title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      education.institution
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase()) ||
      education.city?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      education.description?.toLowerCase().includes(searchTerm?.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || education.status === filterStatus;
    const matchesType = filterType === "all" || education.type === filterType;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Get unique education types and statuses for filters
  const educationTypes = [...new Set(educations?.map((edu) => edu.type))];
  const educationStatuses = [...new Set(educations?.map((edu) => edu.status))];

  // Calculate stats
  const totalEducations = educations?.length;
  const completedEducations = educations?.filter(
    (edu) => edu.status === "Completed"
  ).length;
  const progressEducations = educations?.filter(
    (edu) => edu.status === "Progress"
  ).length;
  const certifiedEducations = educations?.filter(
    (edu) => edu.status === "Certified"
  ).length;
  const degreeEducations = educations?.filter(
    (edu) => edu.type === "Degree"
  ).length;

  // Get status color and icon
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400";
      case "Progress":
        return "bg-yellow-500/20 text-yellow-400";
      case "Certified":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-slate-500/20 text-slate-400";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Degree":
        return <GraduationCap className="w-4 h-4" />;
      case "Certification":
        return <Award className="w-4 h-4" />;
      case "Technicien Spécialisé":
        return <Trophy className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

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
            <div className="mb-8">
              {/* Header Section */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    My Education
                  </h1>
                  <p className="text-slate-400">
                    Manage your educational background and qualifications
                  </p>
                </div>
                <Link
                  to="/admin/dashboard/add-education"
                  className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Education</span>
                </Link>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search education..."
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
                    <option value="all">All Status</option>
                    {educationStatuses?.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:border-blue-500/50 focus:outline-none transition-colors"
                  >
                    <option value="all">All Types</option>
                    {educationTypes?.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {totalEducations}
                      </p>
                      <p className="text-slate-400 text-sm">Total Education</p>
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
                        {completedEducations}
                      </p>
                      <p className="text-slate-400 text-sm">Completed</p>
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
                        {progressEducations}
                      </p>
                      <p className="text-slate-400 text-sm">In Progress</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <GraduationCap className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {degreeEducations}
                      </p>
                      <p className="text-slate-400 text-sm">Degrees</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education cards Grid */}
              {loadingEducations ? (
                <Loading size="md" />
              ) : (
                <>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {filteredEducations?.map((education, i) => (
                      <div
                        key={education._id}
                        className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 hover:border-slate-600/50 transition-all duration-200 group"
                      >
                        {/* Education Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center">
                              {getTypeIcon(education.type)}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white mb-1 leading-tight">
                                {education.title}
                              </h3>
                              <div className="flex items-center space-x-2 text-slate-400 mb-2">
                                <School className="w-4 h-4" />
                                <span className="text-sm">
                                  {education.institution}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-slate-400">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">
                                  {education.city}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                              to={`/admin/dashboard/edit-education/${education._id}`}
                              className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => deleteEducation(education._id)}
                              className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Education Details */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-sm text-slate-400">
                              <Calendar className="w-4 h-4" />
                              <span>{education.duration}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  education.status
                                )}`}
                              >
                                {education.status}
                              </span>
                              <span className="px-2 py-1 bg-slate-500/20 text-slate-400 rounded-full text-xs">
                                {education.type}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        {education.description && (
                          <div className="mb-4">
                            <p className="text-slate-300 text-sm leading-relaxed">
                              {education.description}
                            </p>
                          </div>
                        )}

                        {/* Achievements */}
                        {education.achievements &&
                          education.achievements.length > 0 && (
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-sm text-slate-400">
                                <Target className="w-4 h-4" />
                                <span className="font-medium">
                                  Key Achievements:
                                </span>
                              </div>
                              <div className="grid grid-cols-1 gap-2">
                                {education.achievements?.map(
                                  (achievement, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center space-x-2 text-sm"
                                    >
                                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                                      <span className="text-slate-300">
                                        {achievement}
                                      </span>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                  {filteredEducations?.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        No education found
                      </h3>
                      <p className="text-slate-400 mb-6">
                        {searchTerm ||
                        filterStatus !== "all" ||
                        filterType !== "all"
                          ? "Try adjusting your search or filter criteria"
                          : "Start by adding your first educational qualification"}
                      </p>
                      <Link
                        to="/admin/dashboard/add-education"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Education</span>
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

export default DashboardEducations;
