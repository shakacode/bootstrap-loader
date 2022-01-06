'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (loaders) {
  if (!Array.isArray(loaders)) {
    throw new Error('\n      Specify your loaders as an array.\n      Default is [\'style\', \'css\', \'scss\']\n    ');
  }

  return loaders.map(function (loader) {
    return loader + '!';
  }).join('');
};