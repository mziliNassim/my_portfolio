const express = require("express");
const router = express.Router();

const { authenticate, authorize } = require("../middlewares/auth.middleware");

const { getActivities } = require("../controllers/activitie.controller");
const { addActivitie } = require("../controllers/activitie.controller");
const { deleteActivitie } = require("../controllers/activitie.controller");

router.get("/", getActivities);
router.post("/", addActivitie);
router.delete("/:id", authenticate, authorize(["admin"]), deleteActivitie);

module.exports = router;
