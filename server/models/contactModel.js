const mongoose = require('mongoose')


const contactSchmea = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
        // unique: true,

    },
    email: {
        type: String,
        required: true,
        // unique: true,
    }
})

const contact = mongoose.model("Contact", contactSchmea)

module.exports = contact;