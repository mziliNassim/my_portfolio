const Stats = require("../models/Stats");

const getstats = async (req, res) => {
  try {
    // only 10 last documents
    const data = await Stats.findOne();
    if (!data) return res.status(404).json({ message: "Stats not found!" });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const incrimentVisiters = async (req, res) => {
  try {
    const { device, currentMonth } = req.body;

    if (!device || !currentMonth) {
      return res
        .status(400)
        .json({ message: "Device and currentMonth are required." });
    }

    const stats = await Stats.findOne();
    if (!stats) return res.status(404).json({ message: "Stats not found!" });

    stats.totalVisitors += 1;
    stats.viewsData = stats.viewsData.map((entry) =>
      entry.name === currentMonth
        ? { ...entry.toObject(), views: entry.views + 1 }
        : entry
    );
    stats.deviceData = stats.deviceData.map((entry) =>
      entry.name === device
        ? { ...entry.toObject(), value: entry.value + 1 }
        : entry
    );

    await stats.save();
    return res.status(200).json({ message: "Visitor incremented", stats });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getstats, incrimentVisiters };
