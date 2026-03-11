const teamsController = require('../controllers/teamsController');
const express = require('express');
const router = express.Router();
const upload = require('../services/upload');
const adminOnly = require('../middlewares/adminOnly');

router.get('/', adminOnly, teamsController.getAllTeams);
router.post('/add', upload.single('Image'), adminOnly, teamsController.addTeam);

module.exports = router;