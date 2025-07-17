const Activitie = require("../models/Activitie");

const getActivities = async (req, res) => {
  try {
    const activities = await Activitie.find().sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addActivitie = async (req, res) => {
  try {
    const { action, time, type } = req.body;

    const newActivitie = new Activitie({ action, time, type });
    await newActivitie.save();

    res.status(201).json(newActivitie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteActivitie = async (req, res) => {
  try {
    const deleted = await Activitie.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Activitie not found" });
    }
    res.json({ message: "Activitie deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getActivities, addActivitie, deleteActivitie };
