import { Upload, Link as LinkIcon, X } from "lucide-react";
import React from "react";

const ExperienceGeneral = ({
  experienceData,
  handleInputChange,
  setLogoUploadType,
  handleLogoRemove,
  logoUploadType,
  logoCompressing,
  handleLogoUpload,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Role *
          </label>
          <input
            type="text"
            value={experienceData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. Senior Full Stack Developer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            value={experienceData.company.name}
            onChange={(e) => handleInputChange("company.name", e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. Google"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Company Website/LinkedIn
          </label>
          <input
            type="url"
            value={experienceData.company.link}
            onChange={(e) => handleInputChange("company.link", e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://www.linkedin.com/company/example"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Experience Type
          </label>
          <select
            value={experienceData.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
            <option value="Stage PFE">Stage PFE</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Time Type
          </label>
          <select
            value={experienceData.timeType}
            onChange={(e) => handleInputChange("timeType", e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Company Logo
          </label>

          {/* Logo Upload Type Selector */}
          <div className="flex space-x-4 mb-4">
            <button
              type="button"
              onClick={() => setLogoUploadType("upload")}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center space-x-2 ${
                logoUploadType === "upload"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  : "bg-white/10 text-slate-400 border border-white/20 hover:bg-white/20"
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload Image</span>
            </button>
            <button
              type="button"
              onClick={() => setLogoUploadType("link")}
              className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center space-x-2 ${
                logoUploadType === "link"
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  : "bg-white/10 text-slate-400 border border-white/20 hover:bg-white/20"
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              <span>Use Link</span>
            </button>
          </div>

          {/* Logo Upload/Link Input */}
          {logoUploadType === "upload" ? (
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={logoCompressing}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500/20 file:text-blue-300 hover:file:bg-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {logoCompressing && (
                <div className="flex items-center space-x-2 text-blue-300 text-sm">
                  <div className="w-4 h-4 border-2 border-blue-300/30 border-t-blue-300 rounded-full animate-spin"></div>
                  <span>Compressing image...</span>
                </div>
              )}
            </div>
          ) : (
            <input
              type="url"
              value={experienceData.logo}
              onChange={(e) => handleInputChange("logo", e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/logo.png or /companies/example.png"
            />
          )}

          {/* Logo Preview */}
          {experienceData.logo && (
            <div className="mt-3 p-3 bg-white/5 border border-white/10 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Logo Preview:</span>
                <button
                  type="button"
                  onClick={handleLogoRemove}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={experienceData.logo}
                  alt="Company logo preview"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextElementSibling.style.display = "block";
                  }}
                />
                <div className="hidden text-slate-400 text-xs text-center">
                  Logo not found
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Description *
        </label>
        <textarea
          rows={6}
          value={experienceData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Describe your role, responsibilities, and key contributions..."
        />
      </div>
    </div>
  );
};

export default ExperienceGeneral;
