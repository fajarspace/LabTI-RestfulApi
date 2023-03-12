const express = require('express')
const userController = require('../controller/Users')
const router = express.Router()

router.get('/', userController.getAllUsers)
router.post('/', userController.createNewUsers)

module.exports = router;