const Project = require("../models/Project");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addProject = async (req, res) => {
  try {
    if (req.admin.role === "admin") {
      const newProject = new Project(req.body);
      const savedProject = await newProject.save();
      return res.status(201).json(savedProject);
    } else if (req.admin.role === "tester") {
      return res.status(200).json({
        message: "Testing Account : Cannot add projects!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    if (req.admin.role === "admin") {
      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedProject)
        return res.status(404).json({ message: "Project not found" });

      return res.status(200).json({ updatedProject });
    } else if (req.admin.role === "tester") {
      return res.status(200).json({
        message: "Testing Account : Cannot update projects!",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    if (req.admin.role === "admin") {
      const deletedProject = await Project.findByIdAndDelete(req.params.id);
      if (!deletedProject)
        return res.status(404).json({ message: "Project not found" });
      return res.status(200).json({ message: "Project deleted successfully" });
    } else if (req.admin.role === "tester") {
      return res.status(200).json({
        message: "Testing Account : Cannot dalete projects!",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
