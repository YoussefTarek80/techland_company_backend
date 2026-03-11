const projects = require('../controllers/projectsController');
const express = require('express');
const router = express.Router();
const adminOnly = require('../middlewares/adminOnly');
const upload = require('../services/upload');

router.get('/', adminOnly, projects.getAllProjects);
router.post('/add', upload.single('Image'), adminOnly, projects.addProject);

module.exports = router;