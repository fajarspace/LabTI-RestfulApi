import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import UserModel from "./UserModel.js";

const {DataTypes} = Sequelize;

const JadwalLingkunganModel = db.define('jadwallingkungan',{
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
      type: DataTypes.STRING,
      validate: {
          notEmpty: true
        }
    },
    hari : {
      type: DataTypes.STRING,
      validate: {
          notEmpty: true
        }
    },
    waktu : {
      type: DataTypes.STRING
    },
    ruang : {
      type: DataTypes.STRING
    },
    dosen : {
      type: DataTypes.STRING,
      validate: {
          notEmpty: true
        }
    },
    asisten1 : {
      type: DataTypes.STRING,
      validate: {
          notEmpty: true
        }
    },
    asisten2 : DataTypes.STRING,
    praktikum : DataTypes.STRING,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      }
},{
    freezeTableName:true
});

UserModel.hasMany(JadwalLingkunganModel);
JadwalLingkunganModel.belongsTo(UserModel, { foreignKey: 'userId' })
// (async()=>{
//     await db.sync();
// })();
export default JadwalLingkunganModel;

