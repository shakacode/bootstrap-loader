'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (module) {
  try {
    var resolvedPath = void 0;
    _resolve2.default.sync(module, {
      packageFilter: function packageFilter(pkg, pathToModule) {
        resolvedPath = pathToModule;
        return pkg;
      }
    });
    return resolvedPath;
  } catch (error) {
    _logger2.default.debug('resolveModule error is ', error);
    return false;
  }
};

var _resolve = require('resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }