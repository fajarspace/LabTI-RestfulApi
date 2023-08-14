const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");
const UserModel = require("./UserModel.js");

const PraktikumModel = db.define(
  "praktikum",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    praktikum: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

UserModel.hasMany(PraktikumModel);
PraktikumModel.belongsTo(UserModel, { foreignKey: "userId" });

module.exports = PraktikumModel;
