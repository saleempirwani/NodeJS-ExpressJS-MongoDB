var http = require('http')
var url = require('url')

http.createServer(function (req, res){

    console.log('req => ', req.url)

    res.writeHead(200, {'Content-Type': 'text/plain'})
    var q = url.parse(req.url, true).query
    console.log(q)
    res.end(JSON.stringify(q))

}).listen(8080)