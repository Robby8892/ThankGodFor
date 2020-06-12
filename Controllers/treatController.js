const Treat = require('../models/treat.js')
const Cart = require('../models/cart.js')


const createTreat = async (req,res,next) => {
	try {
		// I am doing an api call to figma
		// which has all the photos stored
		// I will be updating all the trests with each photo in one full creation
		let newTreat;

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
			// so I can get the ids to do another fetch call to figma to obtain
			// the photos
			const figmaPhoto = figmaFilesJson.document.children[0].children[0].children
				.filter(item => item.name[item.name.length - 3] + "" + item.name[item.name.length - 2] + "" + item.name[item.name.length - 1] === 'img')
				.map(photo => {
					return {
						name: photo.name,
						id: photo.id
					}
				})
			

			const ids = figmaPhoto.map(comp => comp.id).join(',')
			// here are all the photos from figma
			const figmaResponseImage = await fetch('https://api.figma.com/v1/images/' + process.env.FIGMA_FILE_ID + '?scale=3&ids=' + ids, {
				method: 'GET',
				headers: {
					'X-Figma-Token': process.env.FIGMA_TOKEN
				}
			})

			const figmaImgJson = await figmaResponseImage.json()
			// I am doing object entries to get the value 
			// from the fimgmaImgJson 
			for( let [key, value] of Object.entries(figmaImgJson.images)) {
				key = 'id'
				newTreat = {
					img: value 
				}
			}

		}

		console.log(newTreat);


	}catch(){
		next()
	}

}

module.exports = {
	createTreat
}