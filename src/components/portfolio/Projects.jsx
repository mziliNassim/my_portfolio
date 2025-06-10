import React, { useState, useEffect, useRef } from "react";
import { projects } from "../../utils/data/projects";
import {
  FaCode,
  FaExternalLinkAlt,
  FaGithub,
  FaRocket,
  FaEye,
  FaStar,
  FaTools,
  FaUser,
} from "react-icons/fa";

// ProjectCard Component
const ProjectCard = ({ project, index, isVisible }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [hovered, setHovered] = useState(false);

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
      <div className="relative bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden group-hover:border-pink-500/50 transition-all duration-500 h-full flex flex-col">
        {/* Project Image */}
        <div className="relative h-64 md:h-80 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex-shrink-0">
          {/* Placeholder gradient while image loads */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-violet-500/20 to-cyan-500/20 animate-pulse" />

          {/* Project Image */}
          <img
            src={
              project.gif && !imageError
                ? project.gif
                : project.poster || "/api/placeholder/600/400"
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

          {/* Project Stats */}
          <div className="absolute bottom-4 left-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <FaStar className="w-3 h-3 text-yellow-400" />
              <span className="text-white text-xs font-medium">Featured</span>
            </div>
          </div>
        </div>

        {/* Card Body - Flex grow to fill remaining space */}
        <div className="p-6 space-y-4 flex-grow flex flex-col">
          {/* Project Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors duration-300">
                {project.name}
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
          <p className="text-gray-300 leading-relaxed text-sm line-clamp-4 flex-grow">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold flex items-center space-x-2">
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
        </div>

        {/* Hover Animation Line */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-pink-500 to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </div>
  );
};

// Main Projects Component
const Projects = ({ page = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filters = ["All", "Full Stack", "Front end", "Back end"];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    return project.role.includes(activeFilter);
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54] overflow-hidden pt-20 pb-8 lg:py-16 lg:pt-28"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-pink-500/5 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "20s" }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-pink-400/20 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-pink-500 rounded-full" />
            <div className="relative mx-6">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-600 rounded-lg blur-md opacity-30" />
              <div className="relative bg-gradient-to-r from-[#0d1224] to-[#1a1a2e] border border-pink-500/30 rounded-lg px-8 py-3">
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
                  Projects
                </span>
              </div>
            </div>
            <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-violet-500 rounded-full" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured{" "}
            <span className="bg-gradient-to-r from-[#16f2b3] to-cyan-400 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of projects that showcase my skills and creativity
          </p>
        </div>

        {/* Filter Buttons */}
        {/* {page && (
          <div
            className={`flex flex-wrap justify-center gap-3 mb-12 transform transition-all duration-1000 delay-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 cursor-pointer py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg"
                    : "bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:border-pink-500/50 hover:text-pink-300"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )} */}

        {/* Projects Grid - Show only 2 projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {page
            ? filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  isVisible={isVisible}
                />
              ))
            : filteredProjects
                .slice(0, 2)
                .map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
        </div>

        {/* View More Button - Link to /projects */}
        {!page && (
          <div
            className={`text-center mt-16 transform transition-all duration-1000 delay-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <a
              href="/projects"
              className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-pink-500/10 to-violet-600/10 rounded-full border border-pink-500/30 hover:border-pink-500/50 transition-all duration-300 hover:scale-105"
            >
              <span className="text-white font-medium">View All Projects</span>
              <FaRocket className="w-5 h-5 text-pink-400 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
};

export default Projects;
