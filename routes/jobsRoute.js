const express = require("express");
const router = express.Router();
const adminOnly = require('../middlewares/adminOnly');

const JobsController = require("../controllers/jobsController");

router.get("/", JobsController.getAllJobs);
router.get("/:slug", JobsController.getJobBySlug);

router.post("/", adminOnly, JobsController.createJob);
router.put("/:id", adminOnly, JobsController.updateJob);
router.delete("/:id", adminOnly, JobsController.deleteJob);

module.exports = router;