require('dotenv').config()
const Admin = require('../models/admin.js')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const shortId = require('shortid')

createAdmin = async (req,res,error) => {
	try {

		const salt = bcrypt.genSaltSync(10)
		const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, salt)
		const hashedToken = bcrypt.hashSync(shortId.generate(), salt)

		const adminObj = {
			loginName: 'MichelleScott',
			password: hashedPassword,
			token: hashedToken
		}

		const newAdmin = new Admin(adminObj)
		
		newAdmin.save().then(() => {
			return res.status(201).json({
				status: 201,
				success: true,
				id: newAdmin._id,
				message: 'Admin created!'
			})
		})

	}catch(error){
		console.log(error);
	}

	}


module.exports = {
	createAdmin
}