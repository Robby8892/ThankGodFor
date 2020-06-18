const express = require('express')
const treatController = require('../Controllers/treatController.js')
const multer = require('multer')
const path = require('path')


// const storage = multer.diskStorage({
// 	destination: '../public/uploads',
// 	filename: function(req, file, cb){
// 		cb(null, "Image-" + Date.now() + 
// 			path.extname(file.originalname))
// 	}
// })
const upload = multer({ 
	storage: multer.memoryStorage(),
	limits:{fileSize: 1000000000000000000000},
})

// this will be added to each routet that only the admin can change 
const verifyIfAdmin = require('../lib/verifyIfAdmin.js')

const router = express.Router()

router.get('/treat/:id', treatController.getOneTreat)
router.get('/treat', treatController.getAllTreats)
router.get('/image/treat/:id', treatController.getImgById)

router.post('/treat/new', upload.single('imgOfTreat'), treatController.createTreat)
router.delete('/treat/:id', verifyIfAdmin, treatController.deleteTreat)
router.put('/treat/:id/edit', verifyIfAdmin, treatController.updateTreat)

module.exports = router