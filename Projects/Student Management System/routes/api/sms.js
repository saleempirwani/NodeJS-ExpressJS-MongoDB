const express = require('express')
const Joi = require('joi')
const sessions = require('express-session')
const User = require('../../models/usersModels')
const Student = require('../../models/studentModel')

const router = express.Router()

let session

router.use(sessions({
    secret: 'fdjf;sfj&&^*$*%&HHF',
    saveUninitialized: true,
    resave: false,
}))

// Routes
router.get('/', (req, res) => {
    res.render('index')
})


router.get('/signup', (req, res) => {
    session = req.session
    if (!session.uniqueID) return res.render('signup')

    res.redirect('/showStudent')
})

router.post('/signup', async (req, res) => {
    // Validate user inputs
    const { value, error } = signupValidation(req.body)
    if (error) {
        // console.log('ERROR:', error.details[0].message)
        return res.render('signup', {
            message: error.details[0].message,
            data: req.body
        })
    }

    if (value.passwd !== value.cfmPasswd) {
        console.log('ERROR: Password and Confirm Password does not match')
        const message = 'Password and confirm password does not match.'
        return res.render('signup', { message, data: req.body })
    }

    // Add user in database
    try {
        const user = new User({
            name: value.name,
            passwd: value.passwd
        })
        await user.save()

    } catch (error) {
        console.log('ERROR @ Adding User in DB: ', error)
        const message = 'Could not signup your account, please try again.'
        return res.render('signup', { message, data: req.body })
    }

    // redirect to login page
    res.redirect('/login')

})

router.get('/login', (req, res) => {
    session = req.session
    if (!session.uniqueID) return res.render('login')

    res.redirect('/showStudent')
})

router.post('/login', async (req, res) => {

    const { value, error } = loginValidation(req.body)

    if (error) {
        console.log('ERROR:', error)
        return res.render('/login', {
            message: error.details[0].message,
            data: req.body
        })
    }

    try {
        const user = await User.find({
            name: value.name,
            passwd: value.passwd
        })

        if (user.length === 0) {
            console.log('ERROR: The username or password does not match')
            const message = 'The username or password does not match.'
            return res.render('login', { message, data: req.body })
        }

        // console.log(user[0].get('_id'))

        session = req.session
        session.uniqueID = user[0].get('_id')

        res.redirect('/showStudent')

    } catch (error) {
        console.log('ERROR @ Login User DB: ', error)
        const message = 'Could not login, please try again.'
        return res.render('login', { message, data: req.body })
    }
})

router.get('/logout', (req, res) => {
    if (session.uniqueID) req.session.destroy()
    res.redirect('/')
})

router.get('/addStudent', (req, res) => {
    session = req.session
    if (!session.uniqueID) return res.redirect('/login')

    res.render('addStudent')
})

router.post('/addStudent', async (req, res) => {
    const { value, error } = stdValidation(req.body)

    if (error) {
        console.log('ERROR @ add student: ', error)
        return res.redirect('/addStudent')
    }

    try {
        const student = new Student({ ...value })
        await student.save()
    } catch (error) { console.log('ERROR: ', error) }

    res.redirect('/showStudent')

})

router.get('/showStudent', async (req, res) => {

    session = req.session
    if (!session.uniqueID) return res.redirect('/login')

    const std = await Student.find().lean()
    console.log("Std => ", std)
    res.render('showStudent', { std })
})

router.get('/showStudent/:id', async (req, res) => {
    session = req.session
    if (!session.uniqueID) return res.redirect('/login')

    try {
        await Student.findByIdAndRemove({ _id: req.params.id })
    } catch (error) { console.log('ERROR @ student delete', error) }

    res.redirect('/showStudent')
})

router.get('/showStudent/update/:id', async (req, res) => {
    session = req.session
    if (!session.uniqueID) return res.redirect('/login')

    const std = await Student.findById({ _id: req.params.id }).lean()
    console.log("Std => ", std)
    res.render('updateStudent', { std })

})

router.post('/showStudent/update/:id', async (req, res) => {
    session = req.session
    if (!session.uniqueID) return res.redirect('/login')

    const { error, value } = stdValidation(req.body)
    if (error) res.redirect('/showStudent')

    try {
        await Student.findByIdAndUpdate({ _id: req.params.id }, value)
    } catch (error) { console.log('ERROR @ student update', error) }

    res.redirect('/showStudent')
})

// Invalid Page Request
router.get('*', function (req, res) {
    res.redirect('/');
});


const loginValidation = (login) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        passwd: Joi.string().required(),
    })
    return schema.validate(login)
}


const signupValidation = (signup) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(15).required(),
        passwd: Joi.string().min(6).max(15).required(),
        cfmPasswd: Joi.string().min(6).max(15).required(),
    })
    return schema.validate(signup)
}


const stdValidation = (student) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(15).required(),
        rollno: Joi.string().min(11).max(11).required(),
        gpa: Joi.string().min(4).max(4).required(),
        dept: Joi.string().min(2).max(2).required(),
    })

    return schema.validate(student)
}

module.exports = router