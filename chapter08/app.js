var fs = require('fs');
var http = require('http');
var express = require('express');
var morgan = require('morgan');
// var uuid = require('node-uuid');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieSession = require('cookie-session');

var app = express();
app.use(express.static(__dirname + '/public'));
// app.use(express.cookieParser());
app.use(cookieParser());
app.use(session({ secret: 'secret key' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.limit('10mb'));
app.use(bodyParser({ uploadDir: __dirname + '/multipart' }));

/*
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

app.use(cookieSession({
  name: 'session',
  keys: [], // secret keys

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
*/

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
    // console.log(req.headers);
    // console.log(agent);

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

  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.end('<h1>express middleware</h1>');
  // res.end('<h1>' + req.number + ' : ' + res.number + '</h1>');
  // res.end('<img src="/{filepath}"/>');
  next();
});

// app.use(app.router);
app.get('/a', function(req, res) {
  res.send('<a href="/b">Go to B</a>');
});

app.get('/b', function(req, res) {
  res.send('<a href="/a">Go to A</a>');
});

app.get('/page/:id', function(req, res) {
  var name = req.param('id');
  res.send('<h1>' + name + ' Page</h1>');
});

app.get('/getCookie', function(req, res) {
  res.send(req.cookies);
});

app.get('/setCookie', function(req, res) {
  res.cookie('string', 'cookie');
  res.cookie('json', {
    name: 'cookie',
    property: 'delicious',
  });
  res.redirect('/getCookie');
});

app.get('/', function(req, res) {
  if (req.cookies.auth) {
    res.send('<h1>Login Success</h1>');
  } else {
    res.redirect('/login');
  }
});

app.get('/login', function(req, res) {
  fs.readFile('./public/login.html', function(error, data) {
    // res.send(data); // download file
    res.send(data.toString());
  });
});

app.post('/login', function(req, res) {
  var login = req.param('login');
  var password = req.param('password');

  console.log(login, password);
  console.log(req.body);

  if (login == 'rint' && password == '1234') {
    res.cookie('auth', true);
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

app.get('/upload', function(req, res) {
  fs.readFile('./public/upload.html', function(error, data) {
    res.send(data.toString());
  });
});

app.post('/upload', function(req, res) {
  // console.log(req.body);
  // console.log(req.files);
  var comment = req.param('comment');
  var imageFile = req.files.image;
  if (imageFile) {
    var name = imageFile.name;
    var path = imageFile.path;
    var type = imageFile.type;

    if (type.indexOf('image') != -1) {
      var outputPath = __dirname + '/multipart/' + Date.now() + '_' + name;
      fs.rename(path, outputPath, function(error) {
        res.redirect('/upload');
      });
    } else {
      fs.unlike(path, function(error) {
        res.send(400);
      });
    }
  } else {
    res.send(400);
  }
  res.redirect('/upload');
});

app.get('/session', function(req, res) {
  var output = [];
  output.cookies = req.cookies;
  output.session = req.session;

  req.session.now = (new Date()).toUTCString();
  res.send(output);
});

app.all('*', function(req, res) {
  res.send(404, '<h1>Error - Page Not Found</h1>');
});

http.createServer(app).listen(52273, function() {
    console.log('Server running at http://127.0.0.1:52273');
});
