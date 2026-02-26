const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Image: {
    type: DataTypes.STRING, 
    allowNull: true
  }
}, { timestamps: true });

module.exports = Project;