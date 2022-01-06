'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (loaders) {
  var MiniCssExtractPlugin = void 0;
  try {
    // eslint-disable-next-line global-require
    MiniCssExtractPlugin = require('mini-css-extract-plugin');
  } catch (error) {
    throw new Error('\nCould not find \'mini-css-extract-plugin\' module.\nMake sure it\'s installed in your \'node_modules/\' directory.\nError: ' + error + '\n');
  }
  return [MiniCssExtractPlugin.loader, loaders.map(function (loader) {
    return loader + '!';
  }).join('')].join('!');
};