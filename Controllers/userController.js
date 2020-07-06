const session = require('express-session')
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
				message: 'Admin created!'
			})
		})

	}catch(error){
		console.log(error);
	}

	}