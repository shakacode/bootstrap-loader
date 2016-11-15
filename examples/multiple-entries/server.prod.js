/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const IP = process.env.IP || 'localhost';
const PORT = process.env.PORT || 4000;

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.static(path.join(__dirname, 'public')));

server.get('/',
  (req, res) => res.redirect('/bs3')
);

server.get('/bs3',
  (req, res) => res.sendFile(path.join(__dirname, 'app', 'markup', 'bs3-prod.html'))
);

server.get('/bs4',
  (req, res) => res.sendFile(path.join(__dirname, 'app', 'markup', 'bs4-prod.html'))
);

server.listen(PORT, IP, err => {
  if (err) console.log(`=> OMG!!! 🙀 ${err}`);
  console.log(`=> 🚀  Production server is running on port ${PORT}`);
});
