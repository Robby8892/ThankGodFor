const express = require('express')
const cartController = require('../Controllers/cartController.js')

const router = express.Router()


router.post('/cart/new', cartController.createCart)
router.put('/cart/:treatId/edit', cartController.updateCart)
router.get('/cart', cartController.getCart)
router.delete('/cart/:treatId/removeOne', cartController.deleteItemFromCart)
router.delete('/cart/removeAll', cartController.deleteAllItemsFromCart)

module.exports = router