const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'DanteRaz##2024*',
  database: 'Palestra',
});

async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

module.exports = { query };
