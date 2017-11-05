var http = require('http');
var express = require('express');

var app = express();

app.use(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.end('<h1>Hello Express</h1>');
});

http.createServer(app).listen(52273, function() {
    console.log('Server running at http://127.0.0.1:52273')
})

