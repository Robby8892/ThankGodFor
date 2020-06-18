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
			token: hashedToken,
			email: process.env.EMAIL
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
	
		const body = req.body.data || req.body

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
			req.session.adminId = findAdmin._id

			return res.status(200).json({
				status: 200,
				loginName: req.session.loginName,
				id: req.session.adminId,
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


logoutAdmin = async (req,res,error) => {
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




	// I will need an update admin route where a reset password 
	// request can be made to then update the password, and also 
	// change the token 

	// updateAdmin = async(req, res, next)


module.exports = {
	createAdmin,
	loginAdmin,
	logoutAdmin
}