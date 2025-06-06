import React, { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

import { BsChatDots } from "react-icons/bs";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaDiscord,
  FaPaperPlane,
  FaUser,
  FaComment,
  FaHeart,
  FaRocket,
  FaStar,
  FaGlobe,
  FaInstagram,
} from "react-icons/fa";

import { personalData } from "../utils/data/personal-data";

// Mock contact data
const contactInfo = [
  {
    id: 1,
    icon: FaEnvelope,
    title: "Email",
    value: "mzilinassim@gmail.com",
    link: `mailto:${personalData.email}`,
    bgColor: "from-pink-500 to-rose-500",
    description: "Drop me a line anytime",
  },
  {
    id: 2,
    icon: FaPhone,
    title: "Phone",
    value: "+212 6 81930875",
    link: `tel:${personalData.tele}`,
    bgColor: "from-green-500 to-emerald-500",
    description: "Let's have a quick chat",
  },
  {
    id: 4,
    icon: FaLinkedin,
    title: "Linkedin",
    value: "linkedin.com/in/mzilinassim",
    link: personalData.linkedIn,
    bgColor: "from-violet-500 to-blue-500",
    description: "Check out my linkedin",
  },
  {
    id: 4,
    icon: FaGithub,
    title: "Github",
    value: "github.com/mzilinassim",
    link: personalData.github,
    bgColor: "from-gray-500 to-purple-500",
    description: "Check out my portfolio",
  },
];

const socialLinks = [
  {
    icon: FaGithub,
    link: personalData.github,
    name: "GitHub",
    color: "hover:text-gray-300",
  },
  {
    icon: FaLinkedin,
    link: personalData.linkedIn,
    name: "LinkedIn",
    color: "hover:text-blue-400",
  },
  {
    icon: FaTwitter,
    link: personalData.twitter,
    name: "Twitter",
    color: "hover:text-sky-400",
  },
  {
    icon: FaInstagram,
    link: personalData.instagram,
    name: "instagram",
    color: "hover:text-red-400",
  },
];

