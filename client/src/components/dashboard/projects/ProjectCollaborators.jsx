import { Plus, Trash2 } from "lucide-react";

const ProjectCollaborators = ({
  projectData,
  handleCollabChange,
  addCollaborator,
  removeCollaborator,
}) => {
  console.log("🚀 ~ projectData:", projectData.collabWith);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-slate-400">Add team members and collaborators</p>
        <button
          onClick={addCollaborator}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-4 h-4" />
          <span>Add Collaborator</span>
        </button>
      </div>

      {projectData.collabWith.length !== 0 &&
        projectData.collabWith.map((collab, idx) => (
          <div
            key={idx}
            className="group/collab relative bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
          >
            <div className="absolute top-4 right-4">
              <button
                onClick={() => removeCollaborator(idx)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-12">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Name
                </label>
                <input
                  placeholder="Full Name"
                  value={collab?.name}
                  onChange={(e) =>
                    handleCollabChange(idx, "name", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={collab?.email}
                  onChange={(e) =>
                    handleCollabChange(idx, "email", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+1 (123) 456-7890"
                  value={collab?.phone}
                  onChange={(e) =>
                    handleCollabChange(idx, "phone", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Address
                </label>
                <input
                  placeholder="123 Main St, City, Country"
                  value={collab?.address}
                  onChange={(e) =>
                    handleCollabChange(idx, "address", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  LinkedIn
                </label>
                <input
                  placeholder="https://linkedin.com/in/username"
                  value={collab?.linkedIn}
                  onChange={(e) =>
                    handleCollabChange(idx, "linkedIn", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  GitHub
                </label>
                <input
                  placeholder="https://github.com/username"
                  value={collab?.github}
                  onChange={(e) =>
                    handleCollabChange(idx, "github", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Website
                </label>
                <input
                  placeholder="https://example.com"
                  value={collab?.website}
                  onChange={(e) =>
                    handleCollabChange(idx, "website", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Twitter
                </label>
                <input
                  placeholder="https://twitter.com/username"
                  value={collab?.twitter}
                  onChange={(e) =>
                    handleCollabChange(idx, "twitter", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Facebook
                </label>
                <input
                  placeholder="https://facebook.com/username"
                  value={collab?.facebook}
                  onChange={(e) =>
                    handleCollabChange(idx, "facebook", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  Instagram
                </label>
                <input
                  placeholder="https://instagram.com/username"
                  value={collab?.instagram}
                  onChange={(e) =>
                    handleCollabChange(idx, "instagram", e.target.value)
                  }
                  className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder-slate-400"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProjectCollaborators;
