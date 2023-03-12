const getAllUsers = (req, res) => {
  const dataDummy = {
    nama: "Fajar Agung",
    nim: "312010448",
    kelas: "TI.20.A.3"
  }
  res.json({
    message: 'GET all users success!',
    data: dataDummy
  })
}

const createNewUsers = (req, res) => {
  console.log(req.body);
  res.json({
    message: 'Create new users success!',
    data: req.body
  })
}

module.exports = {
  getAllUsers,
  createNewUsers
}