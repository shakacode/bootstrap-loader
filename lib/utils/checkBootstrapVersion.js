'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (bootstrapVersion, bootstrapPath) {
  var npmVersion = require(_path2.default.join(bootstrapPath, 'package.json')).version;

  return {
    version: npmVersion,
    allGood: _semver2.default.major(npmVersion) === bootstrapVersion
  };
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }