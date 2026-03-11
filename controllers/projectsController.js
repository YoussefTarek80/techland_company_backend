const projectsModel = require('../models/projectsModel');
// projectsModel.sync({ alter: true })
const getAllProjects = async (req, res) => {
    try {
        const projects = await projectsModel.findAll();
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addProject = async (req, res) => {
  try {
    const {
      name,
      description,
      industry,
      servicesType,
      client,
      challenges,
      solutions,
      link
    } = req.body;
    const project = await projectsModel.create({
      name,
      description,
      Image: req.file ? `${process.env.url}/uploads/${req.file.filename}` : null,
      industry,
      servicesType,
      client,
      challenges,
      solutions,
      link
    });

    res.status(201).json({
      message: "Project added successfully",
      project
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
    getAllProjects,addProject
};