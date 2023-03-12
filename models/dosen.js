const dbPool = require('../config/database')

const getAllDosen = () => {
  const SqlQuery = ('SELECT * FROM dosen')
  return dbPool.execute(SqlQuery)
}

module.exports = { getAllDosen };