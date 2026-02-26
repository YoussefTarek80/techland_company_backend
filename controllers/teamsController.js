const teamsModel = require('../models/teamModel');
const fs = require('fs');
const path = require('path');

const getAllTeams = async (req, res) => {
    try {
        const teams = await teamsModel.findAll();
        res.json(teams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addTeam = async (req, res) => {
    try {
        const teamExists = await teamsModel.findOne({ where: { email: req.body.email } });
        if (teamExists) {
            if (req.file) {
                fs.unlink(path.join(__dirname, '../uploads', req.file.filename), (err) => {
                    if (err) console.error('Error deleting file:', err);
                });
            }
            return res.status(400).json({ error: 'Engineer already exists' });
        }

        const teamData = {
            name: req.body.name,
            email: req.body.email,
            positionId: req.body.positionId,
            Image: req.file ? `${process.env.url}/uploads/${req.file.filename}` : null
        };

        const team = await teamsModel.create(teamData);
        res.json(team);
    } catch (error) {
        console.error(error);
        if (req.file) {
            fs.unlink(path.join(__dirname, '../uploads', req.file.filename), (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = {
    getAllTeams,
    addTeam
};