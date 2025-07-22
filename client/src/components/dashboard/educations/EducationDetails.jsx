import React from "react";

const EducationDetails = ({ educationData, handleChange }) => {
  return (
    <div className="space-y-6">
      {/* Type and Status Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Type
          </label>
          <select
            name="type"
            value={educationData.type}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="Degree" className="bg-slate-800">
              Degree
            </option>
            <option value="Certification" className="bg-slate-800">
              Certification
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Status
          </label>
          <select
            name="status"
            value={educationData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="Completed" className="bg-slate-800">
              Completed
            </option>
            <option value="Progress" className="bg-slate-800">
              In Progress
            </option>
            <option value="Certified" className="bg-slate-800">
              Certified
            </option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-slate-200 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={educationData.description}
          onChange={handleChange}
          rows={6}
          placeholder="Describe your educational experience, key courses, projects, or any relevant details..."
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
        />
      </div>
    </div>
  );
};

export default EducationDetails;
