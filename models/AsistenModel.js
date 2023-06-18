const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");
const UserModel = require("./UserModel.js");

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
module.exports = AsistenModel;
