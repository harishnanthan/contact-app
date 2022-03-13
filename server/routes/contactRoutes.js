const express = require('express')
const router = express.Router()

const contactController = require('../controllers/contactController')

//  localhost:8000/api/user/contact
router.post('/contact', contactController.addContact)
router.get('/contact', contactController.getContact)

module.exports = router



