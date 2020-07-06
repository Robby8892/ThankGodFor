const express = require('express')
const userController = require('../Controllers/userController.js')

const router = express.Router()

router.post('/user/new', userController.createUser)


module.exports = router