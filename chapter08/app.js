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
//    res.send(output);
    
    var agent = req.header('User-Agent');
    console.log(req.headers);
    console.log(agent);

//    if (agent.toLowerCase().match(/chrome/)) {
//        res.send('<h1>Hello Chrome ...!</h1>');
//    } else {
//        res.send('<h1>Hello Express ...!</h1>');
//    }
    
    var name = req.param('name');
    var region = req.param('region')
    
    res.send('<h1>' + name + '-' + region + '</h1>');
});

http.createServer(app).listen(52273, function() {
    console.log('Server running at http://127.0.0.1:52273')
})

