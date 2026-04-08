const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { link } = require('../routes/positionsRoute');

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description_ar: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Image: {
    type: DataTypes.STRING, 
    allowNull: true
  },
  industry:{
    type: DataTypes.STRING,
    allowNull: true
  },
  servicesType:{
    type: DataTypes.STRING,
    allowNull: true
  },
  client:{
    type: DataTypes.STRING,
    allowNull: true
  },
  challenges:{
    type: DataTypes.TEXT,
    allowNull: true
  },
  solutions:{
    type: DataTypes.TEXT,
    allowNull: true
  },
  link:{
    type: DataTypes.STRING,
    allowNull: true
  }
}, { timestamps: true });

module.exports = Project;