require('./src/env');
const config = require('./src/config');

// ref: https://devhints.io/knex
const options = {
  client: config.db.client,
  connection: config.db.url || {
    filename: 'src/data/dev.sqlite3',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/src/migrations`,
  },
  seeds: {
    directory: `${__dirname}/src/seeds`,
  },
  debug: config.db.debug,
  useNullAsDefault: config.db.client === 'sqlite3',
};

if (config.db.client !== 'sqlite3') {
  options.pool = {
    min: 2,
    max: 10,
  };
}

const configs = {
  development: { ...options },
  test: {
    ...options,
    connection: config.db.url || { filename: 'src/data/test.sqlite3' },
  },
  production: {
    ...options,
    connection: config.db.url || { filename: 'src/data/prod.sqlite3' },
  },
};

module.exports = configs[process.env.NODE_ENV];
