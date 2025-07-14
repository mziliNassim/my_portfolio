const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: {
      name: { type: String, required: true },
      link: { type: String },
    },
    duration: { type: String },
    logo: { type: String },
    description: { type: String },
    technologies: [String],
    timeType: { type: String }, // Full-time, Internship, Freelance
    type: { type: String }, // Stage PFE, Freelance, etc.
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Experience", experienceSchema);
