import React from "react";
import { Calendar } from "lucide-react";

const ExperienceTimeline = ({
  experienceData,
  handleInputChange,
  generateDuration,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Start Date *
          </label>
          <input
            type="date"
            value={experienceData.startDate}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={experienceData.endDate}
            onChange={(e) => handleInputChange("endDate", e.target.value)}
            disabled={experienceData.current}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          />
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="current"
          checked={experienceData.current}
          onChange={(e) => handleInputChange("current", e.target.checked)}
          className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor="current" className="text-slate-300">
          I currently work here
        </label>
      </div>
      {experienceData.startDate && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h3 className="text-white font-medium mb-2">Duration Preview</h3>
          <div className="flex items-center space-x-2 text-slate-300">
            <Calendar className="w-4 h-4" />
            <span>
              {generateDuration(
                experienceData.startDate,
                experienceData.endDate,
                experienceData.current
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceTimeline;
