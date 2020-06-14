const Treat = require('../models/treat.js')
const fetch = require('node-fetch')
const Cart = require('../models/cart.js')



const createTreat = async (req,res, error) => {
	try {
		
		// only an admin can create, update, or delete treats from the site
		const newTreat = req.body

		const createdTreat = await Treat.create(newTreat)

		res.status(201).json({
			data: createdTreat,
			success: true,
			message: 'You have successfully created a new treat',
			status: 201
		})

	}catch(error){
		console.log(error);
	}

}

module.exports = {
	createTreat
}
