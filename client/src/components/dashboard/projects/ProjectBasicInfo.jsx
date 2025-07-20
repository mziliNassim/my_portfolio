import { Code, Edit, Wrench, User } from "lucide-react";
import { Plus, X, ExternalLink, Github } from "lucide-react";

const ProjectBasicInfo = ({
  projectData,
  handleChange,
  newTool,
  setNewTool,
  addTool,
  removeTool,
}) => (
  <div className="space-y-6">
    {/* Project Name */}
    <div className="group">
      <label className=" text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
        <Code className="w-4 h-4" />
        <span>Project Name</span>
      </label>
      <div className="relative">
        <input
          type="text"
          name="name"
          value={projectData.name}
          onChange={handleChange}
          className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400"
          placeholder="Enter your amazing project name..."
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>

    {/* Description */}
    <div className="group">
      <label className=" text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
        <Edit className="w-4 h-4" />
        <span>Description</span>
      </label>
      <div className="relative">
        <textarea
          name="description"
          value={projectData.description}
          onChange={handleChange}
          rows="4"
          className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400 resize-none"
          placeholder="Tell us about your project's vision and goals..."
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </div>

    {/* Tools Section */}
    <div className="group">
      <label className=" text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
        <Wrench className="w-4 h-4" />
        <span>Tech Stack</span>
      </label>
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={newTool}
            onChange={(e) => setNewTool(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTool()}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400"
            placeholder="e.g., React, Node.js, MongoDB..."
          />
        </div>
        <button
          onClick={addTool}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-3">
        {projectData.tools.map((tool, index) => (
          <div
            key={index}
            className="group/tag flex items-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-500/30 text-white px-4 py-2 rounded-full hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
          >
            <span className="text-sm font-medium">{tool}</span>
            <button
              onClick={() => removeTool(index)}
              className="w-5 h-5 flex items-center justify-center bg-red-500/20 hover:bg-red-500/40 rounded-full transition-all duration-200"
            >
              <X className="w-3 h-3 text-red-400" />
            </button>
          </div>
        ))}
      </div>
    </div>

    {/* Role and Links Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="group">
        <label className=" text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span>Your Role</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="role"
            value={projectData.role}
            onChange={handleChange}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400"
            placeholder="e.g., Full Stack Developer"
          />
        </div>
      </div>
      <div className="group">
        <label className=" text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
          <Github className="w-4 h-4" />
          <span>GitHub Repo</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="code"
            value={projectData.code}
            onChange={handleChange}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400"
            placeholder="https://github.com/..."
          />
        </div>
      </div>
      <div className="group">
        <label className=" text-sm font-medium text-slate-300 mb-2 flex items-center space-x-2">
          <ExternalLink className="w-4 h-4" />
          <span>Live Demo</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="demo"
            value={projectData.demo}
            onChange={handleChange}
            className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-slate-400"
            placeholder="https://your-demo.com"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ProjectBasicInfo;
