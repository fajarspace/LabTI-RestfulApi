import { Sequelize } from 'sequelize'
import Users from "./userModel";
const db = require('../config/database')

const { DataTypes } = Sequelize
const Jadwal = db.define('jadwal', {
  id: {
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
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
}, {
  freezeTableName: true
})

Users.hasMany(Jadwal)
Jadwal.belongTo(Users, { foreignKey: 'UserId' })

export default Jadwal;

