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
		req.session.cart = true 
		req.session.save()
		
		res.status(200).json({
			data:req.session.cartId,
			success: true,
			message: 'A new cart has been made.',
		})


	}catch(error){
		console.log(error);
	}
}


updateCart = async (req,res,error) => {
	try {

		
		const updatedCart = await Cart.findById(res.locals.cartId)
		const foundTreat = await Treat.findById(req.params.treatId)
		foundTreat.cartId = res.locals.cartId
		foundTreat.inCart = true 
		updatedCart.treatsInCart.push(foundTreat)


		await updatedCart.save()


		res.status(200).json({
			data: updatedCart, 
			success: true,
			messsage: 'You haved added a new item to your cart.'
		})	

	}catch(error){
		console.log(error);
	}

}

getCart = async (req,res,error) => {
	try {
		const getUserCart = await Cart.findById(res.locals.cartId)

		res.status(200).json({
			data: getUserCart,
			success: true,
			messsage: 'Here is the users cart.'
		})
	}catch(error){
		console.log(error);
	}

}

// I will need a delete route for individual items within the cart,
/// and I will need a delete route that will clear the cart, and then create a new cart
// Lastly I will need a checkout route that will clear the cart after checkout, I might be able
// to just use my clear cart query to solve this 

deleteItemFromCart = async (req,res,error) => {
	try {
		const usersCart = await Cart.findById(res.locals.cartId)
		usersCart.treatsInCart.id(req.params.treatId).remove()

		await usersCart.save()
		console.log('here is the updated cart', usersCart);
		res.status(200).json({
			data: usersCart,
			success: true,
			messsage: 'Here is the updated cart after removing the treat.'
		})

	}catch(error){
		console.log(error);
	}

	}



module.exports = {
	createCart,
	updateCart,
	getCart,
	deleteItemFromCart
}