// Contact Card Component
const ContactCard = ({ contact, index, isVisible }) => {
  const [hovered, setHovered] = useState(false);
  const IconComponent = contact.icon;

  return (
    <div
      className={`group relative transform transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />

      {/* Card Content */}
      <a
        target="_blank"
        href={contact.link}
        className="relative block bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 group-hover:border-pink-500/50 transition-all duration-500 hover:scale-105"
      >
        <div className="flex items-center space-x-4">
          <div
            className={`p-4 bg-gradient-to-r ${contact.bgColor}/20 rounded-xl border border-current/30 group-hover:scale-110 transition-transform duration-300`}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-pink-300 transition-colors duration-300">
              {contact.title}
            </h4>
            <p className="text-gray-400 text-sm mb-1">{contact.value}</p>
            <p className="text-gray-500 text-xs">{contact.description}</p>
          </div>
        </div>

        {/* Hover Animation Line */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-pink-500 to-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </a>
    </div>
  );
};

// Contact Form Component
const ContactForm = ({ isVisible }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useRef();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isValidDataValue = () => {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.message === ""
    ) {
      toast.warning("Required fields cannot be empty !!", {
        action: { label: "✖️" },
      });
    } else if (!validateEmail(formData.email)) {
      toast.warning("Invalid Email Adress !!", {
        action: { label: "✖️" },
      });
    } else if (formData.message.length < 10) {
      toast.warning("The message must be at least 10 characters long !!", {
        action: { label: "✖️" },
      });
    } else return true;
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const senToEmail = async () => {
      await emailjs
        .sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          form.current,
          { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
        )
        .then(
          () => {
            toast.success("Thans for contacting me !!", {
              action: { label: "✖️" },
            });

            setFormData({
              name: "",
              email: "",
              message: "",
            });
          },
          (error) => {
            toast.error(
              error.message || error.text || "Error while sending message !",
              {
                action: { label: "✖️" },
              }
            );
          }
        );
    };

    if (isValidDataValue()) {
      senToEmail();
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }

    setIsSubmitting(false);
  };

  return (
    <div
      className={`relative transform transition-all duration-1000 delay-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 rounded-2xl blur-xl opacity-20" />

      {/* Form Container */}
      <form
        ref={form}
        method="post"
        className="relative bg-gradient-to-br from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-xl border border-pink-500/30">
            <BsChatDots className="w-6 h-6 text-pink-400" />
          </div>
          <h3 className="text-2xl font-bold text-white">Send Me a Message</h3>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                <FaUser className="w-4 h-4 text-pink-400" />
                <span>Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                placeholder="Your Name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
                <FaEnvelope className="w-4 h-4 text-violet-400" />
                <span>Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-gray-300 text-sm font-medium flex items-center space-x-2">
              <FaComment className="w-4 h-4 text-green-400" />
              <span>Message</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 resize-none"
              placeholder="Tell me about your project or just say hello!"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || submitted}
            style={{
              cursor: isSubmitting || submitted ? "not-allowed" : "pointer",
            }}
            onClick={handleSubmit}
            className="group relative w-full py-4 bg-gradient-to-r from-pink-500 to-violet-600 rounded-lg text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative  flex items-center justify-center space-x-2">
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : submitted ? (
                <>
                  <FaHeart className="w-5 h-5 text-red-300 animate-pulse" />
                  <span>Message Sent!</span>
                </>
              ) : (
                <>
                  <FaPaperPlane className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  <span>Send Message</span>
                </>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

// Social Icon Component
const SocialIcon = ({ social, index }) => {
  const IconComponent = social.icon;

  return (
    <a
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600/30 hover:border-pink-500/50 transition-all duration-300 hover:scale-110"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <IconComponent
        className={`w-6 h-6 text-gray-400 ${social.color} transition-colors duration-300 relative z-10`}
      />
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {social.name}
      </span>
    </a>
  );
};

// Main Contact Component
function Contact() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-gradient-to-bl from-[#271c54] via-[#1a1a2e] to-[#0d1224]"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-cyan-500/5 to-pink-500/5 rounded-full blur-3xl animate-spin"
          style={{ animationDuration: "30s" }}
        />
      </div>

      {/* Floating Symbols */}
      <div className="absolute inset-0">
        {["@", "✉", "📞", "📍", "🔗", "💬", "🚀", "💡"].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-2xl opacity-20 animate-ping"
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
                  Contact
                </span>
              </div>
            </div>
            <div className="w-16 h-[2px] bg-gradient-to-l from-transparent to-violet-500 rounded-full" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In{" "}
            <span className="bg-gradient-to-r from-[#16f2b3] to-cyan-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I'm always open to collaboration and new opportunities. Let's create
            something amazing together!
          </p>
        </div>

        {/* Contact Info Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16 transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {contactInfo.map((contact, index) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto mb-16">
          <ContactForm isVisible={isVisible} />
        </div>

        {/* Social Links */}
        <div
          className={`text-center transform transition-all duration-1000 delay-500 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h3 className="text-2xl font-bold text-white mb-8">
            Connect With Me
          </h3>
          <div className="flex justify-center space-x-4 mb-12">
            {socialLinks.map((social, index) => (
              <SocialIcon key={social.name} social={social} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`text-center transform transition-all duration-1000 delay-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-full blur-md" />
            <div className="relative bg-gradient-to-r from-[#0d1224]/90 to-[#1a1a2e]/90 backdrop-blur-sm rounded-full border border-gray-700/50 px-8 py-4">
              <div className="flex items-center space-x-4">
                <FaRocket className="w-6 h-6 text-pink-400" />
                <span className="text-white font-medium text-lg">
                  Let's build something amazing together!
                </span>
                <div className="flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
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

export default Contact;
