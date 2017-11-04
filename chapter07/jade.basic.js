var http = require('http')
var fs = require('fs')
var jade = require('jade')

http.createServer(function (req, res) {
    fs.readFile('jadePage.jade', 'utf-8', function (error, data) {
        var fn = jade.compile(data);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fn({
            name: 'RinaIanTta',
            description: 'Hello jade With Node.js .. !'
        }));
    });
}).listen(52273, function () {
    console.log('Server Running at http://127.0.0.1:52273');
});