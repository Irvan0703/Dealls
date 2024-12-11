import { Sequelize } from 'sequelize';
const { dbHost,dbPass,dbUser,dbName } = require('../app/config');

const sequelize = new Sequelize(dbName!, dbUser!, dbPass!, {
  host: dbHost,
  dialect: 'mysql',
});

export default sequelize;