var fs = require('fs');
var http = require('http');

http.createServer(function(req, res) {
   fs.readFile('home.html', function(error, data) {
       res.writeHead(200, {'Content-Type': 'text/html'});
       res.end(data);
   });
}).listen(52272, function() {
    console.log('home server running at http://127.0.0.1:52272');
});

http.createServer(function(req, res) {
    fs.readFile('sample.png', function(error, data) {
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(data);
    });
}).listen(52273, function() {
    console.log('home server running at http://127.0.0.1:52273');
});

http.createServer(function(req, res) {
    fs.readFile('sample.mp3', function(error, data) {
        res.writeHead(200, {'Content-Type': 'audio/mp3'});
        res.end(data);
    });
}).listen(52274, function() {
    console.log('home server running at http://127.0.0.1:52274');
});
