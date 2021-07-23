const { static } = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')

const PORT = 3000
const DB_NAME = 'SMS_DB'
const DB_URL = `mongodb://localhost:/${DB_NAME}`

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./views/images'))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Routes
app.use('/', require('./routes/api/sms'))

mongoose.connect(DB_URL, { useNewUrlParser: true })
mongoose.connection
    .once('open', () => console.log('DB Connected'))
    .on('error', (err) => console.log('Error => ', err))

app.listen(PORT,
    () => console.log(`Live at: http://localhost:${PORT}`))