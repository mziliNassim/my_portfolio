const mongoose = require("mongoose");

const activitieSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    time: { type: String, required: true, default: Date.now },
    type: {
      type: String,
      enum: [
        "Admin",
        "project",
        "education",
        "experience",
        "view",
        "download",
        "contact",
        "update",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activitie", activitieSchema);
