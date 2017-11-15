'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (modules, bootstrapVersion, bootstrapPath, isScripts) {
  var processModule = isScripts ? _createBootstrapRequire2.default : _createBootstrapImport2.default;

  return modules.filter(function (module) {
    return module !== 'mixins';
  }).map(function (module) {
    return processModule(module, bootstrapVersion, bootstrapPath);
  });
};

var _createBootstrapImport = require('./createBootstrapImport');

var _createBootstrapImport2 = _interopRequireDefault(_createBootstrapImport);

var _createBootstrapRequire = require('./createBootstrapRequire');

var _createBootstrapRequire2 = _interopRequireDefault(_createBootstrapRequire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }