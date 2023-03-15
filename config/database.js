import { Sequelize } from "sequelize";

const db = new Sequelize('elab', 'root', '', {
  host: "localhost",
  dialect: "mysql"
});

export default db;