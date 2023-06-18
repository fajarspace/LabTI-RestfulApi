const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");
const UserModel = require("./UserModel.js");

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

module.exports = KelasModel;
