const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Position = require('./positionModel');

const Team = sequelize.define('Team', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  Image: { type: DataTypes.STRING, allowNull: true },
  positionId: { 
    type: DataTypes.INTEGER,
    references: {
      model: Position,
      key: 'id'
    },
    allowNull: false
  }
}, { timestamps: true });

module.exports = Team;