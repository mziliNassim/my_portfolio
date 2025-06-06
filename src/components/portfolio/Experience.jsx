import React, { useState, useEffect, useRef } from "react";
import { experiences } from "../../utils/data/experience";

import { BsPersonWorkspace } from "react-icons/bs";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCode,
  FaExternalLinkAlt,
  FaRocket,
} from "react-icons/fa";

function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
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

  const getIcon = (index) => {
    const icons = [FaRocket, FaCode, FaBuilding];
    return icons[index % icons.length];
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div
          className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-violet-500/5 to-cyan-500/5 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "25s" }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-ping"
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
                  Experience
                </span>
              </div>
            </div>
            <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-violet-500 rounded-full" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional{" "}
            <span className="bg-gradient-to-r from-[#16f2b3] to-cyan-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A timeline of my professional growth and the amazing projects I've
            been part of
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-pink-500 via-violet-500 to-cyan-500 hidden lg:block" />

          {/* Timeline Dots */}
          {experiences.map((_, index) => (
            <div
              key={`dot-${index}`}
              className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full border-4 border-[#0d1224] hidden lg:block z-10"
              style={{ top: `${index * 400 + 100}px` }}
            />
          ))}

          {/* Experience Cards */}
          <div className="space-y-12 lg:space-y-24">
            {experiences.map((experience, index) => {
              const IconComponent = getIcon(index);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={experience.id}
                  className={`relative flex items-center ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } flex-col lg:gap-16`}
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  {/* Card */}
                  <div
                    className={`w-full lg:w-1/2 transform transition-all duration-1000 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                    style={{ transitionDelay: `${index * 0.2}s` }}
                    onMouseEnter={() => setActiveCard(experience.id)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <div className="group relative">
                      {/* Glow Effect */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

                      {/* Card Content */}
                      <div className="relative bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
                        {/* Card Header */}
                        <div className="p-6 border-b border-gray-700/30">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="p-3 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-lg border border-pink-500/30">
                                <IconComponent className="w-6 h-6 text-pink-400" />
                              </div>
                              <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-bold text-white mb-1">
                                  {experience.role}
                                </h3>
                                <div className="flex items-center space-x-2 text-gray-400">
                                  <FaBuilding className="w-4 h-4" />
                                  <a
                                    href={experience.company.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-pink-300 flex items-center gap-1 transition-colors"
                                  >
                                    <span>{experience.company.name}</span>
                                    <FaExternalLinkAlt className="text-sm" />
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div className="text-right space-y-2">
                              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#16f2b3]/20 to-cyan-400/20 px-3 py-1 rounded-full border border-[#16f2b3]/30">
                                <FaCalendarAlt className="w-3 h-3 text-[#16f2b3]" />
                                <span className="text-[#16f2b3] text-sm font-medium">
                                  {experience.duration}
                                </span>
                              </div>
                              <div>
                                <span className="inline-block bg-violet-500/20 text-violet-400 px-2 py-1 rounded text-xs border border-violet-500/30">
                                  {experience.timeType}
                                </span>
                                {experience.type && (
                                  <span className="ml-2 inline-block bg-pink-500/20 text-pink-400 px-2 py-1 rounded text-xs border border-pink-500/30">
                                    {experience.type}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6">
                          <p className="text-gray-300 mb-6 leading-relaxed">
                            {experience.description}
                          </p>

                          {/* Technologies */}
                          <div className="space-y-3">
                            <h4 className="text-white font-semibold flex items-center space-x-2">
                              <FaCode className="w-4 h-4 text-cyan-400" />
                              <span>Technologies Used</span>
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {experience.technologies.map(
                                (tech, techIndex) => (
                                  <span
                                    key={tech}
                                    className="px-3 py-1 bg-gradient-to-r from-gray-700/50 to-gray-600/50 rounded-full text-sm text-gray-300 border border-gray-600/50 hover:border-pink-500/50 hover:text-pink-300 transition-all duration-300 cursor-default"
                                    style={{
                                      animationDelay: `${techIndex * 0.1}s`,
                                    }}
                                  >
                                    {tech}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Hover Animation Line */}
                        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-pink-500 to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </div>
                    </div>
                  </div>

                  {/* Spacer for mobile */}
                  <div className="lg:w-1/2 lg:h-px" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gradient-to-r from-pink-500/10 to-violet-600/10 rounded-full border border-pink-500/20">
            <BsPersonWorkspace className="w-6 h-6 text-pink-400" />
            <span className="text-gray-300 font-medium">
              Ready for new challenges and opportunities
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
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
}

export default Experience;
