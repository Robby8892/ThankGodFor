const Cart = require('../models/cart.js')

// when a user makes a request to the home page 
// their cart info will be created and stored in session 
createCart = async (req,res,next) => {
	try {

		const createdCart = await Cart.create()

		res.status(201).json({
			data:createdCart,
			success: true,
			message: 'A new cart has been made',
			status:201
		})

	}catch(){
		next()
	}

	})