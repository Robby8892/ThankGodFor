const mongoose = require('mongoose')

const treatSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	}
})

const Treat = mongoose.model('Treat', treatSchema)

module.exports = Treat 