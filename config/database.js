// import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();


// const db = new Sequelize(process.env.MYSQL_ADDON_DB, process.env.MYSQL_ADDON_USER, process.env.DB_MYSQL_ADDON_PASSWORD, {
//   host: process.env.MYSQL_ADDON_HOST,
//   dialect: "mysql"
// });

// export default db;

import { Sequelize } from "sequelize";
const db = new Sequelize(process.env.CLEVERCLOUD_MYSQL_DB, process.env.CLEVERCLOUD_MYSQL_USER, process.env.CLEVERCLOUD_MYSQL_PASSWORD, {
  host: process.env.CLEVERCLOUD_MYSQL_HOST,
  dialect: "mysql"
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default db;
