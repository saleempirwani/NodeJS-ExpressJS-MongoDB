const express = require('express')
const Joi = require('joi')
const courses = require('../../Courses')


const router = express.Router()


router.get('/', (req, res) => res.json(courses))

router.get('/:id', (req, res) => {
    
    let course = courses.find(c => c.id === Number(req.params.id))
    if (!course) return res.status(404).send('This course is not found')
    res.send(course)
})

router.post('/', (req, res) => {
    
    console.log(req.body)
    const {error, value} = validateCourse(req.body)
    
    // error => undefined
   if(error) return res.status(400).send(error.details[0].message)
   const course = {
        id: courses.length + 1,
        name: value.name,
    }
    courses.push(course)
    res.redirect('/')
})


// router.get('/', (req, res) => {
//     res.send('Hello World')
// })

// router.get('/api/courses', (req, res) => {
//     res.send([1, 2, 3])
// })

// router.get('/post/:year/:month', (req, res) => {
//     res.send(req.params)
// })

// router.get('/post', (req, res) => {
//     res.send(req.query)
// })

router.put('/:id', (req, res) => {
    
    let course = courses.find(c => c.id === Number(req.params.id))
    if (!course) return res.status(404).send('This course is not found')
    const {error, value} = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    course.name = value.name
    res.send(course)
})

router.delete('/:id', (req, res) => {
    let course = courses.find(c => c.id === Number(req.params.id))
    if (!course) return res.status(404).send('This course is not found')
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(courses)
})

function validateCourse(course) {

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    return schema.validate(course)
}

module.exports = router