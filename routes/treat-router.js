const express = require('express')
const treatController = require('../Controllers/treatController.js')

const router = express.Router()

router.post('/treat/new', treatController.createTreat)

module.exports router