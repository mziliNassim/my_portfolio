const { Router } = require("express");
const router = Router();

const { authenticate, authorize } = require("../middlewares/auth.middleware");

const { getExperiences } = require("../controllers/experience.controller");
const { getExperiencesById } = require("../controllers/experience.controller");
const { addExperience } = require("../controllers/experience.controller");
const { updateExperience } = require("../controllers/experience.controller");
const { deleteExperience } = require("../controllers/experience.controller");

router.get("/", getExperiences);
router.get("/:id", getExperiencesById);
router.post("/", authenticate, authorize(["admin", "tester"]), addExperience);
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "tester"]),
  updateExperience
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "tester"]),
  deleteExperience
);

module.exports = router;
