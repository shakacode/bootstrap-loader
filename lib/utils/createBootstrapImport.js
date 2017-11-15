'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (module, bootstrapVersion, bootstrapPath) {
  var stylesPath = parseInt(bootstrapVersion, 10) === 3 ? ['assets', 'stylesheets', 'bootstrap'] : ['scss'];
  var bootstrapModule = _path2.default.join.apply(_path2.default, [bootstrapPath].concat(stylesPath, ['_' + module]));
  return '@import "' + bootstrapModule + '";';
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }