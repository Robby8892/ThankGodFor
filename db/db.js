const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

console.log(process.env.MONGODB_URI, 'here is my db');

mongoose.connection.on('connected', () => {
	console.log('You\'re connected to the db');
})

mongoose.connection.on('disconnected', () => {
	console.log('You\'re disconnected from the db');
})
mongoose.connection.on('error', (err) => {
	console.log(`Here is the error ${err}`);
})