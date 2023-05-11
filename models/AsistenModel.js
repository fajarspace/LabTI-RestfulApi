import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";

const { DataTypes } = Sequelize;
const AsistenModel = db.define(
  "asisten",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    asisten: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

UserModel.hasMany(AsistenModel);
AsistenModel.belongsTo(UserModel, { foreignKey: "userId" });
export default AsistenModel;
