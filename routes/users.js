const express = require('express')
const userController = require('../controller/Users')
const router = express.Router()

// READ - GET
router.get('/', userController.getAllUsers)

// CREATE - POST
router.post('/', userController.createNewUsers)

module.exports = router;