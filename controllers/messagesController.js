const messageModel = require('../models/messagesModel');
// messageModel.sync({ alter: true })
const getAllMessages = async (req, res) => {
    try {
        const messages = await messageModel.findAll();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const addMessage = async (req, res) => {
    try {
        const message = await messageModel.create(req.body);
        res.json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllMessages,
    addMessage
};