const express = require('express')
const exphbrs = require('express-handlebars')
const Joi = require('joi')
const path = require('path')
const courses = require('./Courses')

// const logger = require('./middleware/logger')


const app = express()

app.engine('handlebars', exphbrs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => res.render('index', {
    title: 'My Course App',
    courses
}))

// Body Parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))  // help to take data from url or template.

// Custome MiddleWare
// app.use(logger)  

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Courses Api Routes
app.use('/api/courses', require('./routes/api/members'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))


