const dotenv = require('dotenv');

dotenv.config();

/* eslint no-param-reassign: 0 */
/* eslint camelcase: 0 */
/* eslint no-unused-vars: 0 */


module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV,
    host: process.env.DB_HOST,
    dialect: 'mssql',
    operatorsAliases: false,
    logging: false,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    logging: false,
    ssl: true,
    dialect: 'mysql',
    operatorsAliases: false,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
  heroku: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    ssl: true,
    logging: false,
    operatorsAliases: false,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
  },
  e2e: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_E2E,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false,
  },
};
