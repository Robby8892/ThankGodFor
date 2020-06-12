const mongoose = require('mongoose')
const shortId = require('shortid')

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
		default: shortId.generate()
	}
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin