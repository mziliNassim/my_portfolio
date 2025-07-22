const Activitie = require("../models/Activitie");

const getActivities = async (req, res) => {
  try {
    const activities = await Activitie.find().sort({ createdAt: -1 }).limit(5);
    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addActivitie = async (req, res) => {
  try {
    const { action, time, type } = req.body;

    const newActivitie = new Activitie({ action, time, type });
    await newActivitie.save();

    return res.status(201).json(newActivitie);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteActivitie = async (req, res) => {
  try {
    const deleted = await Activitie.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Activitie not found" });
    }
    return res.status(200).json({ message: "Activitie deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getActivities, addActivitie, deleteActivitie };
