const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
	loginName: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true
	}
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin