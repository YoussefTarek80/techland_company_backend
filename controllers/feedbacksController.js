const Feedbacks = require('../models/feedbacksModel');

// ✅ Create Feedback
exports.createFeedback = async (req, res) => {
    try {
        const { name, email, message, rating } = req.body;

        // Validation بسيط
        if (!name || !email || !message || !rating) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const feedback = await Feedbacks.create({
            name,
            email,
            message,
            rating
        });

        res.status(201).json({
            message: 'Feedback submitted successfully',
            data: feedback
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};

// ✅ Get All Feedbacks
exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedbacks.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            data: feedbacks
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};

// ✅ Get Single Feedback
exports.getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;

        const feedback = await Feedbacks.findByPk(id);

        if (!feedback) {
            return res.status(404).json({
                message: 'Feedback not found'
            });
        }

        res.status(200).json({
            data: feedback
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};

// ✅ Delete Feedback (اختياري للـ admin)
exports.deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;

        const feedback = await Feedbacks.findByPk(id);

        if (!feedback) {
            return res.status(404).json({
                message: 'Feedback not found'
            });
        }

        await feedback.destroy();

        res.status(200).json({
            message: 'Feedback deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
};