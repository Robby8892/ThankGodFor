const session = require('express-session')
const bcrypt = require('bcrypt')
const shortId = require('shortid')
const User = require('../models/user.js')




createUser = async (req,res,error) => {
	try {

		const salt = bcrypt.genSaltSync(10)
		const hashedPassword = bcrypt.hashSync(req.body.password, salt)
		const hashedToken = bcrypt.hashSync(shortId.generate(), salt)

		const newUserObj = {
			email: req.body.email,
			password: hashedPassword,
			token: hashedToken
		}

		const newUser = new User(newUserObj)
		
		newUser.save().then(() => {
			return res.status(201).json({
				status: 201,
				success: true,
				id: newUser._id,
				message: 'User created!'
			})
		})

	}catch(error){
		console.log(error);
	}

}



loginUser= async (req,res, error) => {
	try {
	
		const body = req.body.data || req.body
		console.log('here is req.body', req.body);
		const findUser = await User.findOne({email: body.email})
		console.log(findUser, 'here is the foundUser');

		if(!findUser){
			console.log('Can\'t find user.');

			return res.json({
				status: 400,
				success: false,
				error: 'Login name was invalid'
			})
		}

		const passwordValidation = bcrypt.compareSync(body.password, findUser.password)

		if(passwordValidation){
			console.log('passward is valid!');

			req.session.user = true
			req.session.email = findUser.email
			req.session.userId = findUser._id

			return res.status(200).json({
				status: 200,
				email: req.session.email,
				id: req.session.userId,
				success: true
			})



		} else {
			console.log('password is invalid.');
			return res.json({
				status: 400,
				success: false,
				error: 'Invalid password.'
			})
		}
	}catch(error){
		console.log(error);
	}

}


logoutUser = async (req,res,error) => {
	try {
		if(!req.session.loginName){
			return res.status(400).json({
				status: 400,
				success: false,
				error: 'You need to be logged in to logout.'
			})
		} else {

			await req.session.destroy()

			return res.status(200).json({
				data: {},
				success: true,
				status: 200,
				message: 'You are succesfully logged out'
			})
		}


	}catch(error){
		console.log('error');
	}

	}




module.exports = {
	createUser,
	loginUser
}
