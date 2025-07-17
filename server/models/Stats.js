const mongoose = require("mongoose");

// Schéma pour les vues mensuelles (uniquement name + views)
const viewsDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "Jan", "Feb", "Apr"
    views: { type: Number, required: true },
  },
  { _id: false }
);

// Schéma pour les appareils (Desktop, Mobile, Tablet)
const deviceDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "Desktop"
    value: { type: Number, required: true }, // e.g., 65
    color: { type: String, required: true }, // e.g., "#3B82F6"
  },
  { _id: false }
);

const statsSchema = new mongoose.Schema(
  {
    totalProjects: { type: Number, default: 0 },
    totalExperiences: { type: Number, default: 0 },
    totalEducations: { type: Number, default: 0 },
    totalVisitors: { type: Number, default: 0 },
    viewsData: {
      type: [viewsDataSchema],
      default: [
        { name: "Jan", views: 0 },
        { name: "Feb", views: 0 },
        { name: "Mar", views: 0 },
        { name: "Apr", views: 0 },
        { name: "May", views: 0 },
        { name: "Jun", views: 0 },
        { name: "Jul", views: 0 },
        { name: "Aug", views: 0 },
        { name: "Sep", views: 0 },
        { name: "Oct", views: 0 },
        { name: "Nov", views: 0 },
        { name: "Dec", views: 0 },
      ],
    },
    deviceData: {
      type: [deviceDataSchema],
      default: [
        { name: "Desktop", value: 1, color: "#3B82F6" },
        { name: "Mobile", value: 0, color: "#10B981" },
        { name: "Tablet", value: 0, color: "#F59E0B" },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stats", statsSchema);
