const commonConfig = {
  migrations: {
    directory: './migrations'
  },
  useNullAsDefault: true
};

module.exports = {
  development: {
    ...commonConfig,
    client: 'sqlite3',
    connection: {
      filename: './database.sqlite'
    }
  },
  production: {
    ...commonConfig,
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    }
  }
};