import React, { useState, useEffect, useRef } from "react";

import {
  FaCode,
  FaDatabase,
  FaServer,
  FaMobile,
  FaCloud,
  FaPalette,
} from "react-icons/fa";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiNextdotjs,
  SiBootstrap,
  SiFigma,
  SiVite,
  SiRedux,
  SiPython,
  SiPhp,
  SiMysql,
  SiMarkdown,
  SiCanva,
  SiTailwindcss,
} from "react-icons/si";
import { TfiMicrosoftAlt } from "react-icons/tfi";

// Mock skills data - replace with your actual skillsData and skillsImage
const skillsData = [
  "React",
  "Node JS",
  "TailwindCSS",
  "Docker",
  "Markdown",
  "MongoDB",
  "Microsoft Office",
  "Bootstrap",
  "Python",
  "PHP",
  "Git",
  "Figma",
  "Canva",
  "ViteJS",
  "MySQL",
  "Redux",
  "HTML",
  "CSS",
  "JavaScript",
];

const skillCategories = [
  {
    name: "Frontend",
    icon: FaCode,
    color: "from-pink-500 to-rose-500",
    skills: [
      "React",
      "TailwindCSS",
      "Bootstrap",
      "Figma",
      "ViteJS",
      "Redux",
      "HTML",
      "CSS",
      "JS",
    ],
  },
  {
    name: "Backend",
    icon: FaServer,
    color: "from-violet-500 to-purple-500",
    skills: ["Node JS", "Express", "Python", "PHP"],
  },
  {
    name: "Database",
    icon: FaDatabase,
    color: "from-cyan-500 to-blue-500",
    skills: ["MongoDB", "MySQL"],
  },
  {
    name: "Tools",
    icon: FaCloud,
    color: "from-emerald-500 to-teal-500",
    skills: ["Docker", "Markdown", "Microsoft Office", "Git", "Canva"],
  },
];

// Skill icons mapping
const skillIcons = {
  React: SiReact,
  TailwindCSS: SiTailwindcss,
  HTML: SiHtml5,
  CSS: SiCss3,
  JavaScript: SiJavascript,
  Bootstrap: SiBootstrap,
  Figma: SiFigma,
  ViteJS: SiVite,
  Redux: SiRedux,
  // +++++++++++++
  "Node JS": SiNodedotjs,
  Express: SiExpress,
  Python: SiPython,
  PHP: SiPhp,
  // +++++++++++++
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  // +++++++++++++
  Markdown: SiMarkdown,
  "Microsoft Office": TfiMicrosoftAlt,
  Canva: SiCanva,
  Git: FaCode,
  Docker: FaCloud,
};

// Skill colors
const skillColors = {
  React: "text-cyan-400",
  TailwindCSS: "text-cyan-300",
  HTML: "text-orange-500",
  CSS: "text-blue-500",
  JavaScript: "text-yellow-500",
  Bootstrap: "text-purple-500", // Commonly associated with Bootstrap's default blue/purple
  Figma: "text-pink-500", // Figma uses pink in its branding
  ViteJS: "text-green-400", // Often associated with fast, modern tooling
  Redux: "text-purple-600", // Redux is often shown with a purple theme
  // =========
  "Node JS": "text-green-500",
  Express: "text-gray-400",
  Python: "text-blue-600", // Python's official color
  PHP: "text-purple-700", // PHP has a dark purple logo
  // =========
  MongoDB: "text-green-400",
  MySQL: "text-blue-600", // MySQL uses blue as primary brand color
  // =========
  Git: "text-orange-400",
  Docker: "text-blue-400",
  Markdown: "text-gray-600", // Neutral gray for Markdown
  "Microsoft Office": "text-blue-700", // Microsoft blue
  Canva: "text-green-500", // Canva uses green in its branding
};

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);

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

  // Auto-rotate categories
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => (prev + 1) % skillCategories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const MarqueeSkills = ({ direction = "left", speed = 50 }) => (
    <div
      className="flex animate-marquee"
      style={{ animationDuration: `${(40 / speed) * skillsData.length}s` }}
    >
      {skillsData.concat(skillsData).map((skill, index) => {
        const IconComponent = skillIcons[skill] || FaCode;
        return (
          <div
            key={`${skill}-${index}`}
            className="flex-shrink-0 mx-4 group cursor-pointer"
            onMouseEnter={() => setHoveredSkill(skill)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 via-violet-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Skill Card */}
              <div className="relative w-32 h-32 bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 flex flex-col items-center justify-center p-4 group-hover:scale-110 group-hover:border-pink-500/50 transition-all duration-300">
                <div className="mb-3 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-600 rounded-lg blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  <IconComponent
                    className={`w-8 h-8 ${skillColors[skill]} relative z-10 group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
                <span className="text-white text-sm font-medium text-center leading-tight">
                  {skill}
                </span>

                {/* Skill Level Indicator */}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-violet-600 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.random() * 40 + 60}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gradient-to-bl from-[#271c54] via-[#1a1a2e] to-[#0d1224]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-violet-500/5 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "30s" }}
        />
      </div>

      {/* Floating Code Symbols */}
      <div className="absolute inset-0">
        {["<", ">", "{", "}", "(", ")", ";", "/"].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-2xl font-mono text-pink-500/20 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            {symbol}
          </div>
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
                  Skills
                </span>
              </div>
            </div>
            <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-violet-500 rounded-full" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical{" "}
            <span className="bg-gradient-to-r from-[#16f2b3] to-cyan-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills Categories */}
        <div
          className={`mb-16 transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(index)}
                  className={`group relative flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 ${
                    activeCategory === index
                      ? "bg-gradient-to-r from-pink-500/20 to-violet-600/20 border-pink-500/50"
                      : "bg-gray-800/50 border-gray-600/50 hover:border-pink-500/30"
                  } border backdrop-blur-sm`}
                >
                  <IconComponent
                    className={`w-5 h-5 ${
                      activeCategory === index
                        ? "text-pink-400"
                        : "text-gray-400"
                    } group-hover:text-pink-400 transition-colors duration-300`}
                  />
                  <span
                    className={`font-medium ${
                      activeCategory === index ? "text-white" : "text-gray-400"
                    } group-hover:text-white transition-colors duration-300`}
                  >
                    {category.name}
                  </span>

                  {activeCategory === index && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 opacity-20 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 max-w-4xl mx-auto">
            {skillCategories[activeCategory].skills.map((skill, index) => {
              const IconComponent = skillIcons[skill] || FaCode;
              return (
                <div
                  key={skill}
                  className="group relative h-28 w-28"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 group-hover:border-pink-500/50 transition-all duration-300 group-hover:scale-105">
                    <div className="flex flex-col items-center space-y-3">
                      <IconComponent
                        className={`w-8 h-8 ${skillColors[skill]} group-hover:scale-110 transition-transform duration-300`}
                      />
                      <span className="text-white text-sm font-medium text-center">
                        {skill}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills Marquee */}
        <div
          className={`mb-16 transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0d1224] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0d1224] to-transparent z-10" />

            <div className="overflow-hidden py-8">
              <MarqueeSkills />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee linear infinite;
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
}

export default Skills;
