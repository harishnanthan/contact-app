const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true,
    }

})

const user = mongoose.model("user", userScheme)

module.exports = user;