var http = require('http');

var server = http.createServer();

server.on('request', function() {
    console.log('Request On');
});

server.on('connection', function() {
    console.log('Connection On');
});

server.on('close', function() {
    console.log('Close On');
});

//server.listen(52273, function () {
//    console.log('Server Running at http://127.0.0.1:52273');
//});

//setInterval(function () {
//    server.close();
//}, 3000);

http.createServer(function (req, res) {
    
    var date = new Date();
    date.setDate(date.getDate() + 7);
    
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Set-Cookie': [
            'breakfast = toast; Expires = ' + date.toUTCString(),
            'dinner = chicken'
        ]
    });
    res.end('<h1> Hello Web Server with Node.js</h1><h2>' + req.headers.cookie + '</h2>');
}).listen(52274, function() {
    console.log('Server Running at http://127.0.0.1:52274');
})