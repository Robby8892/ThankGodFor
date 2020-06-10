require('dotenv').config()

const express = require('express')
const app = express()
const session = require('express-session')

port = process.env.PORT


app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false, 
	saveUninitialized: true
}))



// session will be created when the first http request is made
// and session will be destoryed anytime the cart is cleared 
// either from the user clearing the cart, or the user making their checkout 

app.use((req, res, next) => {

})







// routes for API

const cartRouter = require('./routes/cart-router.js')



// API Routes being used

api.use('/api/v1', cartRouter)





























app.listen(port, () => {
	console.log(`Server running on port ${port}`);
})