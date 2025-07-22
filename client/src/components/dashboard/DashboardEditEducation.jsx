import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeft, Rocket } from "lucide-react";

import DashboardSideBar from "./DashboardSideBar.jsx";
import DashboardHeader from "./DashboardHeader.jsx";

import DashboardFormTabs from "./parts/DashboardFormTabs.jsx";
import DashboardFormHeader from "./parts/DashboardFormHeader.jsx";

import EducationBasic from "./educations/EducationBasic.jsx";
import EducationDetails from "./educations/EducationDetails.jsx";
import EducationAchievements from "./educations/EducationAchievements.jsx";

import DashboardNotFoundUpdate from "./parts/DashboardNotFoundUpdate.jsx";

import FloatingParticles from "../styles/FloatingParticles.jsx";
import AnimatedBackgroundElements from "../styles/AnimatedBackgroundElements.jsx";

import Loading from "../styles/Loading.jsx";

import { scrollToTop } from "../../utils/helpers.js";
import { educationTabs as tabs } from "../../utils/tabs";

const DashboardEditEducation = ({
  educations,
  setEducations,
  loadingEducations,
}) => {
  const { admin } = useSelector((state) => state.admin);

  const [loading, setLoading] = useState(true);
  const [loadingEducation, setLoadingEducation] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [newAchievement, setNewAchievement] = useState("");
  const [educationData, setEducationData] = useState({
    title: "",
    institution: "",
    duration: "",
    city: "",
    description: "",
    achievements: [],
    type: "Degree", // ["Degree", "Certification"] only
    status: "Completed", // ["Progress", "Completed", "Certified"] only
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchEducationById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URI}/api/educations/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      setEducationData(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollToTop();
    if (!admin) {
      window.location.href = "/admin/auth";
      return;
    }

    fetchEducationById(id);
  }, [admin]);

  const addAchievements = (e) => {
    e.preventDefault();
    if (newAchievement.trim()) {
      setEducationData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()],
      }));
      setNewAchievement("");
    }
  };

  const removeAchievement = (indexToRemove) => {
    setEducationData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const required = ["title", "institution", "duration", "city"];
    for (let field of required) {
      if (!educationData[field].trim()) {
        toast.error(
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required!`
        );
        return false;
      }
    }
    return true;
  };

  const updateEducation = async () => {
    if (!validateForm()) return;

    try {
      setLoadingEducation(true);
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URI}/api/educations/${id}`,
        educationData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );
      toast.success(response.data.message || "Education update successfully!", {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
      if (admin.data.role == "admin") {
        const updatedEducations = educations.map((education) =>
          education._id === id ? { ...education, ...educationData } : education
        );
        setEducations(updatedEducations);
      }
      navigate("/admin/dashboard/educations");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingEducation(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <EducationBasic
            educationData={educationData}
            handleChange={handleChange}
          />
        );

      case "details":
        return (
          <EducationDetails
            educationData={educationData}
            handleChange={handleChange}
          />
        );

      case "achievements":
        return (
          <EducationAchievements
            newAchievement={newAchievement}
            setNewAchievement={setNewAchievement}
            addAchievements={addAchievements}
            removeAchievement={removeAchievement}
            educationData={educationData}
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
                  to="/admin/dashboard/educations/"
                  className="flex items-center cursor-pointer space-x-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Education</span>
                </Link>
              </div>

              {/* Form */}
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <Loading />
                </div>
              ) : educationData?.title !== "" ? (
                <div className="relative">
                  <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                    <DashboardFormHeader
                      title={`Update Education #${id}`}
                      description="Edit the details of this educational record, such as the institution, degree, field of study, and dates."
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
                          onClick={updateEducation}
                          disabled={loadingEducation}
                          className="px-8 py-4 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {loadingEducation ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <Rocket className="w-5 h-5" />
                              <span>Launch Education</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <DashboardNotFoundUpdate type="education" id={id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardEditEducation;
