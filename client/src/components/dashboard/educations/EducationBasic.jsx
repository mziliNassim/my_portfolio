import React from "react";

const EducationBasic = ({ educationData, handleChange }) => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-slate-200 mb-2">
          Title / Degree Name *
        </label>
        <input
          type="text"
          name="title"
          value={educationData.title}
          onChange={handleChange}
          placeholder="e.g., Bachelor of Computer Science"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Institution */}
      <div>
        <label className="block text-sm font-semibold text-slate-200 mb-2">
          Institution / School *
        </label>
        <input
          type="text"
          name="institution"
          value={educationData.institution}
          onChange={handleChange}
          placeholder="e.g., Harvard University"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* Duration and City Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Duration *
          </label>
          <input
            type="text"
            name="duration"
            value={educationData.duration}
            onChange={handleChange}
            placeholder="e.g., 2020 - 2024"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={educationData.city}
            onChange={handleChange}
            placeholder="e.g., New York"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
};

export default EducationBasic;
