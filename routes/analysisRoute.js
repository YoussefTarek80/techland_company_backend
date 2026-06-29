const analysisController = require("../controllers/analysisController");
const express = require("express");
const router = express.Router();

router.get("/", analysisController.getAnalysis);

module.exports = router;