'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (module, webpack) {
  var userModule = _path2.default.relative(webpack.context, module);
  webpack.addDependency(module);
  return '@import "' + userModule + '";';
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }