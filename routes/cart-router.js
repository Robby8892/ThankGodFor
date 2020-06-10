const express = require('express')
const cartController = require('../Controllers/cartController.js')

const router = express.Router()


router.post('/cart/new', cartController.createCart)

module.exports = router