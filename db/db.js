const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/thankGodForVeganTreatsApp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
	console.log('You\'re connected to the db');
})

mongoose.connection.on('disconnected', () => {
	console.log('You\'re disconnected from the db');
})
mongoose.connection.on('error', (err) => {
	console.log(`Here is the error ${err}`);
})