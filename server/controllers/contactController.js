const Contact = require('../models/contactModel')

const addContact = async (req, res) => {
    const { name, phoneNumber, email, userId } = req.body

    if (!name || !phoneNumber || !email) {
        res.status(400).json({ message: "Please provide all data" })
    }

    const contactExists = await Contact.findOne({ email })
    if (contactExists) {
        res.status(400).json({ message: "Duplicate contact" })
    } else {
        const contact = new Contact({
            userId: userId,
            name: name,
            phoneNumber: phoneNumber,
            email: email
        })
        contact.save().catch((e) => console.log(e))
        if (contact) {
            res.status(201).json({ message: "contact added", contact: contact })
        }
        else {
            res.status(500)
        }
    }
}

const getContact = async (req, res) => {
    const contacts = await Contact.find({ userId: req.headers.id })
    res.status(200).json(contacts)
}

module.exports = { addContact, getContact };