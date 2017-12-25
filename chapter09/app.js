const fs = require('fs');
const ejs = require('ejs');
const http = require('http');
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host: '221.151.12.67',
  port: '3306',
  database: 'node_example',
  user: 'root',
  password: 'inframincer34',
});

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  fs.readFile('list.html', 'utf8', (error, data) => {
    connection.query('SELECT * FROM products', (error, result, fields) => {
      if (error) {
        console.log(error);
        return;
      } else {
        res.send(ejs.render(data, {
          data: result
        }));
      }
    });
  });
});

app.get('/insert', (req, res) => {
  fs.readFile('insert.html', 'utf8', (error, data) => {
    res.send(data);
  });
});

app.post('/insert', (req, res) => {
  var body = req.body;

  connection.query('INSERT INTO products (name, modelnumber, series) VALUES (?, ?, ?)',
   [body.name, body.modelnumber, body.series], () => {
    res.redirect('/');
  });
});

app.get('/edit/:id', (req, res) => {
 fs.readFile('edit.html', 'utf8', (error, data) => {
   connection.query('SELECT * FROM products WHERE id = ?', [req.params.id], (error, result) => {
     res.send(ejs.render(data, {
       data: result[0],
     }));
   });
 });
});

app.post('/edit/:id', (req, res) => {
  var body = req.body;

  connection.query('UPDATE products SET name = ?, modelnumber = ?, series = ? WHERE id = ?',
    [body.name, body.modelnumber, body.series, req.params.id], () => {
      res.redirect('/');
  });
});

app.get('/delete/:id', (req, res) => {
  connection.query('DELETE FROM products WHERE id = ?', [req.params.id], (req, res) => {
    res.redirect('/');
  });
});

http.createServer(app).listen(52273, function() {
  console.log('server running at http://127.0.01:52273');
});
