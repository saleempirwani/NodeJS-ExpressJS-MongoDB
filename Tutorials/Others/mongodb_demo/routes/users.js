const express = require('express')
const User = require('../models/userModel')

const router = express.Router()


router.get('/:id', async (req, res) => {
    try{
        const users = await User.findById(req.params.id)
        res.json(users)

    }catch (err){
        console.log('Err => ', err)
    }
})

router.post('/', async (req, res) => {
    try{
        const user = new User({
            name: req.body.name,
            password: req.body.password
        })

        const usr = await user.save()
        res.json(usr)

    }catch (err){
        console.log('Err => ', err)
    }
})


router.post('/', async (req, res) => {
    try{
        const user = new User({
            name: req.body.name,
            password: req.body.password
        })

        const usr = await user.save()
        res.json(usr)

    }catch (err){
        console.log('Err => ', err)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        
        const usr = await user.save()
        res.json(usr)

    }catch (err){
        console.log('Err => ', err)
    }
})


module.exports = router