import { Sequelize } from 'sequelize'
import userModel from "./userModel.js";
import db from "../database/config.js";

const { DataTypes } = Sequelize;
const jadwalModel = db.define('jadwal', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  dosen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  asisten1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  asisten2: {
    type: DataTypes.STRING,
    allowNull: false
  },
  hari: {
    type: DataTypes.STRING,
    allowNull: false
  },
  jam: {
    type: DataTypes.STRING,
    allowNull: false
  },
  kelas: {
    type: DataTypes.STRING,
    allowNull: false
  },
  praktikum: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
}, {
  freezeTableName: true
});

userModel.hasMany(jadwalModel);
jadwalModel.belongsTo(userModel, { foreignKey: 'userId' })

export default jadwalModel;

