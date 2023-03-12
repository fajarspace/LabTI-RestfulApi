const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'GET router success!'
  })
})

router.post('/', (req, res) => {
  res.json({
    message: 'POST users success!'
  })
})

module.exports = router;