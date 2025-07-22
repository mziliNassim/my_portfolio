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
    return res.status(200).json(experience);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const addExperience = async (req, res) => {
  try {
    if (req.admin.role === "admin") {
      const newExperience = new Experience(req.body);
      const saved = await newExperience.save();
      return res.status(201).json(saved);
    } else if (req.admin.role === "tester") {
      return res.status(200).json({
        message: "Testing Account : Cannot add experience!",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateExperience = async (req, res) => {
  try {
    if (req.admin.role === "admin") {
      const updated = await Experience.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updated) return res.status(404).json({ message: "Not found" });
      return res.status(200).json(updated);
    } else if (req.admin.role === "tester") {
      return res.status(200).json({
        message: "Testing Account : Cannot add experience!",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteExperience = async (req, res) => {
  try {
    if (req.admin.role === "admin") {
      const deleted = await Experience.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Not found" });
      return res.status(200).json({ message: "Deleted successfully" });
    } else if (req.admin.role === "tester") {
      return res.status(200).json({
        message: "Testing Account : Cannot delete experience!",
      });
    }
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
