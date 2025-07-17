const express = require("express");
const router = express.Router();

const {
  getActivities,
  addActivitie,
  deleteActivitie,
} = require("../controllers/activitie.controller");

router.get("/", getActivities);
router.post("/", addActivitie);
router.delete("/:id", deleteActivitie);

module.exports = router;
