const Treat = require('../models/treat.js')
const fetch = require('node-fetch')
const Cart = require('../models/cart.js')


const createTreat = async (req,res, error) => {
	try {
		// I am doing an api call to figma
		// which has all the photos stored
		// I will be updating all the trests with each photo in one full creation


	}catch(error){
		console.log(error);
	}

}

module.exports = {
	createTreat
}

