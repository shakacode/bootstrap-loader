/* eslint-disable no-console, import/no-extraneous-dependencies */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const IP = process.env.IP || 'localhost';
const PORT = process.env.PORT || 4000;

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, 'public')));

server.use('/', (req, res) => ( // eslint-disable-line no-unused-vars
  res.sendFile(path.join(__dirname, 'app', 'markup', 'bootstrap-prod.html'))
));

server.listen(PORT, IP, err => {
  if (err) console.log(`=> OMG!!! 🙀 ${err}`);
  console.log(`=> 🚀  Production server is running on port ${PORT}`);
});
