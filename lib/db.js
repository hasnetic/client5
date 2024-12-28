// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize ({
//   host:"localhost",
//   usernam:"root",
//   password:"1212",
//   database:"db_role1",
//   dialect:"mysql",
//   dialectModule: require("mysql2"),
//   benchmark: true


// });
// export default sequelize;


import { Sequelize } from 'sequelize';
import { databaseConfig } from '../config/database';

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect,
    dialectModule: require('mysql2'),
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true 
    }
  }
);

export const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync({ alter: true }); 
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;