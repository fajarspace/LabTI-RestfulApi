const express = require('express')
const userController = require('../controller/Users')
const router = express.Router()

// CREATE - POST
router.post('/', userController.createNewUsers)

// READ - GET
router.get('/', userController.getAllUsers)

// READ - GET by id
// router.get('/:id', userController.getUserById)

// UPDATE - PATCH
router.patch('/:id', userController.updateUser)

// UPDATE - PATCH
router.delete('/:id', userController.deleteUser)

module.exports = router;