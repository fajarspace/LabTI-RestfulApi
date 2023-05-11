import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";

const { DataTypes } = Sequelize;
const KelasModel = db.define(
  "kelas",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    programStudi: {
      type: DataTypes.STRING,
    },
    angkatan: {
      type: DataTypes.STRING,
    },
    kelas: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
UserModel.hasMany(KelasModel);
KelasModel.belongsTo(UserModel, { foreignKey: "userId" });

export default KelasModel;
