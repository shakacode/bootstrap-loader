'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (module, bootstrapVersion, bootstrapPath) {
  var scriptsPath = parseInt(bootstrapVersion, 10) === 3 ? ['assets', 'javascripts', 'bootstrap'] : ['js', 'dist'];
  var bootstrapModule = _path2.default.join.apply(_path2.default, [bootstrapPath].concat(scriptsPath, [module]));
  return 'require (' + JSON.stringify(bootstrapModule) + ');';
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }