const Education = require("../models/Education.js");

const getEducations = async (req, res) => {
  try {
    const educations = await Education.find().sort({ duration: -1 });
    res.status(200).json(educations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).json({ message: "Not found" });
    res.status(200).json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addEducation = async (req, res) => {
  try {
    const newEducation = new Education(req.body);
    const saved = await newEducation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEducation = async (req, res) => {
  try {
    const updated = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEducation = async (req, res) => {
  try {
    const deleted = await Education.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEducations,
  getEducationById,
  addEducation,
  updateEducation,
  deleteEducation,
};
