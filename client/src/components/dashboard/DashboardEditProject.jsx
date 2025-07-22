import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AlertCircle, ArrowLeft, Rocket } from "lucide-react";

import FloatingParticles from "../styles/FloatingParticles";
import AnimatedBackgroundElements from "../styles/AnimatedBackgroundElements";

import DashboardSideBar from "./DashboardSideBar.jsx";
import DashboardHeader from "./DashboardHeader.jsx";

import DashboardFormHeader from "./parts/DashboardFormHeader.jsx";
import DashboardFormTabs from "./parts/DashboardFormTabs.jsx";

import ProjectBasicInfo from "./projects/ProjectBasicInfo";
import ProjectCollaborators from "./projects/ProjectCollaborators";
import ProjectMedia from "./projects/ProjectMedia.jsx";
import ProjectSettings from "./projects/ProjectSettings.jsx";

import Loading from "../styles/Loading";

import { scrollToTop, compressToBase64 } from "../../utils/helpers";
import { projectTabs as tabs } from "../../utils/tabs.js";

const DashboardEditProject = ({ projects, setProjects }) => {
  const { id } = useParams();
  const { admin } = useSelector((state) => state.admin);

  const [activeTab, setActiveTab] = useState("basic");
  const [projectData, setProjectData] = useState({
    name: "",
    poster: "",
    description: "",
    tools: [],
    role: "",
    code: "",
    demo: "",
    inDevelopment: false,
    collabWith: [],
  });
  const [posterType, setPosterType] = useState("url");
  const [posterFile, setPosterFile] = useState(null);
  const [loadingProject, setLoadingProject] = useState(false);
  const [newTool, setNewTool] = useState("");
  const [imageCompressing, setImageCompressing] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
    if (!admin) {
      window.location.href = "/admin/auth";
      return;
    }
    fetchProject();
  }, [admin, id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/api/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${admin?.token}`,
          },
        }
      );
      setProjectData({
        ...response.data,
        collabWith:
          response.data?.collabWith && response.data?.collabWith?.length
            ? response.data?.collabWith
            : [],
      });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setProjectData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleCollabChange = (index, field, value) => {
    const updatedCollabs = [...projectData?.collabWith];
    updatedCollabs[index][field] = value;
    setProjectData({ ...projectData, collabWith: updatedCollabs });
  };

  const addCollaborator = () => {
    setProjectData({
      ...projectData,
      collabWith: [
        ...projectData?.collabWith,
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
    const updated = projectData?.collabWith.filter((_, i) => i !== index);
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB", {
        description: "Please choose a smaller image",
        action: { label: "✖️" },
      });
      return;
    }

    try {
      setImageCompressing(true);
      setPosterFile(file);

      const compressedBase64 = await compressToBase64(file);

      setProjectData({
        ...projectData,
        poster: compressedBase64,
      });

      toast.success("Image compressed and uploaded successfully!", {
        description: "Image optimized for web",
        action: { label: "✖️" },
      });
    } catch (error) {
      toast.error("Error processing image", {
        description: "Please try again with a different image",
        action: { label: "✖️" },
      });
    } finally {
      setImageCompressing(false);
    }
  };

  const updateProject = async () => {
    if (!validateForm()) return;
    try {
      setLoadingProject(true);
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URI}/api/projects/${id}`,
        projectData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin?.token}`,
          },
        }
      );
      toast.success(response.data.message || "Project updated successfully!", {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });

      // Update the project in the state
      const updatedProjects = projects.map((project) =>
        project._id === id ? { ...project, ...projectData } : project
      );
      setProjects(updatedProjects);
      navigate(`/admin/dashboard/projects`);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingProject(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <ProjectBasicInfo
            projectData={projectData}
            handleChange={handleChange}
            newTool={newTool}
            setNewTool={setNewTool}
            addTool={addTool}
            removeTool={removeTool}
          />
        );
      case "collaborators":
        return (
          <ProjectCollaborators
            projectData={projectData}
            handleCollabChange={handleCollabChange}
            addCollaborator={addCollaborator}
            removeCollaborator={removeCollaborator}
          />
        );
      case "media":
        return (
          <ProjectMedia
            posterType={posterType}
            setPosterType={setPosterType}
            projectData={projectData}
            setProjectData={setProjectData}
            posterFile={posterFile}
            handleImageUpload={handleImageUpload}
            imageCompressing={imageCompressing}
          />
        );
      case "settings":
        return (
          <ProjectSettings
            projectData={projectData}
            handleChange={handleChange}
          />
        );
      default:
        return null;
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
                    Edit Project
                  </h1>
                  <p className="text-slate-400">Update your project details</p>
                </div>
                <Link
                  to="/admin/dashboard/projects"
                  className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Projects</span>
                </Link>
              </div>
            </div>

            {/* Form */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loading />
              </div>
            ) : projectData?.name ? (
              <div className="relative">
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                  {/* Form Header with Gradient */}
                  <DashboardFormHeader
                    title={`Edit Project #${projectData?._id || "Loading..."}`}
                    description="Update your project details"
                  />

                  {/* Tabs */}
                  <DashboardFormTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tabs={tabs}
                  />

                  {/* Form Content */}
                  <div className="p-8">
                    {renderTabContent()}

                    {/* Submit Button */}
                    <div className="mt-12 flex justify-end">
                      <button
                        onClick={updateProject}
                        disabled={loadingProject}
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loadingProject ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Updating...</span>
                          </>
                        ) : (
                          <>
                            <Rocket className="w-5 h-5" />
                            <span>Update Project</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                <DashboardFormHeader
                  title="Project Not Found"
                  description="The project you're looking for doesn't exist or may have been removed"
                />

                <div className="p-8 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="flex justify-center mb-4">
                      <AlertCircle
                        className="h-16 w-16 text-rose-500"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Project Not Found
                    </h3>
                    <p className="text-slate-300 mb-6">
                      The project with ID #{id} could not be found. It may have
                      been deleted or you might not have permission to access
                      it.
                    </p>
                    <Link
                      to="/admin/dashboard/projects"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Projects
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardEditProject;
