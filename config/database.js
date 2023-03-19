import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

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
