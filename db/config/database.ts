import { config } from 'dotenv';

config();  // Load environment variables from .env file

export default {
  development: {
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres'
  }
};
