const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Add SSL config if needed in production
});
module.exports = { query: (text, params) => pool.query(text, params), pool };