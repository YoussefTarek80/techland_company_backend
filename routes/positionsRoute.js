const postionsController = require('../controllers/positionsController');
const express = require('express');
const router = express.Router();
const adminOnly = require('../middlewares/adminOnly');

router.get('/', adminOnly, postionsController.getAllPositions);

module.exports = router;