const express = require('express')
const cartController = require('../Controllers/cartController.js')

const router = express.Router()

const verifyUser = require('../lib/verifyUserLoggedIn.js')
console.log(verifyUser);

router.put('/cart/:cartId/:treatId/edit', verifyUser, cartController.updateCart)
router.get('/cart', cartController.getCart)
router.delete('/cart/:treatId/:cartId', verifyUser, cartController.deleteItemFromCart)
router.delete('/cart/:cartId', verifyUser, cartController.deleteAllItemsFromCart)

module.exports = router