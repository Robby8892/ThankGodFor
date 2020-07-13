const Cart = require('../models/cart.js')
const session = require('express-session')
const Treat = require('../models/treat.js')
const User = require('../models/user.js')



updateCart = async (req,res,error) => {
	try {
		

		const updatedCart = await Cart.findById(req.params.cartId)
		const foundTreat = await Treat.findById(req.params.treatId)
		// if the treat already has a cartId for the user then we should only
		// update the quantity
		if(foundTreat.cartId == req.params.cartId){
			console.log('here is req.body.data', req.body.data);
			foundTreat.quantity = Number(req.body.data)
			foundTreat.save()

			return res.status(201).json({
				data: foundTreat,
				success: true,
				status: 201,
				messsage: 'You have updated the quantity.'
			})
		} else {
			console.log('are you here?');
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
		const findUser = await User.findById(req.session.userId).populate('cartId');
		console.log(findUser);
		res.status(200).json({
			data: 'pending',
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
		console.log(res);
		const usersCart = await Cart.findById(req.params.cartId)
		usersCart.treatsInCart.id(req.params.treatId).remove()
		const findTreatById = await Treat.findById(req.params.treatId)
		findTreatById.cartId = null

		await findTreatById.save()
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
		console.log(res);
		console.log('made it here', req.params.cartId);
		const deleteAllFromCart = await Cart.updateMany({$pull:{'treatsInCart': {'cartId': req.params.cartId}}})
		const updatedCart = await Cart.findById(req.params.cartId)
		updatedCart.clearCart = true
		console.log('here is deleteAllFromCart', deleteAllFromCart);
		console.log('here is updatedCart', updatedCart);
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
	updateCart,
	getCart,
	deleteItemFromCart,
	deleteAllItemsFromCart
}