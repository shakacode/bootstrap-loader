'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (loaders) {
  var fallbackLoader = void 0;
  if (loaders[0].startsWith('style')) {
    fallbackLoader = 'style-loader';
  } else if (loaders[0].startsWith('isomorphic-style')) {
    fallbackLoader = 'isomorphic-style-loader';
  } else if (loaders[0].startsWith('node-style')) {
    fallbackLoader = 'node-style-loader';
  } else {
    throw new Error('\nIf you want to use \'extract-text-webpack-plugin\', make sure\nyour \'styleLoaders\' array starts with \'style\', \'isomorphic-style\' \'node-style\' or  at index 0.\n    ');
  }

  var ExtractTextPlugin = void 0;
  try {
    // eslint-disable-next-line global-require
    ExtractTextPlugin = require('extract-text-webpack-plugin');
  } catch (error) {
    throw new Error('\nCould not find \'extract-text-webpack-plugin\' module.\nMake sure it\'s installed in your \'node_modules/\' directory.\nError: ' + error + '\n');
  }
  var restLoaders = loaders.slice(1).map(function (loader) {
    return loader + '!';
  }).join('');
  return [ExtractTextPlugin.loader().loader + '?{"omit":1,"remove":true}', fallbackLoader, restLoaders].join('!');
};