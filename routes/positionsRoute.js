const postionsController = require('../controllers/positionsController');
const express = require('express');
const router = express.Router();

router.get('/', postionsController.getAllPositions);

module.exports = router;