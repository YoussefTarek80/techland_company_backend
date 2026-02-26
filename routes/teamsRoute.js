const teamsController = require('../controllers/teamsController');
const express = require('express');
const router = express.Router();
const upload = require('../services/upload');

router.get('/', teamsController.getAllTeams);
router.post('/add', upload.single('Image'), teamsController.addTeam);

module.exports = router;