'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (userModules, defaultModules) {
  if (!userModules || userModules.toString().toLowerCase() === 'false') return false;

  if (typeof userModules === 'boolean') {
    return (0, _selectModules2.default)(defaultModules);
  }

  return (0, _selectModules2.default)(userModules);
};

var _selectModules = require('./selectModules');

var _selectModules2 = _interopRequireDefault(_selectModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }