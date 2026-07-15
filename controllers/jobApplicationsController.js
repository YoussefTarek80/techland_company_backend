const JobApplication = require("../models/jobApplicationsModel");
const Job = require("../models/jobsModel");

const applyForJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const application = await JobApplication.create({
      ...req.body,
      jobId: req.params.jobId,
      resume: req.file ? `/uploads/resumes/${req.file.filename}` : null
    });

    res.status(201).json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getApplications = async (req, res) => {
  try {
    const applications = await JobApplication.findAll({
      include: [Job],
      order: [["createdAt", "DESC"]],
    });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const application = await JobApplication.findByPk(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    await application.update({
      status: req.body.status,
      notes: req.body.notes,
    });

    res.json(application);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  applyForJob,
  getApplications,
  updateApplicationStatus,
};