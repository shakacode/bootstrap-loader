/* eslint-disable import/no-extraneous-dependencies, no-console */

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const devBuildConfig = require('./webpack.dev.config');

const PORT = 4000;

const server = express();
const compiler = webpack(devBuildConfig);

server.use(webpackDevMiddleware(compiler, {
  publicPath: devBuildConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false,
  },
}));

server.use(webpackHotMiddleware(compiler));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/',
  (req, res) => res.redirect('/bs3')
);

server.get('/bs3',
  (req, res) => res.sendFile(path.join(__dirname, 'app', 'markup', 'bs3-dev.html'))
);

server.get('/bs4',
  (req, res) => res.sendFile(path.join(__dirname, 'app', 'markup', 'bs4-dev.html'))
);

server.listen(PORT, 'localhost', (err) => {
  if (err) {
    console.log(`=> OMG!!! 🙀 ${err}`);
  }
  console.log(`=> 🔥  Webpack dev server is running on port ${PORT}`);
});
