const projects = require('../controllers/projectsController');
const express = require('express');
const router = express.Router();

router.get('/', projects.getAllProjects);

module.exports = router;