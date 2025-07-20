const { Router } = require("express");
const router = Router();

const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { verifyToken } = require("../middlewares/auth.middleware");

const { signin, createAdmin } = require("../controllers/auth.controller");

router.post("/verify-token", verifyToken);
router.post("/", signin);
router.post("/create-admin", authenticate, authorize(["admin"]), createAdmin);

module.exports = router;
