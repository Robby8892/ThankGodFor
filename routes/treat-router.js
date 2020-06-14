const express = require('express')
const treatController = require('../Controllers/treatController.js')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage})


const router = express.Router()

const verifyIfAdmin = require('../lib/verifyIfAdmin.js')

router.post('/treat/new', upload.single('imgOfTreat'), treatController.createTreat)
router.delete('/treat/:id', treatController.deleteTreat)

module.exports = router