require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'delivery_db',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'delivery_db',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
