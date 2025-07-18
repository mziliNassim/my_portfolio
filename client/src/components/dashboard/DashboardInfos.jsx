import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useSelector } from "react-redux";

import { Briefcase, Check, Code, Facebook, DownloadCloud } from "lucide-react";
import { Github, Globe, Instagram, Link, Edit } from "lucide-react";
import { Linkedin, Plus, MessageSquareCode, Send, X } from "lucide-react";
import { Wrench, Trash2, Twitter, User, Sparkles } from "lucide-react";

import DashboardSideBar from "./DashboardSideBar";
import DashboardHeader from "./DashboardHeader.jsx";

import FloatingParticles from "../styles/FloatingParticles";
import AnimatedBackgroundElements from "../styles/AnimatedBackgroundElements";
import Loading from "../styles/Loading.jsx";

import { scrollToTop } from "../../utils/helpers.js";

const DashboardInfos = ({ infos, setInfos, loadingNassimInfo }) => {
  const { admin } = useSelector((state) => state.admin);

  const [activeTab, setActiveTab] = useState("basic");
  const [loadingSave, setLoadingSave] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempInfos, setTempInfos] = useState({ ...infos });
  const tabs = [
    { id: "basic", label: "Basic Info", icon: User },
    { id: "social", label: "Social Links", icon: Link },
    { id: "professional", label: "Professional", icon: Briefcase },
    { id: "skills", label: "Skills & Interests", icon: Wrench },
  ];

  useEffect(() => {
    scrollToTop();
    if (!admin) {
      window.location.href = "/admin/auth";
      return;
    }
  }, [admin]);

  // Edite, Save, Cancel Events

  const handleEdit = () => {
    setIsEditing(true);
    setTempInfos({ ...infos });
  };

  const handleCancel = () => {
    setTempInfos({ ...infos });
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      setLoadingSave(true);
      setInfos({ ...tempInfos });
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URI}/api/nassim/`,
        tempInfos
      );
      console.log(" handleSave ~ response:", response);
      toast.success(response.data.message || "success !", {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } catch (error) {
      toast.error(error.message, {
        description: new Date().toUTCString(),
        action: { label: "✖️" },
      });
    } finally {
      setLoadingSave(false);
      setIsEditing(false);
    }
  };

  const handleInputChange = (field, value) => {
    setTempInfos((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Arrays change events

  const handleArrayChange = (field, index, value) => {
    setTempInfos((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field) => {
    setTempInfos((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (field, index) => {
    setTempInfos((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Tabs rendring

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            value={isEditing ? tempInfos?.name : infos?.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Profile Image
          </label>
          <input
            type="text"
            value={isEditing ? tempInfos?.profile : infos?.profile}
            onChange={(e) => handleInputChange("profile", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            value={isEditing ? tempInfos?.email : infos?.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone
          </label>
          <input
            type="text"
            value={isEditing ? tempInfos?.phone : infos?.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Address
          </label>
          <input
            type="text"
            value={isEditing ? tempInfos?.address : infos?.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={isEditing ? tempInfos?.description : infos?.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          disabled={!isEditing}
          rows={5}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Designations
        </label>
        <div className="space-y-2">
          {isEditing
            ? tempInfos?.designation?.map((designation, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) =>
                      handleArrayChange("designation", index, e.target.value)
                    }
                    disabled={!isEditing}
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
                  />
                  {isEditing && (
                    <button
                      onClick={() => removeArrayItem("designation", index)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 />
                    </button>
                  )}
                </div>
              ))
            : infos?.designation?.map((designation, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) =>
                      handleArrayChange("designation", index, e.target.value)
                    }
                    disabled={!isEditing}
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
                  />
                  {isEditing && (
                    <button
                      onClick={() => removeArrayItem("designation", index)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 />
                    </button>
                  )}
                </div>
              ))}
          {isEditing && (
            <button
              onClick={() => addArrayItem("designation")}
              className="flex items-center gap-2 px-4 py-2 bg-pink-500/20 border border-pink-500/50 rounded-lg text-pink-400 hover:bg-pink-500/30 transition-colors"
            >
              <Plus /> Add Designation
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderSocialLinks = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Github className="text-gray-400" /> GitHub
          </label>
          <input
            type="url"
            value={isEditing ? tempInfos?.github : infos?.github}
            onChange={(e) => handleInputChange("github", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Linkedin className="text-blue-400" /> LinkedIn
          </label>
          <input
            type="url"
            value={isEditing ? tempInfos?.linkedIn : infos?.linkedIn}
            onChange={(e) => handleInputChange("linkedIn", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Twitter className="text-blue-400" /> Twitter
          </label>
          <input
            type="url"
            value={isEditing ? tempInfos?.twitter : infos?.twitter}
            onChange={(e) => handleInputChange("twitter", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Instagram className="text-pink-400" /> Instagram
          </label>
          <input
            type="url"
            value={isEditing ? tempInfos?.instagram : infos?.instagram}
            onChange={(e) => handleInputChange("instagram", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Facebook className="text-blue-600" /> Facebook
          </label>
          <input
            type="url"
            value={isEditing ? tempInfos?.facebook : infos?.facebook}
            onChange={(e) => handleInputChange("facebook", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Globe className="text-green-400" /> Website
          </label>
          <input
            type="url"
            value={isEditing ? tempInfos?.Website : infos?.Website}
            onChange={(e) => handleInputChange("Website", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Send className="text-blue-400" /> Telegram
          </label>
          <input
            type="text"
            value={isEditing ? tempInfos?.tele : infos?.tele}
            onChange={(e) => handleInputChange("tele", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <MessageSquareCode className="text-orange-400" /> Stack Overflow
          </label>
          <input
            type="url"
            value={isEditing ? tempInfos?.stackOverflow : infos?.stackOverflow}
            onChange={(e) => handleInputChange("stackOverflow", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <Code className="text-yellow-400" /> LeetCode
          </label>
          <input
            type="url"
            value={isEditing ? tempInfos?.leetcode : infos?.leetcode}
            onChange={(e) => handleInputChange("leetcode", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Dev Username
          </label>
          <input
            type="text"
            value={isEditing ? tempInfos?.devUsername : infos?.devUsername}
            onChange={(e) => handleInputChange("devUsername", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );

  const renderProfessional = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Experience
          </label>
          <input
            type="text"
            value={isEditing ? tempInfos?.experience : infos?.experience}
            onChange={(e) => handleInputChange("experience", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Projects
          </label>
          <input
            type="text"
            value={isEditing ? tempInfos?.projects : infos?.projects}
            onChange={(e) => handleInputChange("projects", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Clients
          </label>
          <input
            type="text"
            value={isEditing ? tempInfos?.clients : infos?.clients}
            onChange={(e) => handleInputChange("clients", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <DownloadCloud className="text-blue-400" /> Resume
          </label>
          <input
            type="url"
            value={isEditing ? tempInfos?.resume : infos?.resume}
            onChange={(e) => handleInputChange("resume", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
            <DownloadCloud className="text-green-400" /> Full Resume
          </label>
          <input
            type="url"
            value={isEditing ? tempInfos?.fullResume : infos?.fullResume}
            onChange={(e) => handleInputChange("fullResume", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );

  const renderSkillsAndInterests = () => (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">
          Skills
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {(isEditing ? tempInfos?.skills : infos?.skills).map(
            (skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) =>
                    handleArrayChange("skills", index, e.target.value)
                  }
                  disabled={!isEditing}
                  className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50 text-sm"
                />
                {isEditing && (
                  <button
                    onClick={() => removeArrayItem("skills", index)}
                    className="p-1 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            )
          )}
          {isEditing && (
            <button
              onClick={() => addArrayItem("skills")}
              className="flex items-center justify-center gap-2 px-3 py-2 bg-pink-500/20 border border-pink-500/50 rounded-lg text-pink-400 hover:bg-pink-500/30 transition-colors text-sm"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">
          Interests
        </label>
        <div className="space-y-2">
          {(isEditing ? tempInfos?.interests : infos?.interests).map(
            (interest, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={interest}
                  onChange={(e) =>
                    handleArrayChange("interests", index, e.target.value)
                  }
                  disabled={!isEditing}
                  className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none transition-colors disabled:opacity-50"
                />
                {isEditing && (
                  <button
                    onClick={() => removeArrayItem("interests", index)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 />
                  </button>
                )}
              </div>
            )
          )}
          {isEditing && (
            <button
              onClick={() => addArrayItem("interests")}
              className="flex items-center gap-2 px-4 py-2 bg-pink-500/20 border border-pink-500/50 rounded-lg text-pink-400 hover:bg-pink-500/30 transition-colors"
            >
              <Plus /> Add Interest
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return renderBasicInfo();
      case "social":
        return renderSocialLinks();
      case "professional":
        return renderProfessional();
      case "skills":
        return renderSkillsAndInterests();
      default:
        return renderBasicInfo();
    }
  };

  return (
    <section className="min-h-screen relative bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54] py-20  pt-20 pb-8 lg:py-16 lg:pt-28">
      <AnimatedBackgroundElements />
      <FloatingParticles />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DashboardHeader />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Right Side - Profile Section */}
          <DashboardSideBar />

          {/* Left Side - Management Cards */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900/50 h-full backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                  <div className="p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl">
                    <Sparkles className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Profile Information
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Manage your personal details
                    </p>
                  </div>
                </div>

                {!loadingNassimInfo && (
                  <div className="flex items-center gap-3">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium"
                        >
                          <Check className="w-4 h-4" />
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-colors font-medium"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleEdit}
                        className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white hover:from-pink-600 hover:to-purple-600 transition-all duration-200 font-medium"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                )}
              </div>

              {loadingSave ? (
                <div className="h-full flex items-center justify-center">
                  <Loading size="md" />
                </div>
              ) : (
                <>
                  {/* Tab Navigation */}
                  <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700/50">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex cursor-pointer items-center gap-2 px-4 py-3 rounded-t-lg transition-all duration-200 font-medium ${
                          activeTab === tab.id
                            ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-400 border-b-2 border-pink-400"
                            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="space-y-6">{renderTabContent()}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardInfos;
