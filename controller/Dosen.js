const dosenModels = require('../models/dosen')
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

const createNewDosen = async (req, res) => {
  const { body } = req
  try {
    await dosenModels.createNewDosen(body)
    res.json({
      message: 'Create new Dosen success!',
      data: body
    })
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverMessage: error
    })
  }


}

const getAllDosen = async (req, res) => {
  try {
    const [data] = await dosenModels.getAllDosen()
    res.json({
      message: 'GET all Dosen success!',
      data: data
    })
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      serverMessage: error
    })
  }
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