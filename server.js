const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
var http = require('http');

// My APIs
const wolfram = require('./routes/api/wolfram');
const books = require('./routes/api/books');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// Cors Middleware
app.use(cors());

// DB Config
const db = require('./config/keys.js').mongoURI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// User wolfram api routes
app.use('/api/wolfram', wolfram);

// Use to serve PDFs
app.use('/api/books', books);

// donwload PDF
app.get('/file', function(req, res) {
  res.download(__dirname + '/books/test.pdf', 'test.pdf');
});

// open in browser
app.get('/open', function(req, res) {
  var options = {
    method: 'GET',
    host: 'localhost',
    port: 5000,
    path: '/file'
  };

  var request = http.request(options, function(response) {
    var data = [];

    response.on('data', function(chunk) {
      data.push(chunk);
    });

    response.on('end', function() {
      data = Buffer.concat(data);
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename=test.pdf',
        'Content-Length': data.length
      });
      res.end(data);
    });
  });
  request.end();
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
