import React, { useState, useEffect, useRef } from "react";
import {
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
  FaRocket,
  FaEye,
  FaTools,
  FaUser,
  FaUsers,
  FaLinkedin,
  FaGlobe,
  FaEnvelope,
  FaTwitter,
  FaInstagram,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProjectCard = ({
  project,
  index,
  isVisible = true,
  desc = true,
  onDeleteProject,
}) => {
  const { admin } = useSelector((state) => state.admin);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoveredCollab, setHoveredCollab] = useState(null);

  // Filter out empty collaborators
  const validCollabs =
    project.collabWith?.filter(
      (collab) => collab && Object.keys(collab).length > 0 && collab.name
    ) || [];

  return (
    <div
      className={`group relative transform transition-all duration-1000 h-full flex flex-col ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 0.2}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

      {/* Card Content */}
      <div className="relative bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 group-hover:border-pink-500/50 transition-all duration-500 h-full flex flex-col">
        {project?.inDevelopment && (
          <div className="absolute top-4 left-4 z-30">
            <div className="relative">
              {/* Animated glow background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-md opacity-60 animate-pulse" />
              {/* Badge content */}
              <div className="relative flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1.5 rounded-full border border-orange-400/50 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white text-xs font-bold tracking-wide">
                  IN DEVELOPMENT
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Project Image */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex-shrink-0">
          {/* Placeholder gradient while image loads */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-violet-500/20 to-cyan-500/20 animate-pulse" />

          {/* Project Image */}
          <img
            src={
              project.gif && !imageError
                ? project.gif
                : project.poster || project.poster
            }
            alt={project.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1224]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Floating Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white hover:scale-110 transition-transform duration-300 shadow-lg"
              >
                <FaExternalLinkAlt className="w-4 h-4" />
              </a>
            )}
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full text-white hover:scale-110 transition-transform duration-300 shadow-lg"
              >
                <FaGithub className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Card Body - Flex grow to fill remaining space */}
        <div className="p-6 space-y-4 flex-grow flex flex-col">
          {/* Project Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors duration-300">
                {project.name}
                {/* Additional development indicator in title for first project */}
                {desc && project?.inDevelopment && (
                  <div className="relative w-fit flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1.5 rounded-full border border-orange-400/50 shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-xs font-bold tracking-wide">
                      In Development
                    </span>
                  </div>
                )}
              </h3>

              {/* Role Badge */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-3 py-1 rounded-full border border-cyan-500/30">
                  <FaUser className="w-3 h-3 text-cyan-400" />
                  <span className="text-cyan-400 text-sm font-medium">
                    {project.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-lg border border-pink-500/30">
              <FaRocket className="w-5 h-5 text-pink-400" />
            </div>
          </div>

          {/* Description */}
          {desc && (
            <p className="text-gray-300 leading-relaxed text-sm line-clamp-4 flex-grow">
              {project.description}
            </p>
          )}

          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold flex items-center space-x-2 group-hover:text-pink-300 transition-colors duration-300">
              <FaTools className="w-4 h-4 text-violet-400" />
              <span>Technologies</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.slice(0, 6).map((tech, techIndex) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-md text-xs text-gray-300 border border-gray-600/50 hover:border-pink-500/50 hover:text-pink-300 transition-all duration-300 cursor-default"
                  style={{
                    animationDelay: `${techIndex * 0.1}s`,
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.tools.length > 6 && (
                <span className="px-2 py-1 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-md text-xs text-pink-300 border border-pink-500/30">
                  +{project.tools.length - 6} more
                </span>
              )}
            </div>
          </div>

          {/* Collabs Section */}
          {validCollabs.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-white font-semibold flex items-center space-x-2 group-hover:text-pink-300 transition-colors duration-300">
                <FaUsers className="w-4 h-4 text-emerald-400" />
                <span>Collaborators</span>
              </h4>
              <div className="flex flex-wrap gap-3">
                {validCollabs.map((collab, collabIndex) => (
                  <div
                    key={collabIndex}
                    className="relative group/collab"
                    onMouseEnter={() => setHoveredCollab(collabIndex)}
                    onMouseLeave={() => setHoveredCollab(null)}
                  >
                    {/* Collab Button */}
                    <button className="flex items-center cursor-pointer space-x-2 px-3 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105 group-hover/collab:shadow-lg group-hover/collab:shadow-emerald-500/25">
                      <div className="relative">
                        <img
                          src={collab.profile || "/api/placeholder/32/32"}
                          alt={collab.name}
                          className="w-6 h-6 rounded-full object-cover border border-emerald-400/50"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        {/* Fallback Avatar */}
                        <div className="hidden w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 items-center justify-center">
                          <FaUser className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <span className="text-emerald-400 text-sm font-medium">
                        {collab.name}
                      </span>
                    </button>

                    {/* Hover Card with Links */}
                    {hoveredCollab === collabIndex && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 w-72 pointer-events-none opacity-0 group-hover/collab:opacity-100 group-hover/collab:pointer-events-auto transition-all duration-300">
                        <div className="relative bg-gradient-to-br from-[#0d1224]/95 to-[#1a1a2e]/95 backdrop-blur-sm rounded-xl border border-emerald-500/30 shadow-xl shadow-emerald-500/20 p-4">
                          {/* Arrow */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-emerald-500/30"></div>

                          {/* Profile Header */}
                          <div className="flex items-center space-x-3 mb-3">
                            <img
                              src={collab.profile || "/api/placeholder/40/40"}
                              alt={collab.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400/50"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                            {/* Fallback Avatar */}
                            <div className="hidden w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 items-center justify-center border-2 border-emerald-400/50">
                              <FaUser className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h5 className="text-white font-semibold text-sm">
                                {collab.name}
                              </h5>
                              <p className="text-emerald-400 text-xs">
                                Collaborator
                              </p>
                            </div>
                          </div>

                          {/* Links Grid */}
                          <div className="grid grid-cols-3 gap-2">
                            {collab.email && (
                              <a
                                href={`mailto:${collab.email}`}
                                className="flex items-center justify-center p-2 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg hover:from-red-500/20 hover:to-red-600/20 hover:border-red-500/30 border border-gray-600/50 transition-all duration-300 group"
                                title="Email"
                              >
                                <FaEnvelope className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                              </a>
                            )}
                            {collab.linkedIn && (
                              <a
                                href={collab.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-2 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg hover:from-blue-500/20 hover:to-blue-600/20 hover:border-blue-500/30 border border-gray-600/50 transition-all duration-300 group"
                                title="LinkedIn"
                              >
                                <FaLinkedin className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                              </a>
                            )}
                            {collab.github && (
                              <a
                                href={collab.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-2 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg hover:from-violet-500/20 hover:to-violet-600/20 hover:border-violet-500/30 border border-gray-600/50 transition-all duration-300 group"
                                title="GitHub"
                              >
                                <FaGithub className="w-4 h-4 text-gray-400 group-hover:text-violet-400" />
                              </a>
                            )}
                            {collab.Website && (
                              <a
                                href={collab.Website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-2 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg hover:from-green-500/20 hover:to-green-600/20 hover:border-green-500/30 border border-gray-600/50 transition-all duration-300 group"
                                title="Website"
                              >
                                <FaGlobe className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
                              </a>
                            )}
                            {collab.instagram && (
                              <a
                                href={collab.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-2 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg hover:from-pink-500/20 hover:to-pink-600/20 hover:border-pink-500/30 border border-gray-600/50 transition-all duration-300 group"
                                title="Instagram"
                              >
                                <FaInstagram className="w-4 h-4 text-gray-400 group-hover:text-pink-400" />
                              </a>
                            )}
                            {collab.twitter && (
                              <a
                                href={collab.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-2 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-lg hover:from-sky-500/20 hover:to-sky-600/20 hover:border-sky-500/30 border border-gray-600/50 transition-all duration-300 group"
                                title="Twitter"
                              >
                                <FaTwitter className="w-4 h-4 text-gray-400 group-hover:text-sky-400" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Links - Positioned at bottom */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700/30 mt-auto">
            <div className="flex space-x-3">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-pink-400 hover:text-pink-300 transition-colors duration-300 text-sm font-medium"
                >
                  <FaEye className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
              {project.code && (
                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-violet-400 hover:text-violet-300 transition-colors duration-300 text-sm font-medium"
                >
                  <FaCode className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* CRUD buttons (update and delete) */}
          {admin && (
            <div className="flex space-x-3  pt-4 border-t border-gray-700/30">
              <Link
                to={`/admin/dashboard/edit-project/${project._id}`}
                className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-indigo-600 rounded-md hover:from-violet-600 hover:to-indigo-700 transition-colors"
              >
                <FaEdit className="w-4 h-4 mr-1" />
                Edit
              </Link>

              <button
                onClick={() => onDeleteProject(project._id)}
                className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-md hover:from-red-600 hover:to-pink-700 transition-colors"
              >
                <FaTrash className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Hover Animation Line */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-pink-500 to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </div>
  );
};

export default ProjectCard;
