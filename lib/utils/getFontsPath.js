'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Builds path to Bootstrap fonts
 *
 * @param {string} bootstrapPath
 * @returns {string}
 */
exports.default = function (bootstrapPath) {
  return _path2.default.join(bootstrapPath, 'assets', 'fonts', 'bootstrap/');
};