const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Feedbacks = sequelize.define('feedbacks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },

    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    company_position: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    timestamps: true
});

module.exports = Feedbacks;