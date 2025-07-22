import React from 'react'

const ExperienceDetails = ({
  experienceData,
  handleTechnologyRemove,
  handleTechnologyAdd,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Technologies & Skills
        </label>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Add a technology (press Enter)"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleTechnologyAdd(e.target.value);
                e.target.value = "";
              }
            }}
          />
          {experienceData.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {experienceData.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm flex items-center gap-2"
                >
                  {tech}
                  <button
                    onClick={() => handleTechnologyRemove(tech)}
                    className="hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails
