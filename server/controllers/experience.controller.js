const Experience = require("../models/Experience");

const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    return res.status(200).json(experiences);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getExperiencesById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: "Not found" });
    return res.json(experience);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const addExperience = async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    const saved = await newExperience.save();
    return res.status(201).json(saved);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateExperience = async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    return res.json({ message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getExperiences,
  getExperiencesById,
  addExperience,
  updateExperience,
  deleteExperience,
};
