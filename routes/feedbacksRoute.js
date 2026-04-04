const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbacksController');

router.post('/', feedbackController.createFeedback);
router.get('/', feedbackController.getAllFeedbacks);
router.get('/:id', feedbackController.getFeedbackById);
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;