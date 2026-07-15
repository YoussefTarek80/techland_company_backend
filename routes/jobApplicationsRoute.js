const express = require("express");
const router = express.Router();

const adminOnly = require("../middlewares/adminOnly");

const ApplicationsController = require("../controllers/jobApplicationsController");
const uploadResume = require("../middlewares/uploadResume");
router.post(
    "/:jobId",
    uploadResume.single("resume"),
    ApplicationsController.applyForJob
);

router.get("/", adminOnly, ApplicationsController.getApplications);

router.put(
  "/:id/status",
  adminOnly,
  ApplicationsController.updateApplicationStatus
);

module.exports = router;