require('dotenv').config()
const Admin = require('../models/admin.js')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const shortId = require('shortid')
const session = require('express-session')

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

	// I will want to add email to admin so that they can reset or change password 

loginAdmin = async (req,res, error) => {
	try {
		const body = req.body

		const findAdmin = await Admin.findOne({loginName: body.loginName})

		if(!findAdmin){
			console.log('Can\'t find admin.');

			return res.json({
				status: 400,
				success: false,
				error: 'Login name was invalid'
			})
		}

		const passwordValidation = bcrypt.compareSync(body.password, findAdmin.password)

		if(passwordValidation){
			console.log('passward is valid!');
			
			
			req.session.admin = true
			req.session.loginName = findAdmin.loginName
			req.session.adminId = findAdmin.adminId

			console.log(req.session.admin, 'here is admin');

			return res.status(201).json({
				status: 201,
				loginName: findAdmin.loginName,
				id: findAdmin._id,
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

	// logout route 




	// I will need an update admin route where a reset password 
	// request can be made to then update the password, and also 
	// change the token 

	// updateAdmin = async(req, res, next)


module.exports = {
	createAdmin,
	loginAdmin
}