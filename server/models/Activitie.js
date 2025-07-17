const mongoose = require("mongoose");

const activitieSchema = new mongoose.Schema(
  {
    action: { type: String, required: true },
    time: { type: String, required: true },
    type: {
      type: String,
      enum: [
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
