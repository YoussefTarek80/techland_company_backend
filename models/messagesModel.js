const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Message = sequelize.define('Message', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bussinessEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: false
    },
    message:{
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {timestamps: true,  charset: 'utf8',
  collate: 'utf8_general_ci'});

module.exports = Message;