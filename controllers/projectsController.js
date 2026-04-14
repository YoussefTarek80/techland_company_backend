const projectsModel = require('../models/projectsModel');
const fs = require('fs');
const path = require('path');

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

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await projectsModel.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
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

    let imagePath = project.Image;

    if (req.file) {
      if (project.Image) {
        const oldImagePath = path.join(
          __dirname,
          '..',
          'uploads',
          path.basename(project.Image)
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      imagePath = `${process.env.url}/uploads/${req.file.filename}`;
    }

    await project.update({
      name,
      description,
      Image: imagePath,
      industry,
      servicesType,
      client,
      challenges,
      solutions,
      link
    });

    res.json({
      message: "Project updated successfully",
      project
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
    getAllProjects,addProject,
    updateProject
};