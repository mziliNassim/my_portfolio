import React, { useState, useEffect, useRef } from "react";

import { Briefcase } from "lucide-react";

import EducationCard from "./EducationCard";
import FloatingParticles from "../styles/FloatingParticles";
import AnimatedBackgroundElements from "../styles/AnimatedBackgroundElements";

const Education = ({ educations }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [animationKey, setAnimationKey] = useState(0);
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

  // Reset animations when tab changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [activeTab]);

  const tabs = ["All", "Degrees", "Certifications"];

  const filteredEducations = educations.filter((education) => {
    if (activeTab === "All") return true;
    if (activeTab === "Degrees") return education.type === "Degree";
    if (activeTab === "Certifications")
      return education.type === "Certification";
    return true;
  });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54] overflow-hidden"
    >
      <AnimatedBackgroundElements />
      <FloatingParticles />

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
                  Education
                </span>
              </div>
            </div>
            <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-violet-500 rounded-full" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Academic{" "}
            <span className="bg-gradient-to-r from-[#16f2b3] to-cyan-400 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My educational background and continuous learning path in technology
            and development
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className={`flex justify-center mb-12 transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex space-x-2 bg-gray-800/30 backdrop-blur-sm rounded-full p-2 border border-gray-700/50">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 cursor-pointer rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {filteredEducations.map((education, index) => (
            <EducationCard
              key={index}
              education={education}
              index={index}
              isVisible={isVisible}
              animationKey={animationKey}
            />
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gradient-to-r from-pink-500/10 to-violet-600/10 rounded-full border border-pink-500/20">
            <Briefcase className="w-6 h-6 text-pink-400" />
            <span className="text-gray-300 font-medium">
              Committed to lifelong learning and professional growth
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
