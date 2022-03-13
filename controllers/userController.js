const bcrypt = require('bcryptjs')
const User = require('../models/userModel')


const registerUser = async (req, res) => {
    const { email, password, secret } = req.body
    // console.log(signupValue)
    if (!email || !password || !secret) {
        res.status(400).json({ message: "Provide all data" })
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400).json({ message: "User already exists" })
    } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({
            email: email,
            password: hashedPassword,
            secret: secret
        })

        if (user) {
            res.status(201).json({
                status: 'success',
                email: email
            })
        } else {
            res.status(400).json({
                message: "Invalid user data"
            })
        }
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            status: 'success',
            email: user.email,
            userId: user._id
        })
    } else {
        res.status(400).json({ message: "Invalid credentials" })
    }
}

module.exports = {
    registerUser,
    loginUser
}