import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";

const { DataTypes } = Sequelize;

const JadwalModel = db.define('jadwal', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  programStudi: {
    type: DataTypes.STRING
  },
  kelas: {
    type: DataTypes.STRING
  },
  hari: {
    type: DataTypes.STRING
  },
  waktu: {
    type: DataTypes.STRING
  },
  ruang: {
    type: DataTypes.STRING
  },
  dosen: {
    type: DataTypes.STRING
  },
  asisten1: {
    type: DataTypes.STRING
  },
  asisten2: DataTypes.STRING,
  praktikum: DataTypes.STRING,
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

UserModel.hasMany(JadwalModel);
JadwalModel.belongsTo(UserModel, { foreignKey: 'userId' })
// (async()=>{
//     await db.sync();
// })();
export default JadwalModel;

