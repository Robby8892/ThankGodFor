require('dotenv').config()
require('./db/db.js')
const express = require('express')
const app = express()
const session = require('express-session')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const fileStore = require('session-file-store')(session)
const fileStoreOptions = {}
const cors = require('cors')

app.use(bodyParser.urlencoded({ 
	extended: false 
}))

app.use(bodyParser.json())

const corsOptions = {
	origin: [process.env.URL, 'http://localhost:3000'],
	credentials: true,
	optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false, 
	saveUninitialized: false,
	httpOnly: false,
	store: new fileStore({
		path: '.server/sessions'
	}),
	cookie: {
		maxAge: 6 * 60 * 1000 * 30
	}
}))



// session will be created when the first http request is made
// and session will be destoryed anytime the cart is cleared 
// either from the user clearing the cart, or the user making their checkout 



// test route 


app.get('/test', (req,res)=>{

	res.send('Test route works')
})

// routes for API

const cartRouter = require('./routes/cart-router.js')
const treatRouter = require('./routes/treat-router.js')
const adminRouter = require('./routes/admin-router.js')
const userRouter = require('./routes/user-router.js')

// here I will setup res.locals 

app.use((req, res, next) => {
	if(req.session.admin){
		console.log('i should see locals of admin', res.locals);
		res.locals.adminId = req.session.adminId
		res.locals.loginName = req.session.loginName
		
	} if(req.session.cart){
		res.locals.cartId = req.session.cartId
	} else {
		res.locals.adminId = false
		res.locals.loginName = false
		res.locals.cartId = false
	}
	next()
})

app.use((req, res, next) => {
	if(req.session.user){
		res.locals.userId = req.session.userId
		res.locals.email = req.session.email
		res.locals.user = true 
		console.log('i should see locals of user', res.locals);
		
	} else {
		res.locals.userId = false
		res.locals.email = false

	}
	next()
})


console.log('here you are in heroku');

// API Routes being used

app.use('/api/v1', cartRouter)
app.use('/api/v1', treatRouter)
app.use('/api/v1', adminRouter)
app.use('/api/v1', userRouter)


app.listen(process.env.PORT || 3333,
 	() => {
		console.log(`${new Date} Server running on port ${process.env.PORT||3333
	}`);
})