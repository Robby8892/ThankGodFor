const Treat = require('../models/treat.js')
const fetch = require('node-fetch')
const Cart = require('../models/cart.js')
const FormData = require('form-data')

const form = new FormData()
console.log(form);


createTreat = async (req,res, error) => {
	// try {
		
		// only an admin can create, update, or delete treats from the site
		const newTreat = req.body
		console.log(newTreat.price, 'data?');
		console.log(req.file, 'here is the file');

	// 	console.log('here is req.body', newTreat);
	// 	const treatExists = await Treat.find({name: req.body.name})
	// 	console.log('here is treatExists', treatExists);
		
	// 	if(treatExists.length > 0){
	// 		return res.status(400).json({
	// 			success: false,
	// 			error: 'This treat already exists'
	// 		})
	// 	} else {

 // 		console.log(newTreat);
	// 	const createdTreat = await Treat.create(newTreat)

	// 	res.status(200).json({
	// 		data: createdTreat,
	// 		success: true,
	// 		message: 'You have successfully created a new treat.',
	// 		status: 200
	// 	})
	// }
	// }catch(error){
	// 	console.log(error);
	// }
}

deleteTreat = async (req,res,error) => {
	try {
		const treatToDelete = await Treat.findByIdAndRemove(req.params.id)

		if(!treatToDelete){
			return res.status(400).json({
				data: {},
				success: false,
				error: 'No id matches the one provide to delete.'
			})
		} else {

			res.status(200).json({
				data: {},
				success: true,
				message: 'You have deleted the treat.'
			})
		}

	}catch(error){
		console.log(error);
	}
}

updateTreat = async (req,res,error) => {
	try {
		const treatToUpdate = await Treat.findByIdAndUpdate(req.params.id, req.body)

		if(!treatToUpdate){
			return res.status(400).json({
				data: {},
				success: false,
				error: 'No id matches the one provided.'
			})
		} else {
			res.status(201).json({
				data: treatToUpdate,
				success: true,
				message: 'You have successfully updated the treat.'
			})
		}

	}catch(error){
		console.log(error);
	}

	}

getOneTreat = async (req,res,error) => {
	try {
		const foundTreat = await Treat.find({_id: req.params.id})

		if(!foundTreat){
			return res.status(400).json({
				data: {},
				success: false,
				error: 'No id matches the one provided.'
			})
		} else {
			res.status(200).json({
				data: foundTreat,
				success: true,
				message: 'Here is the treat by the id provided.'
			})
		}
	}catch(error){
		console.log(error);
	}

}

getAllTreats = async (req,res,error) => {
	try {
		const foundTreat = await Treat.find()

		res.status(200).json({
			data: foundTreat,
			success: true,
			message: 'Here are all the treats in the database.'
		})

	}catch(error){
		console.log(error);
	}

}


module.exports = {
	createTreat,
	deleteTreat,
	updateTreat,
	getOneTreat,
	getAllTreats
}
