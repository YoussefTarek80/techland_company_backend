const positionsModel = require('../models/positionModel');

const getAllPositions = async (req, res) => {
    try {
        const positions = await positionsModel.findAll();
        res.json(positions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const addPosition = async (req, res) => {
    try {
        const position = await positionsModel.create(req.body);
        res.json(position);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = {
    getAllPositions,
    addPosition
};