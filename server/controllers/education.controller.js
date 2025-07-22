const Activitie = require("../models/Activitie.js");
const Education = require("../models/Education.js");

const getEducations = async (req, res) => {
  try {
    const educations = await Education.find().sort({ duration: -1 });
    return res.status(200).json(educations);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(education);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const addEducation = async (req, res) => {
  try {
    if (req.admin.role === "admin") {
      const newEducation = new Education(req.body);
      const saved = await newEducation.save();

      const activities = {
        action: "Education added by admin : " + req.admin.username,
        type: "education",
      };
      await Activitie.create(activities);

      return res.status(201).json(saved);
    } else if (req.admin.role === "tester") {
      return res.status(200).json({
        message: "Testing Account : Cannot add Education!",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateEducation = async (req, res) => {
  try {
    if (req.admin.role === "admin") {
      const updated = await Education.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updated) return res.status(404).json({ message: "Not found" });

      const activities = {
        action: "Education updated by admin : " + req.admin.username,
        type: "education",
      };
      await Activitie.create(activities);

      return res.status(200).json(updated);
    } else if (req.admin.role === "tester") {
      return res.status(200).json({
        message: "Testing Account : Cannot update Education!",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteEducation = async (req, res) => {
  try {
    if (req.admin.role === "admin") {
      const deleted = await Education.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Not found" });

      const activities = {
        action: "Education deleted by admin : " + req.admin.username,
        type: "education",
      };
      await Activitie.create(activities);

      return res.status(200).json({ message: "Deleted successfully" });
    } else if (req.admin.role === "tester") {
      return res.status(200).json({
        message: "Testing Account : Cannot delete Education!",
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getEducations,
  getEducationById,
  addEducation,
  updateEducation,
  deleteEducation,
};
