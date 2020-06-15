const express = require('express')
const adminController = require('../Controllers/adminController.js')

const router = express.Router()


router.post('/admin/register', adminController.createAdmin)
router.post('/admin/login', adminController.loginAdmin)
router.get('/admin/logout', adminController.logoutAdmin)

module.exports = router