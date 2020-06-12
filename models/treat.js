const mongoose = require('mongoose')

const Cart = require('./cart.js')

const treatSchema = mongoose.Schema({
	name: {
		type: String,
		default: ''
	},

	img: {
		type: String
	},

	price: {
		type: Number,
		default: 0
	},
	// when in cart is true the treat will be added to the 
	// carts contents 
	inCart: {
		type: Boolean,
		default: false
	},
	// every item will have a cart id defaulted as null 
	// amd this will change when it is in the cart
	// this will make it easier to delete the item 
	// from the cart or items 
	cartId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Cart',
		default: null 
	}
})

const Treat = mongoose.model('Treat', treatSchema)

module.exports = Treat 