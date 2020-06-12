require('dotenv').config()
require('./db/db.js')
const express = require('express')
const app = express()
const session = require('express-session')
const fetch = require('node-fetch')

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false, 
	saveUninitialized: true
}))



// session will be created when the first http request is made
// and session will be destoryed anytime the cart is cleared 
// either from the user clearing the cart, or the user making their checkout 



// test route 


app.get('/', (req,res)=>{

	res.send('Test route works')
})

// routes for API



const cartRouter = require('./routes/cart-router.js')
const treatRouter = require('./routes/treat-router.js')

// API Routes being used

app.use('/api/v1', cartRouter)
app.use('/api/v1', treatRouter)



app.listen(process.env.PORT
, () => {
	console.log(`${new Date} Server running on port ${process.env.PORT
}`);
})