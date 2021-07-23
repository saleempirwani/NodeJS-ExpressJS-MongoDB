const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

app.use(express.json())

app.use('/users', require('./routes/users'))

const DB_URL = 'mongodb://localhost:/users'

mongoose.connect(DB_URL, {useNewUrlParser: true});

const db = mongoose.connection

db.once('open', () => console.log('MongoDb connected...'))
db.on('error', err => console.log("Error => ", err))


app.listen(PORT, () => console.log(`Live at: http://localhost:${PORT}`))