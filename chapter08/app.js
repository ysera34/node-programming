var http = require('http');
var express = require('express');
var morgan = require('morgan');
// var uuid = require('node-uuid');

var app = express();
app.use(express.static(__dirname + '/public'));

// app.use(express.logger());
// app.use(morgan('combined'));
morgan.token('id', function getId (req) {
  return req.id;
});
// app.use(assignId);
app.use(morgan(':id :method :url :response-time'));

// function assignId (req, res, next) {
//   req.id = uuid.v4();
//   next();
// }

app.use(function(req, res, next) {

    var output = [];
    for (var i = 0; i < 3; i++) {
        output.push({
            count: i,
            name: 'name - ' + i
        });
    }
//    res.send(output);

    var agent = req.header('User-Agent');
    console.log(req.headers);
    console.log(agent);

   // if (agent.toLowerCase().match(/chrome/)) {
   //     res.send('<h1>Hello Chrome ...!</h1>');
   // } else {
   //     res.send('<h1>Hello Express ...!</h1>');
   // }

    // var name = req.param('name');
    // var region = req.param('region');
    //
    // res.send('<h1>' + name + '-' + region + '</h1>');
    next();
});

/*
app.use(function(req, res, next) {
  res.send(404, '<h1>404 Error</h1>');
});
*/

app.use(function (req,res, next) {
  console.log('first middleware');
  req.number = 52;
  res.number = 273;
  next();
});

app.use(function (req,res, next) {
  console.log('second middleware');
  next();
});

app.use(function (req,res, next) {
  console.log('third middleware');

  res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.end('<h1>express middleware</h1>');
  // res.end('<h1>' + req.number + ' : ' + res.number + '</h1>');
  res.end('<img src="/{filepath}"/>');
});

http.createServer(app).listen(52273, function() {
    console.log('Server running at http://127.0.0.1:52273');
});
