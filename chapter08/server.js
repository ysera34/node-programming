var fs = require('fs');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var dummyDB = (function() {
  var dummyDB = {};
  var storage = [];
  var count = 1;

  dummyDB.get = function(id) {
    if (id) {
      id = (typeof id === 'string') ? Number(id) : id;
      for (var i in storage) if (storage[i].id == id) {
        return storage[i];
      }
    } else {
      return storage;
    }
  };

  dummyDB.insert = function(data) {
    data.id = count++;
    storage.push(data);
    return data;
  };

  dummyDB.remove = function(id) {
    id = (typeof id === 'string') ? Number(id) : id;
    for (var i in storage) if (storage[i].id == id) {
      storage.splice(i, 1);
      return true;
    }
    return false;
  };
  return dummyDB;
})();

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/user', function(req, res) {
  res.send(dummyDB.get());
});
app.get('/user/:id', function(req, res) {
  res.send(dummyDB.get(req.params('id')));
});
app.post('/user', function(req, res) {
  var name = req.body.name;
  var region = req.body.region;

  if (name && region) {
    res.send(dummyDB.insert({
      name: name,
      region: region,
    }));
  } else {
    throw new Error('error');
  }
});
app.put('/user/:id', function(req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var region = req.body.region;

  var item = dummyDB.get(id);
  item.name = name || item.name;
  item.region = region || item.region;
  res.send(item);
});
app.delete('/user/:id', function(req, res) {
  res.send(dummyDB.remove(req.params.id));
});

http.createServer(app).listen(52273, function() {
  console.log('Server running at http://127.0.0.1:52273');
});
