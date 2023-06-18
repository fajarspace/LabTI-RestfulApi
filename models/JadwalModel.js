const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/Database.js");
const UserModel = require("./UserModel.js");

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

// Uncomment the following lines if you want to sync the database
// ;(async()=>{
//     await db.sync();
// })();

module.exports = JadwalModel;
