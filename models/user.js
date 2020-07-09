const mongoose = require('mongoose')

const Cart = require('./cart.js')

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	cartId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Cart'
	}
})


const User = mongoose.model('User', userSchema)

module.exports = User