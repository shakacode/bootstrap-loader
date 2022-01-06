'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /* eslint no-console: 0 */

/**
 * Logger helper
 */
exports.default = {
  /**
   * Logs output
   *
   * @param {...*} output
   */
  log: function log() {
    var _console;

    for (var _len = arguments.length, output = Array(_len), _key = 0; _key < _len; _key++) {
      output[_key] = arguments[_key];
    }

    var prettyOutput = [_chalk2.default.yellow('[bootstrap-loader]: ')].concat(output, '\n');
    (_console = console).log.apply(_console, _toConsumableArray(prettyOutput));
  },


  /**
   * Logs debug info
   *
   * @param {...*} output
   */
  debug: function debug() {
    if (global.__DEBUG__) this.log.apply(this, arguments);
  }
};