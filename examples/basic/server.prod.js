/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 8080;

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, 'public')));

server.use('/', (req, res) => (
  res.sendFile(path.join(__dirname, 'app', 'markup', 'bootstrap-prod.html'))
));

server.listen(PORT, '0.0.0.0', err => {
  if (err) console.log(`=> OMG!!! 🙀 ${err}`);
  console.log(`=> 🚀  Production server is running on port ${PORT}`);
});
