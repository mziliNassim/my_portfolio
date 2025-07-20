import { Clock, Sparkles } from "lucide-react";

const ProjectSettings = ({ projectData, handleChange }) => (
  <div className="space-y-6">
    <p className="text-slate-400">Configure project settings and status</p>

    {/* Development Status */}
    <div className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="inDevelopment"
          name="inDevelopment"
          checked={projectData.inDevelopment}
          onChange={handleChange}
          className="w-5 h-5 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label
          htmlFor="inDevelopment"
          className="text-slate-300 font-medium flex items-center space-x-2"
        >
          <Clock className="w-5 h-5" />
          <span>Project in Development</span>
        </label>
      </div>
      {projectData.inDevelopment && (
        <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">Work in Progress</span>
        </div>
      )}
    </div>
  </div>
);

export default ProjectSettings;
