const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DataBase_name,     
  process.env.DataBase_user,     
  process.env.DataBase_password, 
  {
    host: process.env.DataBase_host,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, 
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('MySQL connected successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect:', err);
  });

module.exports = sequelize;