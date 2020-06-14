const Cart = require('../models/cart.js')
const session = require('express-session')
const Treat = require('../models/treat.js')

// when a user makes a request to the home page 
// their cart info will be created and stored in session 

createCart = async(req, res, error) => {
	try{

		const newCart = {
			checkout: false,
			clearCart: false
		}
		const createdCart = await Cart.create(newCart)

		// when a new cart is made then I want to set the session 
		// id to the id of the that new cart 
		// when a checkout is made to false, or clearcart is made
		// to false then I want to delete the contents of the cart 
		req.session.cartId = createdCart._id
		res.status(200).json({
			data:createdCart,
			success: true,
			message: 'A new cart has been made.',
		})


	}catch(error){
		console.log(error);
	}
}


updateCart = async (req,res,error) => {
	try {
		const treatAddedToCart = {
			treatsInCart: [req.params.id]
		}

		const updatedCart = await Cart.findByIdAndUpdate(req.session.cartId, treatAddedToCart)

		res.status(200).json({
			data: updatedCart, 
			success: true,
			messsage: 'You haved added a new item to your cart.'
		})	

	}catch(error){
		console.log(error);
	}

	}


module.exports = {
	createCart,
	updateCart
}