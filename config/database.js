const mysql = require('mysql2');

// konek ke db
const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'elab'
});

module.exports = dbPool.promise();