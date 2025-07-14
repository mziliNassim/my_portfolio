const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  institution: { type: String, required: true },
  duration: String,
  city: String,
  description: String,
  achievements: [String],
  type: { type: String, enum: ["Degree", "Certification"], required: true },
  status: {
    type: String,
    enum: ["Progress", "Completed", "Certified"],
    required: true,
  },
});

module.exports = mongoose.model("Education", educationSchema);
