import { Sequelize } from 'sequelize'
import userModel from "./userModel.js";
import db from "../config/Database.js";

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
  tanggal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  waktu: {
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

