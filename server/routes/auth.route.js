const { Router } = require("express");

const { signin, createAdmin } = require("../controllers/auth.controller.js");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth.middleware.js");

const router = Router();

router.post("/", signin);
router.post("/create-admin", authenticate, authorize(["admin"]), createAdmin);

module.exports = router;
