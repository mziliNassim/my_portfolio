import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Sparkles, Globe, FileText, Github } from "lucide-react";
import { Twitter, Instagram, Facebook, Mail } from "lucide-react";
import { MapPin, Heart, Code, Rocket, Linkedin } from "lucide-react";
import { MessageCircleMore, Copyright, Phone } from "lucide-react";

const Footer = ({ personalData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  const location = useLocation();

  const links = [
    {
      id: `linkedin-${Date.now()}`,
      desc: `linkedin.com/in/mzilinassim/`,
      title: "LinkedIn",
      Icon: Linkedin,
      url: personalData?.linkedIn,
      color: "#0077b5",
      hover: "hover:text-blue-400",
    },
    {
      id: `github-${Date.now()}`,
      desc: `github.com/mziliNassim/`,
      title: "github",
      Icon: Github,
      url: "https://github.com/mziliNassim",
      color: "#16181f",
      hover: "hover:text-gray-300",
    },
    {
      id: `Instagram-${Date.now()}`,
      desc: `instagram.com/nassim__dev/`,
      title: "Instagram",
      Icon: Instagram,
      url: personalData?.instagram,
      color: "#b60cbc",
      hover: "hover:text-pink-400",
    },
    {
      id: `mail-${Date.now()}`,
      desc: `mzilinassim@gmail.com`,
      title: "Email",
      Icon: Mail,
      url: "mailto:mzilinassim@gmail.com",
      color: "#5f98d1",
      hover: "hover:text-green-400",
    },
    {
      id: `cv-${Date.now()}`,
      desc: `https://nassim.online/mycv`,
      title: "Resume - CV",
      Icon: FileText,
      url: personalData?.fullResume,
      color: "#363636",
      hover: "",
    },
    {
      id: `portfolio-${Date.now()}`,
      desc: `https://nassim.online/`,
      title: "Portfolio",
      Icon: Globe,
      url: personalData?.Website,
      color: "#1b1b31",
      hover: "",
    },
    {
      id: `twitter-${Date.now()}`,
      desc: `twitter.com/nassim__dev`,
      title: "Twitter",
      Icon: Twitter,
      url: personalData?.twitter,
      color: "#1DA1F2",
      hover: "hover:text-cyan-400",
    },
    {
      id: `fb-${Date.now()}`,
      desc: `facebook.com/mziliNassim/`,
      title: "Facebook",
      Icon: Facebook,
      url: personalData?.facebook,
      color: "#1877F2",
      hover: "hover:text-blue-500",
    },
    {
      id: `discord-${Date.now()}`,
      desc: `discord.com/invite/wkaYHKT7`,
      title: "discord",
      Icon: MessageCircleMore,
      url: "https://discord.com/users/668786277448941599",
      color: "#5a26ce",
      hover: "",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const footerElement = document.getElementById("footer");
    if (footerElement) {
      observer.observe(footerElement);
    }
  }, []);

  const quickLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "Skills", href: "/#skills" },
    { name: "Contact", href: "/#contact" },
  ];

  const routes = [
    { name: "Portfolio", href: "/" },
    { name: "All Projects", href: "/projects" },
    { name: "Resume", href: "/cv" },
    { name: "Links", href: "/links" },
    { name: "Dashboard", href: "/admin/dashboard" },
  ];

  return (
    <>
      <footer
        id="footer"
        className="relative bg-gradient-to-br from-[#0d1224] via-[#1a1a2e] to-[#271c54] overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-cyan-500/3 to-pink-500/3 rounded-full blur-3xl" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              {i % 3 === 0 ? (
                <Sparkles className="w-2 h-2 text-pink-400/30" />
              ) : (
                <div className="w-1 h-1 bg-cyan-400/20 rounded-full" />
              )}
            </div>
          ))}
        </div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
            {/* Top Section */}
            <div
              className={`w-full block gap-y-10 md:flex justify-between gap-12 mb-16 transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-6 w-full mb-20 md:mb-auto">
                <div className="space-y-4 text-center md:text-left ">
                  <h3 className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
                      Nassim
                    </span>
                    <span className="text-white ml-2">MZILI</span>
                  </h3>
                  <p className="text-gray-400 mx-auto md:ml-0 text-lg leading-relaxed max-w-md">
                    Passionate full-stack developer crafting digital experiences
                    with modern technologies. Let's build something amazing
                    together!
                  </p>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 text-center md:text-left ">
                  {personalData?.address && (
                    <div className="flex items-center justify-center space-x-3 text-gray-400 hover:text-pink-400 transition-colors">
                      <MapPin className="w-4 h-4" />
                      <span>{personalData.address}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-center md:justify-start text-center md:text-left  space-x-3 text-gray-400 hover:text-pink-400 transition-colors">
                    <Mail className="w-4 h-4" />
                    <a
                      href={`mailto:${personalData.email}`}
                      className="hover:underline"
                    >
                      {personalData.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-center md:justify-start text-center md:text-left space-x-3 text-gray-400 hover:text-pink-400 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>{personalData.tele}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center md:justify-start space-x-4 gap-y-2 flex-wrap">
                  {links.map((social, index) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.title}
                      className={`p-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30 hover:border-pink-500/50 transition-all duration-300 ${social.hover} hover:scale-110 hover:-translate-y-1 group`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <social.Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </a>
                  ))}
                </div>
              </div>

              {/* links && routes */}
              <div className="flex items-start gap-10 justify-evenly w-full">
                {/* Quick Links */}
                {location?.pathname !== "/projects" &&
                  location?.pathname !== "/links" && (
                    <div className="space-y-6">
                      <h4 className="text-xl font-bold text-white flex items-center space-x-2">
                        <Rocket className="w-5 h-5 text-pink-400" />
                        <span>Quick Links</span>
                      </h4>
                      <ul className="space-y-3">
                        {quickLinks.map((link, index) => (
                          <li key={link.name}>
                            <a
                              href={link.href}
                              className="text-gray-400 hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2 group hover:translate-x-2"
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                              <span>{link.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Routes */}
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-white flex items-center space-x-2">
                    <Code className="w-5 h-5 text-violet-400" />
                    <span>Routes</span>
                  </h4>
                  <ul className="space-y-3">
                    {routes.map((route, index) => (
                      <li key={route.name}>
                        <a
                          href={route.href}
                          className="text-gray-400 hover:text-violet-400 transition-colors duration-300 flex items-center space-x-2 group hover:translate-x-2"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <span className="w-2 h-2 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span>{route.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8" />

            {/* Bottom Section */}
            <div
              className={`flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* Copyright */}
              <div className="flex items-center space-x-2 text-gray-400">
                <Copyright className="w-4 h-4" />
                <span>{currentYear} . All rights reserved.</span>
              </div>

              {/* Made with Love */}
              <div className="flex items-center space-x-2 text-gray-400">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>and</span>
                <Code className="w-4 h-4 text-pink-400" />
                <span>
                  by{" "}
                  <a href={personalData.Website} className="underline italic">
                    {personalData.name}
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Gradient Line */}
          <div className="h-1 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500" />
        </div>

        <style>{`
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
      </footer>
    </>
  );
};

export default Footer;
