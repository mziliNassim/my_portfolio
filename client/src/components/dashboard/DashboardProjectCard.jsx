import React from "react";
import { Link } from "react-router-dom";

const DashboardProjectCard = ({ project, showActions, onDelete, editLink }) => {
  return (
    <div
      key={project._id}
      className="relative bg-slate-800/30 border border-slate-700/50 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <img
        src={project.poster}
        alt={project.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
        <p className="text-slate-400 text-sm line-clamp-3 mb-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tools.slice(0, 4).map((tool, index) => (
            <span
              key={index}
              className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded"
            >
              {tool}
            </span>
          ))}
          {project.tools.length > 4 && (
            <span className="text-xs text-slate-400">
              +{project.tools.length - 4}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Link
            to={`/admin/dashboard/edit-project/${project._id}`}
            className="text-sm text-blue-400 hover:text-blue-500"
          >
            ✏️ Edit
          </Link>

          <button
            onClick={onDelete}
            className="text-sm cursor-pointer text-red-400 hover:text-red-500"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardProjectCard;
