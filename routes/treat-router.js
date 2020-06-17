const express = require('express')
const treatController = require('../Controllers/treatController.js')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage})

// this will be added to each routet that only the admin can change 
const verifyIfAdmin = require('../lib/verifyIfAdmin.js')

const router = express.Router()

router.get('/treat/:id', treatController.getOneTreat)
router.get('/treat', treatController.getAllTreats)


router.post('/treat/new', upload.single('imgOfTreat'), treatController.createTreat)
router.delete('/treat/:id', verifyIfAdmin, treatController.deleteTreat)
router.put('/treat/:id/edit', verifyIfAdmin, treatController.updateTreat)

module.exports = router