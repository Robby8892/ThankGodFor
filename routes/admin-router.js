const express = require('express')
const adminController = require('../Controllers/adminController.js')

const router = express.Router()



router.post('/admin/new', adminController.createAdmin)

module.exports = router