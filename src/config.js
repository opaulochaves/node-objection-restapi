if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

module.exports = {
  db: {
    client: process.env.DB_CLIENT || 'pg',
    url: process.env.DATABASE_URL || 'postgres://localhost:5432/dbname_dev',
    debug: process.env.DATABASE_DEBUG === 'true',
  },
};
