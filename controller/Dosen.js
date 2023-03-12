const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

const dataDummy = {
  idDosen: uuid,
  namaDosen: "Alfiyan",
  nidn: "12345678",
  noTelp: "089637524919"
}

// const getDosenById = (req, res) => {
//   const { id } = req.params
//   console.log(req.body)
//   res.json({
//     message: 'READ success',
//     data: req.body
//   })
// }

const createNewDosen = (req, res) => {
  console.log(req.body);
  res.json({
    message: 'Create new Dosen success!',
    data: req.body
  })
}

const getAllDosen = (req, res) => {
  res.json({
    message: 'GET all Dosen success!',
    data: dataDummy
  })
}

const updateDosen = (req, res) => {
  const { id } = req.params
  console.log('id Dosen:', id)
  res.json({
    message: 'UPDATE success',
    data: req.body
  })
}

const deleteDosen = (req, res) => {
  const { id } = req.params
  console.log('id Dosen:', id)
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
  getAllDosen,
  createNewDosen,
  updateDosen,
  deleteDosen
}