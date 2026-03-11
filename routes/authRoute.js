const authController = require("../controllers/authController");
const router = require("express").Router();

router.post("/login", authController.loginAdmin);
router.post("/add", authController.addAdmin);

module.exports = router;