const projectsModel = require('../models/projectsModel');

const getAllProjects = async (req, res) => {
    try {
        const projects = await projectsModel.findAll();
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllProjects
};