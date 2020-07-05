const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vegan-app', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})

console.log(process.env.MONGODB_URI || 'mongodb://localhost:27017/vegan-app', 'here is my db');

mongoose.connection.on('connected', () => {
	console.log('You\'re connected to the db');
})

mongoose.connection.on('disconnected', () => {
	console.log('You\'re disconnected from the db');
})
mongoose.connection.on('error', (err) => {
	console.log(`Here is the error ${err}`);
})