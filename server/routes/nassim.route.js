const { Router } = require("express");
const router = Router();

const { authenticate, authorize } = require("../middlewares/auth.middleware");

const { getPersonalData } = require("../controllers/nassim.controller");
const { updatePersonalData } = require("../controllers/nassim.controller");

router.get("/", getPersonalData);
router.put(
  "/",
  authenticate,
  authorize(["admin", "tester"]),
  updatePersonalData
);

module.exports = router;
