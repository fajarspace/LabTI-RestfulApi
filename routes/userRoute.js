const express = require('express')
const dosenController = require('../controller/dosen')
const router = express.Router()

// CREATE - POST
router.post('/', dosenController.createNewDosen)

// READ - GET
router.get('/', dosenController.getAllDosen)

// READ - GET by id
// router.get('/:id', dosenController.getDosenById)

// UPDATE - PATCH
router.patch('/:id', dosenController.updateDosen)

// UPDATE - PATCH
router.delete('/:id', dosenController.deleteDosen)

module.exports = router;