const mysql = require('mysql2');
import { Sequelize } from 'sequelize'

// konek ke db
// const dbPool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

const db = new Sequelize('elab', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

export default db;