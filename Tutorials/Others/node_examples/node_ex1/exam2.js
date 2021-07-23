var http = require('http')
var fs = require('fs')

http.createServer(function (req, res) {

    if (req.url === "/api/test") {
        fs.readFile('demohtml.html', function (err, data) {
            if (err) {
                console.log("file err => ", err)
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
                res.end(data)

            }
        })
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end("No Page Found")
    }

}).listen(8080)