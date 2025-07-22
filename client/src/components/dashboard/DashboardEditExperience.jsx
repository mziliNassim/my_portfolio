import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AlertCircle,
  ArrowLeft,
  Rocket,
  X,
  Plus,
  Upload,
  Link as LinkIcon,
} from "lucide-react";

import FloatingParticles from "../styles/FloatingParticles";
import AnimatedBackgroundElements from "../styles/AnimatedBackgroundElements";

import DashboardSideBar from "./DashboardSideBar.jsx";
import DashboardHeader from "./DashboardHeader.jsx";

import DashboardFormHeader from "./parts/DashboardFormHeader.jsx";
import DashboardFormTabs from "./parts/DashboardFormTabs.jsx";

import ExperienceDetails from "./experiences/ExperienceDetails.jsx";
import ExperienceGeneral from "./experiences/ExperienceGeneral.jsx";
import ExperienceTimeline from "./experiences/ExperienceTimeline.jsx";

import Loading from "../styles/Loading";

import { scrollToTop, compressToBase64 } from "../../utils/helpers";
import { experinecTabs as tabs } from "../../utils/tabs.js";

const DashboardEditExperience = ({ experiences, setExperiences }) => {
  const { id } = useParams();
  const { admin } = useSelector((state) => state.admin);

  const [activeTab, setActiveTab] = useState("general");
  const [experienceData, setExperienceData] = useState({
    role: "",
    company: {
      name: "",
      link: "",
    },
    duration: "",
    logo: "",
    description: "",
    technologies: [],
    timeType: "Full-time",
    type: "Full-time",
    startDate: "",
    endDate: "",
    current: false,
  });
  const [loadingExperience, setLoadingExperience] = useState(false);
  const [logoUploadType, setLogoUploadType] = useState("link");
  const [logoCompressing, setLogoCompressing] = useState(false);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
    if (!admin) {
      window.location.href = "/admin/auth";
      return;
    }
    fetchExperience();
  }, [admin, id]);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/api/experiences/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin?.token}`,
          },
        }
      );
      setExperienceData({
        ...response.data,
        collabWith:
          response.data?.collabWith && response.data?.collabWith?.length
            ? response.data?.collabWith
            : [],
        technologies: response.data?.technologies || [],
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

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setExperienceData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setExperienceData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const generateDuration = (startDate, endDate, isCurrentRole) => {
    if (!startDate) return "Not specified";

    const start = new Date(startDate);
    const end = isCurrentRole ? new Date() : new Date(endDate || new Date());

    const diffTime = Math.abs(end - start);
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));

    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;

    let duration = "";
    if (years > 0) {
      duration += `${years} year${years > 1 ? "s" : ""}`;
    }
    if (months > 0) {
      if (duration) duration += " ";
      duration += `${months} month${months > 1 ? "s" : ""}`;
    }

    return duration || "Less than a month";
  };

  const handleTechnologyRemove = (tech) => {
    setExperienceData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const validateForm = () => {
    if (!experienceData.role.trim()) {
      toast.error("Role is required", {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
      return false;
    }
    if (!experienceData.company.name.trim()) {
      toast.error("Company name is required", {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
      return false;
    }
    if (!experienceData.startDate) {
      toast.error("Start date is required", {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
      return false;
    }
    if (!experienceData.current && !experienceData.endDate) {
      toast.error("End date is required for past positions", {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
      return false;
    }
    if (!experienceData.description.trim()) {
      toast.error("Description is required", {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
      return false;
    }
    return true;
  };

  const updateExperience = async () => {
    if (!validateForm()) return;

    try {
      setLoadingExperience(true);
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URI}/api/experiences/${id}`,
        experienceData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin?.token}`,
          },
        }
      );

      toast.success(
        response.data.message || "Experience updated successfully!",
        {
          description: new Date().toUTCString(),
          action: { label: "✖️" },
        }
      );

      // Update the experience in the state
      const updatedExperiences = experiences.map((experience) =>
        experience._id === id
          ? { ...experience, ...experienceData }
          : experience
      );
      setExperiences(updatedExperiences);
      navigate(`/admin/dashboard/experiences`);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingExperience(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file", {
        description: "Only image files are allowed",
        action: { label: "✖️" },
      });
      return;
    }

    // Check file size (limit to 5MB before compression)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB", {
        description: "Please choose a smaller image",
        action: { label: "✖️" },
      });
      return;
    }

    try {
      setLogoCompressing(true);

      // Compress the image
      const compressedBase64 = await compressToBase64(file);

      setExperienceData((prev) => ({
        ...prev,
        logo: compressedBase64,
      }));

      toast.success("Logo compressed and uploaded successfully!", {
        description: "Image optimized for web",
        action: { label: "✖️" },
      });
    } catch (error) {
      console.error("Image compression error:", error);
      toast.error("Error processing image", {
        description: "Please try again with a different image",
        action: { label: "✖️" },
      });
    } finally {
      setLogoCompressing(false);
    }
  };

  const handleLogoRemove = () => {
    setExperienceData((prev) => ({
      ...prev,
      logo: "",
    }));
  };

  const handleTechnologyAdd = (tech) => {
    if (tech.trim() && !experienceData.technologies.includes(tech.trim())) {
      setExperienceData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, tech.trim()],
      }));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <ExperienceGeneral
            experienceData={experienceData}
            handleInputChange={handleInputChange}
            setLogoUploadType={setLogoUploadType}
            // ===========
            handleLogoUpload={handleLogoUpload}
            logoCompressing={logoCompressing}
            logoUploadType={logoUploadType}
            handleLogoRemove={handleLogoRemove}
          />
        );

      case "details":
        return (
          <ExperienceDetails
            experienceData={experienceData}
            handleTechnologyRemove={handleTechnologyRemove}
            handleTechnologyAdd={handleTechnologyAdd}
          />
        );

      case "timeline":
        return (
          <ExperienceTimeline
            experienceData={experienceData}
            handleInputChange={handleInputChange}
            generateDuration={generateDuration}
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
                    Edit Experience
                  </h1>
                  <p className="text-slate-400">
                    Update your experience details
                  </p>
                </div>
                <Link
                  to="/admin/dashboard/experiences"
                  className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Experiences</span>
                </Link>
              </div>
            </div>

            {/* Form */}
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <Loading />
              </div>
            ) : experienceData?.role ? (
              <div className="relative">
                <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                  {/* Form Header with Gradient */}
                  <DashboardFormHeader
                    title={`Edit Experience #${
                      experienceData?._id || "Loading..."
                    }`}
                    description="Update your Experience details"
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
                        onClick={updateExperience}
                        disabled={loadingExperience}
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loadingExperience ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Updating...</span>
                          </>
                        ) : (
                          <>
                            <Rocket className="w-5 h-5" />
                            <span>Update Experience</span>
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
                  title="Experience Not Found"
                  description="The experience you're looking for doesn't exist or may have been removed"
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
                      Experience Not Found
                    </h3>
                    <p className="text-slate-300 mb-6">
                      The experience with ID #{id} could not be found. It may
                      have been deleted or you might not have permission to
                      access it.
                    </p>
                    <Link
                      to="/admin/dashboard/experiences"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to experiences
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

export default DashboardEditExperience;
