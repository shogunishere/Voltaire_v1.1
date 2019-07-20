const express = require('express');
const bookrouter = express.Router();
var http = require('http');

// Get request data

// @route GET / represents api/books endpoint

// file
bookrouter.get('/file', (req, res) => {
  res.download(__dirname + '/books/test.pdf', 'test.pdf');
});

module.exports = bookrouter;
