const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const { createAuthToken } = require("../middlewares/auth.middleware");
const Activitie = require("../models/Activitie");

const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });
    if (!admin)
      return res.status(400).json({ message: "Invalid username or password." });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid username or password." });

    const token = createAuthToken(admin);
    return res.status(200).json({
      token,
      data: { id: admin._id, username: admin.username, role: admin.role },
      message: `login successfully, welcom back ${admin.username}`,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

const createAdmin = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin)
      return res
        .status(400)
        .json({ message: "This username is already taken." });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin
    const newAdmin = await Admin.create({
      username,
      password: hashedPassword,
      role: role || "tester", // default role is "tester"
    });

    // Generate JWT token
    const token = createAuthToken(newAdmin);

    const activities = {
      action: "New admin created by : " + req.admin.username,
      type: "Admin",
    };

    await Activitie.create(activities);

    // Return success response
    return res.status(201).json({
      message: "Admin created successfully.",
      token,
      admin: {
        id: newAdmin._id,
        username: newAdmin.username,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

const logout = async () => {};

module.exports = { signin, createAdmin };
