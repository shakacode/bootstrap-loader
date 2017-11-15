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
 * @param {string} bootstrapRelPath
 * @returns {string}
 */
exports.default = function (bootstrapRelPath) {
  return _path2.default.join(bootstrapRelPath, 'assets', 'fonts', 'bootstrap/');
};