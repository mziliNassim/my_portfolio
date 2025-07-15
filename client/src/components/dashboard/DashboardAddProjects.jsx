import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  FaGithub,
  FaExternalLinkAlt,
  FaUsers,
  FaCode,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaFilter,
  FaSearch,
  FaImage,
  FaLink,
  FaUpload,
  FaTimes,
  FaRocket,
  FaTools,
  FaUser,
  FaEnvelope,
  FaLinkedin,
  FaArrowLeft,
} from "react-icons/fa";
import {
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi";

import DashboardSideBar from "./DashboardSideBar.jsx";
import DashboardHeader from "./DashboardHeader.jsx";

import FloatingParticles from "../styles/FloatingParticles.jsx";
import AnimatedBackgroundElements from "../styles/AnimatedBackgroundElements.jsx";

import Loading from "../styles/Loading.jsx";
import { scrollToTop } from "../../utils/helpers.js";

const DashboardAddProjects = () => {
  const { admin } = useSelector((state) => state.admin);

  const [projectData, setProjectData] = useState({
    name: "",
    poster: "",
    description: "",
    tools: [],
    role: "",
    code: "",
    demo: "",
    inDevelopment: false,
    collabWith: [
      {
        name: "",
        email: "",
        linkedIn: "",
        github: "",
        Website: "",
        instagram: "",
        phone: "",
        address: "",
        facebook: "",
        twitter: "",
        profile: "",
      },
    ],
  });
  const [posterType, setPosterType] = useState("url");
  const [posterFile, setPosterFile] = useState(null);
  const [loadingProject, setLoadingProject] = useState(false);
  const [newTool, setNewTool] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    scrollToTop();
    if (!admin) {
      window.location.href = "/admin/auth";
      return;
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setProjectData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleCollabChange = (index, field, value) => {
    const updatedCollabs = [...projectData.collabWith];
    updatedCollabs[index][field] = value;
    setProjectData({ ...projectData, collabWith: updatedCollabs });
  };

  const addCollaborator = () => {
    setProjectData({
      ...projectData,
      collabWith: [
        ...projectData.collabWith,
        {
          name: "",
          email: "",
          linkedIn: "",
          github: "",
          Website: "",
          instagram: "",
          phone: "",
          address: "",
          facebook: "",
          twitter: "",
          profile: "",
        },
      ],
    });
  };

  const removeCollaborator = (index) => {
    const updated = projectData.collabWith.filter((_, i) => i !== index);
    setProjectData({ ...projectData, collabWith: updated });
  };

  const addTool = () => {
    if (newTool.trim() !== "") {
      setProjectData({
        ...projectData,
        tools: [...projectData.tools, newTool.trim()],
      });
      setNewTool("");
    }
  };

  const removeTool = (index) => {
    const updatedTools = projectData.tools.filter((_, i) => i !== index);
    setProjectData({ ...projectData, tools: updatedTools });
  };

  const validateForm = () => {
    if (!projectData.name || !projectData.description) {
      toast.error("Name and Description are required.", {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
      return false;
    }
    if (projectData.code && !/^https?:\/\//.test(projectData.code)) {
      toast.error("Code link must be a valid URL.", {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
      return false;
    }
    if (projectData.demo && !/^https?:\/\//.test(projectData.demo)) {
      toast.error("Demo link must be a valid URL.", {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
      return false;
    }
    return true;
  };

  const addProject = async () => {
    if (!validateForm()) return;
    try {
      setLoadingProject(true);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URI}/api/projects`,
        projectData
      );
      toast.success(response.data.message || "Project added successfully!", {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error(error.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingProject(false);
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
                  to="/admin/dashboard/projects"
                  className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  <span>Back to Projects</span>
                </Link>
              </div>
            </div>

            {/* Modern Creative Form */}
            <div className="relative">
              {/* Glassmorphism Container */}
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Form Header with Gradient */}
                <div className="relative bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 p-8 border-b border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                        <FaRocket className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          Create New Project
                        </h2>
                        <p className="text-slate-300">
                          Bring your ideas to life
                        </p>
                      </div>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center space-x-4 mt-6">
                      {[
                        { step: 1, label: "Basic Info", icon: FaCode },
                        { step: 2, label: "Details", icon: FaTools },
                        { step: 3, label: "Collaborators", icon: FaUsers },
                        { step: 4, label: "Media", icon: FaImage },
                      ].map(({ step, label, icon: Icon }) => (
                        <div key={step} className="flex items-center space-x-2">
                          <div
                            className={`p-2 rounded-full transition-all duration-300 ${
                              activeStep >= step
                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                : "bg-white/10 text-slate-400"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span
                            className={`text-sm font-medium ${
                              activeStep >= step
                                ? "text-white"
                                : "text-slate-400"
                            }`}
                          >
                            {label}
                          </span>
                          {step < 4 && (
                            <div
                              className={`w-8 h-0.5 transition-all duration-300 ${
                                activeStep > step
                                  ? "bg-gradient-to-r from-blue-500 to-purple-600"
                                  : "bg-white/20"
                              }`}
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8 space-y-8">
                  {/* Basic Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                      <h3 className="text-xl font-semibold text-white">
                        Project Information
                      </h3>
                    </div>

                    {/* Project Name */}
                    <div className="group">
                      <label className=" text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
                        <FaCode className="w-4 h-4" />
                        <span>Project Name</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={projectData.name}
                          onChange={handleChange}
                          className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400"
                          placeholder="Enter your amazing project name..."
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="group">
                      <label className=" text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
                        <FaEdit className="w-4 h-4" />
                        <span>Description</span>
                      </label>
                      <div className="relative">
                        <textarea
                          name="description"
                          value={projectData.description}
                          onChange={handleChange}
                          rows="4"
                          className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400 resize-none"
                          placeholder="Tell us about your project's vision and goals..."
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    </div>

                    {/* Tools Section */}
                    <div className="group">
                      <label className=" text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
                        <FaTools className="w-4 h-4" />
                        <span>Tech Stack</span>
                      </label>
                      <div className="flex gap-3 mb-4">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={newTool}
                            onChange={(e) => setNewTool(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && addTool()}
                            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400"
                            placeholder="e.g., React, Node.js, MongoDB..."
                          />
                        </div>
                        <button
                          onClick={addTool}
                          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                        >
                          <FaPlus className="w-4 h-4" />
                          <span>Add</span>
                        </button>
                      </div>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-3">
                        {projectData.tools.map((tool, index) => (
                          <div
                            key={index}
                            className="group/tag flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 text-white px-4 py-2 rounded-full hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                          >
                            <span className="text-sm font-medium">{tool}</span>
                            <button
                              onClick={() => removeTool(index)}
                              className="w-5 h-5 flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 rounded-full transition-all duration-200"
                            >
                              <FaTimes className="w-3 h-3 text-red-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Role and Links Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="group">
                        <label className=" text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
                          <FaUser className="w-4 h-4" />
                          <span>Your Role</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="role"
                            value={projectData.role}
                            onChange={handleChange}
                            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400"
                            placeholder="e.g., Full Stack Developer"
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className=" text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
                          <FaGithub className="w-4 h-4" />
                          <span>GitHub Repo</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="code"
                            value={projectData.code}
                            onChange={handleChange}
                            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400"
                            placeholder="https://github.com/..."
                          />
                        </div>
                      </div>

                      <div className="group">
                        <label className=" text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
                          <FaExternalLinkAlt className="w-4 h-4" />
                          <span>Live Demo</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="demo"
                            value={projectData.demo}
                            onChange={handleChange}
                            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400"
                            placeholder="https://your-demo.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Development Status */}
                    <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id="inDevelopment"
                          name="inDevelopment"
                          checked={projectData.inDevelopment}
                          onChange={handleChange}
                          className="w-5 h-5 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label
                          htmlFor="inDevelopment"
                          className="text-slate-300 font-medium flex items-center space-x-2"
                        >
                          <HiOutlineClock className="w-5 h-5" />
                          <span>Project in Development</span>
                        </label>
                      </div>
                      {projectData.inDevelopment && (
                        <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
                          <HiOutlineSparkles className="w-4 h-4" />
                          <span className="text-sm">Work in Progress</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Collaborators Section */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                        <h3 className="text-xl font-semibold text-white">
                          Collaborators
                        </h3>
                      </div>
                      <button
                        onClick={addCollaborator}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <FaPlus className="w-4 h-4" />
                        <span>Add Collaborator</span>
                      </button>
                    </div>

                    {projectData.collabWith.map((collab, idx) => (
                      <div
                        key={idx}
                        className="group/collab relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="absolute top-4 right-4">
                          <button
                            onClick={() => removeCollaborator(idx)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-12">
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">
                              Name
                            </label>
                            <input
                              placeholder="Full Name"
                              value={collab.name}
                              onChange={(e) =>
                                handleCollabChange(idx, "name", e.target.value)
                              }
                              className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">
                              Email
                            </label>
                            <input
                              placeholder="email@example.com"
                              value={collab.email}
                              onChange={(e) =>
                                handleCollabChange(idx, "email", e.target.value)
                              }
                              className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">
                              GitHub
                            </label>
                            <input
                              placeholder="https://github.com/username"
                              value={collab.github}
                              onChange={(e) =>
                                handleCollabChange(
                                  idx,
                                  "github",
                                  e.target.value
                                )
                              }
                              className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">
                              LinkedIn
                            </label>
                            <input
                              placeholder="https://linkedin.com/in/username"
                              value={collab.linkedIn}
                              onChange={(e) =>
                                handleCollabChange(
                                  idx,
                                  "linkedIn",
                                  e.target.value
                                )
                              }
                              className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Poster Image Section */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-rose-600 rounded-full"></div>
                      <h3 className="text-xl font-semibold text-white">
                        Project Media
                      </h3>
                    </div>

                    {/* Poster Type Selection */}
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setPosterType("url")}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                          posterType === "url"
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                            : "bg-white/5 text-slate-300 border border-white/20 hover:bg-white/10"
                        }`}
                      >
                        <FaLink className="w-4 h-4" />
                        <span>Image URL</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPosterType("upload")}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                          posterType === "upload"
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                            : "bg-white/5 text-slate-300 border border-white/20 hover:bg-white/10"
                        }`}
                      >
                        <FaUpload className="w-4 h-4" />
                        <span>Upload File</span>
                      </button>
                    </div>

                    {/* Poster Input */}
                    {posterType === "url" && (
                      <div className="group">
                        <input
                          type="text"
                          value={projectData.poster}
                          onChange={(e) =>
                            setProjectData({
                              ...projectData,
                              poster: e.target.value,
                            })
                          }
                          className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400"
                          placeholder="https://example.com/your-project-image.jpg"
                        />
                      </div>
                    )}

                    {posterType === "upload" && (
                      <div className="group">
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setPosterFile(file);
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                  setProjectData({
                                    ...projectData,
                                    poster: e.target.result,
                                  });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-blue-500 file:to-purple-600 file:text-white file:cursor-pointer"
                          />
                        </div>
                        {posterFile && (
                          <div className="mt-4 relative">
                            <img
                              src={projectData.poster}
                              alt="Preview"
                              className="max-h-48 w-full object-cover rounded-xl shadow-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                            <p className="text-sm text-slate-300 mt-2 flex items-center space-x-2">
                              <HiOutlineCheckCircle className="w-4 h-4 text-green-400" />
                              <span>Image uploaded successfully</span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Section */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border-t border-white/20 p-8">
                  <button
                    onClick={addProject}
                    disabled={loadingProject}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      loadingProject
                        ? "bg-gray-600 cursor-not-allowed text-gray-300"
                        : "bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
                    }`}
                  >
                    {loadingProject ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating Project...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <FaRocket className="w-5 h-5" />
                        <span>Launch Project</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardAddProjects;
