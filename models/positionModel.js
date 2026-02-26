const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Position = sequelize.define('Position', {
  title: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { timestamps: true });

module.exports = Position;