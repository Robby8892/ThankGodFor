const mongoose = require('mongoose')

const Treat = require('./treat.js')
// a cart is always created when a user opens the site, 
// and eventually I would want this to stay this way until either
// the user destorys history or empties their cart
// that way the page could always maintain the cart contents 

const cartSchema = mongoose.Schema({
	checkout: {
		type: Boolean,
		default: false
	},

	clearCart: {
		type: Boolean,
		default: false
	},
	// i will need a model for treats that go into the cart that 
	// are then referenced in here with a unique id 
	treatsInCart: [Treat.schema]
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart