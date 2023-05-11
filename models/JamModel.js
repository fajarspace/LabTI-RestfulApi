import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";

const { DataTypes } = Sequelize;
const JamModel = db.define(
  "jam",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    jam: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
UserModel.hasMany(JamModel);
JamModel.belongsTo(UserModel, { foreignKey: "userId" });

export default JamModel;
