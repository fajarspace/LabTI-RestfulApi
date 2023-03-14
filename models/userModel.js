import { Sequelize } from 'sequelize'
const db = require('../config/database')

const { DataTypes } = Sequelize
const Users = db.define('users', {}, {
  freezeTableName: true
})

export default Users

