const { Router } = require("express");
const router = Router();

const { authenticate, authorize } = require("../middlewares/auth.middleware");

const { getProjects } = require("../controllers/projects.controller");
const { getProjectById } = require("../controllers/projects.controller");
const { addProject } = require("../controllers/projects.controller");
const { updateProject } = require("../controllers/projects.controller");
const { deleteProject } = require("../controllers/projects.controller");

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", authenticate, authorize(["admin"]), addProject);
router.put("/:id", authenticate, authorize(["admin"]), updateProject);
router.delete("/:id", authenticate, authorize(["admin"]), deleteProject);

module.exports = router;
