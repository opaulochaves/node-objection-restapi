const path = require('path');

const env = process.env.NODE_ENV ?? 'development';

try {
  const envPath = path.resolve(__dirname, '..', `.env.${env}`);
  require('dotenv').config({ path: envPath });
} catch (error) {
  console.error(error);
}
