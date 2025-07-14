const mongoose = require("mongoose");

const nassimSchema = new mongoose.Schema({
  name: String,
  profile: String,
  designation: [String],
  description: String,
  email: String,
  phone: String,
  address: String,
  github: String,
  facebook: String,
  linkedIn: String,
  twitter: String,
  instagram: String,
  Website: String,
  tele: String,
  stackOverflow: String,
  leetcode: String,
  devUsername: String,
  interests: [String],
  resume: String,
  fullResume: String,
  skills: [String],
  experience: String,
  projects: String,
  clients: String,
});

module.exports = mongoose.model("Nassim", nassimSchema);
