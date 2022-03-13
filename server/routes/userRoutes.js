const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

//  localhost:8000/api/users/signup
router.post('/signup', userController.registerUser)
router.post('/login', userController.loginUser)

module.exports = router



