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
		

		const updatedCart = await Cart.findById(req.params.cartId)
		const foundTreat = await Treat.findById(req.params.treatId)
		// if the treat already has a cartId for the user then we should only
		// update the quantity
		if(foundTreat.cartId == req.params.cartId){
			foundTreat.quantity = Number(req.body.data)
			foundTreat.save()

			return res.status(201).json({
				data: foundTreat,
				success: true,
				status: 201,
				messsage: 'You have updated the quantity.'
			})
		} else {
			foundTreat.cartId = req.params.cartId
			foundTreat.inCart = true 
			foundTreat.quantity = req.body.data
			updatedCart.treatsInCart.push(foundTreat)
			updatedCart.save()
			foundTreat.save()



			res.status(200).json({
				data: foundTreat, 
				success: true,
				status: 200,
				messsage: 'You haved added a new item to your cart.'
			})	

		}

	}catch(error){
		console.log(error);
	}

}

// if there is a login for a user then this will be more valuable
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
		console.log(req.params, 'here is req');
		const usersCart = await Cart.findById(req.params.cartId)
		// usersCart.treatsInCart.id(req.params.treatId).remove()
		console.log(usersCart);

		await usersCart.save()
		res.status(200).json({
			data: usersCart,
			success: true,
			messsage: 'Here is the updated cart after removing the treat.'
		})

	}catch(error){
		console.log(error);
	}

}

deleteAllItemsFromCart = async (req,res,error) => {
	try {
		// I want to remove a single item from the cart,
		// then that item should no longer have the card id on it
		const deleteAllFromCart = await Cart.updateMany({$pull:{'treatsInCart': {'cartId': req.params.cartId}}})
		const updatedCart = await Cart.findById(res.locals.cartId)
		updatedCart.clearCart = true

		res.status(200).json({
			data: updatedCart,
			deletedItems: deleteAllFromCart,
			success: true,
			messsage: 'All items from the cart have been deleted.'
		})

	}catch(error){
		console.log(error);
	}

	}



module.exports = {
	createCart,
	updateCart,
	getCart,
	deleteItemFromCart,
	deleteAllItemsFromCart
}