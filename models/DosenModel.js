import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";

const { DataTypes } = Sequelize;
const DosenModel = db.define(
  "dosen",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    dosen: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
UserModel.hasMany(DosenModel);
DosenModel.belongsTo(UserModel, { foreignKey: "userId" });

export default DosenModel;
