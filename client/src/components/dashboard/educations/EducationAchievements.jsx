import { Award, Plus, X } from "lucide-react";
import React from "react";

const EducationAchievements = ({
  newAchievement,
  setNewAchievement,
  addAchievements,
  removeAchievement,
  educationData,
}) => {
  return (
    <div className="space-y-6">
      {/* Add Achievement */}
      <div>
        <label className="block text-sm font-semibold text-slate-200 mb-2">
          Add Skills & Achievements
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            placeholder="e.g., JavaScript, Python, Dean's List..."
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            onKeyPress={(e) => e.key === "Enter" && addAchievements(e)}
          />
          <button
            onClick={addAchievements}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Achievements List */}
      {educationData.achievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Current Achievements ({educationData.achievements.length})
          </h3>
          <div className="space-y-3">
            {educationData.achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl"
              >
                <span className="text-slate-200 flex-1">{achievement}</span>
                <button
                  onClick={() => removeAchievement(index)}
                  className="ml-3 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {educationData.achievements.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">No achievements added yet</p>
          <p className="text-slate-500 text-sm">
            Add your skills, achievements, and notable accomplishments
          </p>
        </div>
      )}
    </div>
  );
};

export default EducationAchievements;
