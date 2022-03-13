const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const PORT = 8000

const connectDB = require('./config/database')
const userRoutes = require('./routes/userRoutes')
const contactRoute = require('./routes/contactRoutes')

connectDB()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static("public"))

app.use('/api/users', userRoutes)
app.use('/api', contactRoute)

app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.listen(PORT, () => console.log(`Backend running on localhost:${PORT}`))