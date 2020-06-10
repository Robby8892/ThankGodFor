const mongoose = require('mongoose')

const Treat = require('./treat.js')

const cartSchema = mongoose.Schema({
	checkout: {
		type: Boolean,
		default: false
	},

	clearCart: {
		type: Boolean,
		default: false
	}
	// i will need a model for contents that go into the cart that 
	// are then referenced in here with a unique id 
	contentsOfCart: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Treat'
	}
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart