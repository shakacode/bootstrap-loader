'use strict';

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _processModules = require('./utils/processModules');

var _processModules2 = _interopRequireDefault(_processModules);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bootstrap JS scripts loader
 *
 * @returns {string}
 */
module.exports = function () {
  if (this.cacheable) this.cacheable();

  _logger2.default.debug('Scripts input config:', '\n', this.query);

  var config = _loaderUtils2.default.getOptions(this) || {};
  var scripts = config.scripts,
      bootstrapVersion = config.bootstrapVersion,
      bootstrapRelPath = config.bootstrapRelPath;


  var processedScripts = (0, _processModules2.default)(scripts, bootstrapVersion, bootstrapRelPath, true);

  var scriptsOutput = processedScripts.map(function (script) {
    return script + '\n';
  }).join('');

  _logger2.default.debug('Scripts output:', '\n', scriptsOutput);

  return scriptsOutput;
}; /* eslint func-names: 0 */