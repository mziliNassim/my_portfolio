import React, { useState, useEffect, useRef } from "react";
import { Rocket, Search, X } from "lucide-react";

import ProjectCard from "./ProjectCard";

import { scrollToTop } from "../../utils/helpers";

const Projects = ({ page = false, projects }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [showMobileFilters, setShowMobileFilters] = useState(true);
  const sectionRef = useRef(null);

  // Get unique roles for filters
  const uniqueRoles = [
    "All",
    ...new Set(projects?.map((project) => project.role)),
  ];

  // Filter projects based on active filter and search query
  useEffect(() => {
    let filtered = projects;

    // Filter by role
    if (activeFilter !== "All") {
      filtered = filtered.filter((project) => project.role === activeFilter);
    }

    // Filter by search query (name or tools)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.tools.some((tool) => tool.toLowerCase().includes(query))
      );
    }

    setFilteredProjects(filtered);
  }, [activeFilter, searchQuery]);

  useEffect(() => {
    if (page) scrollToTop();

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

  const clearSearch = () => {
    setSearchQuery("");
  };

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

        {/* Filters and Search Section */}
        <div
          className={`mb-12 transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Mobile Filter Toggle */}
          {/* <div className="lg:hidden mb-6">
            <button
              onClick={toggleMobileFilters}
              className="flex items-center cursor-pointer mx-auto w-fit space-x-2 px-4 py-3 bg-gradient-to-r from-pink-500/10 to-violet-600/10 rounded-xl border border-pink-500/30 text-white hover:border-pink-500/50 transition-all duration-300 justify-center"
            >
              <Filter className="w-4 h-4" />
              <span>Filters & Search</span>
            </button>
          </div> */}

          {/* Filters Container */}
          <div className="lg:flex lg:items-center lg:justify-between lg:space-y-0 space-y-6 block">
            {/* Left Side - Role Filters */}
            <div className="flex items-center justify-center lg:justify-start flex-wrap gap-3">
              {uniqueRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveFilter(role)}
                  className={`px-4 cursor-pointer py-2 rounded-full border transition-all duration-300 hover:scale-105 ${
                    activeFilter === role
                      ? "bg-gradient-to-r from-pink-500 to-violet-600 border-pink-500/50 text-white shadow-lg shadow-pink-500/25"
                      : "bg-gradient-to-r from-gray-700/30 to-gray-600/30 border-gray-600/50 text-gray-300 hover:border-pink-500/50 hover:text-pink-300"
                  }`}
                >
                  <span className="text-sm font-medium">{role}</span>
                </button>
              ))}
            </div>

            {/* Right Side - Search Bar */}
            <div className="relative max-w-md w-full lg:w-auto mx-auto lg:mr-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name or technology..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-gradient-to-r from-[#0d1224]/50 to-[#1a1a2e]/50 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute cursor-pointer inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-pink-400 transition-colors duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Results Counter */}
          <div className="mt-6 text-center">
            <span className="text-gray-400 text-sm">
              Showing{" "}
              <span className="text-pink-400 font-semibold">
                {page
                  ? filteredProjects?.length
                  : filteredProjects?.length > 2
                  ? 2
                  : filteredProjects?.length}
              </span>{" "}
              of{" "}
              <span className="text-violet-400 font-semibold">
                {projects?.length}
              </span>{" "}
              projects
            </span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2  gap-8">
          {page
            ? filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id || index}
                  project={project}
                  index={index}
                  isVisible={isVisible}
                />
              ))
            : filteredProjects
                ?.slice(0, 2)
                .map((project, index) => (
                  <ProjectCard
                    key={project.id || index}
                    project={project}
                    index={index}
                    isVisible={isVisible}
                  />
                ))}
        </div>

        {/* No Results Message */}
        {filteredProjects?.length === 0 && (
          <div
            className={`text-center py-16 transform transition-all duration-1000 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-full blur-xl" />
              <div className="relative p-8 bg-gradient-to-br from-[#0d1224]/80 to-[#1a1a2e]/80 backdrop-blur-sm rounded-2xl border border-gray-700/50">
                <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Projects Found
                </h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => {
                    setActiveFilter("All");
                    setSearchQuery("");
                  }}
                  className="px-6 cursor-pointer py-2 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-full border border-pink-500/30 text-pink-400 hover:border-pink-500/50 transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View More Button - Link to /projects */}
        {!page && filteredProjects?.length > 2 && (
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
              <Rocket className="w-5 h-5 text-pink-400 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 to-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>
        )}
      </div>

      <style>{`
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
