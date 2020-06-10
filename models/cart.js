const mongoose = require('mongoose')
const Cart = require('./cart')

const cartSchema = mongoose.Schema({
	id: {
		type: String,
		required: true
	},

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