var http = require('http');
var express = require('express');

var app = express();

app.use(function(req, res) {
    
    var output = [];
    for (var i = 0; i < 3; i++) {
        output.push({
            count: i,
            name: 'name - ' + i
        })
    }
    res.send(output);
    
//    res.writeHead(200, { 'Content-Type': 'text/html'});
//    res.end('<h1>Hello Express</h1>');
});

http.createServer(app).listen(52273, function() {
    console.log('Server running at http://127.0.0.1:52273')
})

