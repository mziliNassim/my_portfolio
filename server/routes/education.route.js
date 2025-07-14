const { Router } = require("express");

const {
  getEducations,
  getEducationById,
  addEducation,
  updateEducation,
  deleteEducation,
} = require("../controllers/education.controller");

const router = Router();

router.get("/", getEducations);
router.get("/:id", getEducationById);
router.post("/", addEducation);
router.put("/:id", updateEducation);
router.delete("/:id", deleteEducation);

module.exports = router;
