const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
	checkout: {
		type: Boolean,
		default: false
	},

	clearCart: {
		type: Boolean,
		default: false
	}
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart