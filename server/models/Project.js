// models/project.model.js
const mongoose = require("mongoose");

const collaboratorSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    linkedIn: String,
    github: String,
    Website: String,
    instagram: String,
    phone: String,
    address: String,
    facebook: String,
    twitter: String,
    profile: String,
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    poster: String,
    description: String,
    tools: [String],
    role: String,
    code: String,
    demo: String,
    inDevelopment: { type: Boolean, default: false },
    collabWith: [collaboratorSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
