const Nassim = require("../models/Nassim");

const getPersonalData = async (req, res) => {
  try {
    const data = await Nassim.findOne();
    if (!data) return res.status(404).json({ message: "Profile not found!" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePersonalData = async (req, res) => {
  try {
    const updatedData = await Nassim.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedData) {
      return res.status(404).json({ message: "Profile not found!" });
    }

    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPersonalData, updatePersonalData };
