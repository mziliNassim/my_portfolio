const { Router } = require("express");
const router = Router();

const { getstats } = require("../controllers/stats.controller");
const { incrimentVisiters } = require("../controllers/stats.controller");

router.get("/", getstats);
router.put("/incriment-visiters", incrimentVisiters);

module.exports = router;
