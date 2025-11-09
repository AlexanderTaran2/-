const knex = require('knex');

// Для production на Railway
const config = process.env.DATABASE_URL ? {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './migrations'
  },
  pool: {
    min: 2,
    max: 10
  }
} : require('../knexfile').development;

const db = knex(config);

module.exports = db;