const dataDummy = {
  id: 1,
  nama: "Fajar Agung",
  nim: "312010448",
  kelas: "TI.20.A.3"
}

// const getUserById = (req, res) => {
//   const { id } = req.params
//   console.log(req.body)
//   res.json({
//     message: 'READ success',
//     data: req.body
//   })
// }

const createNewUsers = (req, res) => {
  console.log(req.body);
  res.json({
    message: 'Create new users success!',
    data: req.body
  })
}

const getAllUsers = (req, res) => {
  res.json({
    message: 'GET all users success!',
    data: dataDummy
  })
}

const updateUser = (req, res) => {
  const { id } = req.params
  console.log('id user:', id)
  res.json({
    message: 'UPDATE success',
    data: req.body
  })
}

const deleteUser = (req, res) => {
  const { id } = req.params
  console.log('id user:', id)
  res.json({
    message: 'DELETE success',
    data: {
      id: id,
      nama: 'fajar',
      nim: '312010448',
      kelas: 'A1'
    }
  })
}

module.exports = {
  getAllUsers,
  createNewUsers,
  updateUser,
  deleteUser
}