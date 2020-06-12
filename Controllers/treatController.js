const Treat = require('../models/treat.js')
const fetch = require('node-fetch')
const Cart = require('../models/cart.js')


const createTreat = async (req,res, error) => {
	try {
		
		// only an admin can create, update, or delete treats from the site
		


	}catch(error){
		console.log(error);
	}

}

module.exports = {
	createTreat
}

