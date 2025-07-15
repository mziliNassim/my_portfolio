const { Router } = require("express");
const {
  getPersonalData,
  updatePersonalData,
} = require("../controllers/nassim.controller");

const router = Router();

router.get("/", getPersonalData);
router.put("/", updatePersonalData);

module.exports = router;
