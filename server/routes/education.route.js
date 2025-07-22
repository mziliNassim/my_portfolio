const { Router } = require("express");
const router = Router();

const { authenticate, authorize } = require("../middlewares/auth.middleware");

const { getEducations } = require("../controllers/education.controller");
const { getEducationById } = require("../controllers/education.controller");
const { addEducation } = require("../controllers/education.controller");
const { updateEducation } = require("../controllers/education.controller");
const { deleteEducation } = require("../controllers/education.controller");

router.get("/", getEducations);
router.get("/:id", getEducationById);
router.post("/", authenticate, authorize(["admin", "tester"]), addEducation);
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "tester"]),
  updateEducation
);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "tester"]),
  deleteEducation
);

module.exports = router;
