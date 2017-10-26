var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res) {
    
    var pathname = url.parse(req.url).pathname;
    if (pathname == '/') {
        
        if (req.method == 'GET') {
            console.log('GET Request');
            var query = url.parse(req.url, true).query;
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end('<h1>' + JSON.stringify(query) + '</h1>');
        } else if (req.method == 'POST') {
            console.log('POST Request');
            req.on('data', function(data) {
                res.writeHead(200, {'Content-Type':'text/html'});
                res.end('<h1>' + data + '</h1>');
            });
        }
        
    } else if (pathname == '/home') {
        fs.readFile('home.html', function(error, data) {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
        
    } else if (pathname == '/home2') {
        fs.readFile('home2.html', function(error, data) {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.end(data);
        })
    }
    
}).listen(52273, function() {
    console.log('server running at http://127.0.0.1:52273');
});