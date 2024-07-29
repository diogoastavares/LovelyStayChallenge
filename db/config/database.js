const config = require('dotenv').config;
const path = require('path');

config({ path: path.resolve(__dirname, '../../.env') });  // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres'
  }
};
