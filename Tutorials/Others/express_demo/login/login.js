const express = require('express')
const sessions = require('express-session')

const app = express()

const PORT = 3000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

var session

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(sessions({
    secret: 'asdfsgddfgsd#$%$%^$%',
    resave: false,
    saveUninitialized: true,
}))


app.get('/login', (req, res) => {
    session = req.session
    if(!session.uniqueID)
        return res.sendFile(__dirname + '/login.html')
    
    res.redirect('/admin')
    
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')    
})


app.post('/login', (req, res) => {

    if(req.body.name !== 'admin' && req.body.password !== 'admin') 
        return res.redirect('/login')
    
    session = req.session
    session.uniqueID = req.body.name
    res.redirect('/admin')
})

app.get('/admin', (req, res) => {
    session = req.session
    if(!session.uniqueID)
        return res.redirect('/login')
    
    res.send('You are login <a href="/logout">Logout</a>')
    
})