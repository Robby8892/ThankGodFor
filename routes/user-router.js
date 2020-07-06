const express = require('express')
const userController = require('../Controllers/userController.js')

const router = express.Router()

router.post('/user/register', userController.createUser)
router.post('/user/login', userController.loginUser)
router.get('/user/logout', userController.logoutUser)


module.exports = router