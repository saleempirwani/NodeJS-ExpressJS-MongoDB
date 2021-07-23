const express = require('express')
const cookieParser = require('cookie-parser')


const PORT = 3000
const app = express()

app.use(cookieParser())

app.get('/', (req, res) => {
    res.cookie('myCookie', 'cookie_abc')
    res.send('Cookies')
})

app.get('/clearCookie', (req, res) => {
    res.clearCookie('myCookie')
    res.send('Clear Cookies')
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
