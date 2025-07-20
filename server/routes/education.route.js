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
router.post("/", authenticate, authorize(["admin"]), addEducation);
router.put("/:id", authenticate, authorize(["admin"]), updateEducation);
router.delete("/:id", authenticate, authorize(["admin"]), deleteEducation);

module.exports = router;
