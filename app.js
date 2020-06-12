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



// API Routes being used

app.use('/api/v1', cartRouter)



async function figmaFiles() {
	const figmaResponse = await fetch('https://api.figma.com/v1/files/' + process.env.FIGMA_FILE_ID, {
		method: 'GET',
		headers: {
			'X-Figma-Token': process.env.FIGMA_TOKEN
		}
	})

	const figmaFilesJson = await figmaResponse.json()
	console.log(figmaFilesJson.document.children[0].children[0].children);
	
	// I am filtering for all the images with a name that ends with img 
	const figmaPhoto = figmaFilesJson.document.children[0].children[0].children
		.filter(item => item.name[item.name.length - 3] + "" + item.name[item.name.length - 2] + "" + item.name[item.name.length - 1] === 'img')
		.map(photo => {
			return {
				name: photo.name,
				id: photo.id
			}
		})
	

	const ids = figmaPhoto.map(comp => comp.id).join(',')

	const figmaResponseImage = await fetch('https://api.figma.com/v1/images/' + process.env.FIGMA_FILE_ID + '?scale=3&ids=' + ids, {
		method: 'GET',
		headers: {
			'X-Figma-Token': process.env.FIGMA_TOKEN
		}
	})

	const figmaImgJson = await figmaResponseImage.json()

	let figmaImgObj = [];
	
	for( let [key, value] of Object.entries(figmaImgJson.images)) {
		key = 'id'
		figmaImgObj.push(value)
	}

}




app.listen(process.env.PORT
, () => {
	console.log(`${new Date} Server running on port ${process.env.PORT
}`);
})