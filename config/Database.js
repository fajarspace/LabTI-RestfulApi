import {Sequelize} from "sequelize";
import dotenv from "dotenv"

dotenv.config();

const db = new Sequelize(process.env.MYSQL_ADDON_DB,process.env.MYSQL_ADDON_USER,process.env.MYSQL_ADDON_PASSWORD,{
    host: process.env.MYSQL_ADDON_HOST,
    dialect: 'mysql'
});

export default db;