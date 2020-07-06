const express = require('express')
const userController = require('../Controllers/userController.js')

const router = express.Router()

router.post('/user/register', userController.createUser)
router.post('/user/login', userController.loginUser)


module.exports = router