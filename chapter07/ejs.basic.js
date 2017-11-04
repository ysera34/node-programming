var http = require('http')
var fs = require('fs')
var ejs = require('ejs')

http.createServer(function (req, res) {
    fs.readFile('ejsPage.ejs', 'utf-8', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(ejs.render(data, {
            name: 'RintIanTta',
            description: 'Hello ejs with Node.js'
        }));
    });
}).listen(52273, function () {
    console.log('Server Running at http://127.0.0.1:52273');
});