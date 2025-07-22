const Nassim = require("../models/Nassim");

const getPersonalData = async (req, res) => {
  try {
    const data = await Nassim.findOne();
    if (!data) return res.status(404).json({ message: "Profile not found!" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePersonalData = async (req, res) => {
  try {
    if (req.admin.role === "admin") {
      const updatedData = await Nassim.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedData) {
        return res.status(404).json({ message: "Profile not found!" });
      }
      return res.status(200).json({
        ...updatedData,
        message: "Profile update successfuly!",
      });
    } else if (req.admin.role === "tester") {
      return res.status(200).json({
        message: "Testing Account : Cannot update profile!",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getPersonalData, updatePersonalData };
