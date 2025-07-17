const { Router } = require("express");

const {
  getstats,
  incrimentVisiters,
} = require("../controllers/stats.controller");

const router = Router();

router.get("/", getstats);
router.put("/incriment-visiters", incrimentVisiters);

module.exports = router;
