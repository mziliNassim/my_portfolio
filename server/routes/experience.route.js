const { Router } = require("express");

const {
  getExperiences,
  getExperiencesById,
  addExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experience.controller");

const router = Router();

router.get("/", getExperiences);
router.get("/:id", getExperiencesById);
router.post("/", addExperience);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);

module.exports = router;
