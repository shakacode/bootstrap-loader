'use strict';

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _resolveModule = require('./utils/resolveModule');

var _resolveModule2 = _interopRequireDefault(_resolveModule);

var _checkBootstrapVersion = require('./utils/checkBootstrapVersion');

var _checkBootstrapVersion2 = _interopRequireDefault(_checkBootstrapVersion);

var _processStyleLoaders = require('./utils/processStyleLoaders');

var _processStyleLoaders2 = _interopRequireDefault(_processStyleLoaders);

var _joinLoaders = require('./utils/joinLoaders');

var _joinLoaders2 = _interopRequireDefault(_joinLoaders);

var _buildExtractStylesLoader = require('./utils/buildExtractStylesLoader');

var _buildExtractStylesLoader2 = _interopRequireDefault(_buildExtractStylesLoader);

var _createRequire = require('./utils/createRequire');

var _createRequire2 = _interopRequireDefault(_createRequire);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

var _fileExists = require('./utils/fileExists');

var _fileExists2 = _interopRequireDefault(_fileExists);

var _getEnvProp = require('./utils/getEnvProp');

var _getEnvProp2 = _interopRequireDefault(_getEnvProp);

var _bootstrap = require('./bootstrap.config');

var _bootstrap2 = _interopRequireDefault(_bootstrap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// For Node <= v0.12.x Babel polyfill is required
if (_semver2.default.lt(process.version, '4.0.0') && !global._babelPolyfill) {
  try {
    // eslint-disable-next-line global-require
    require('babel-polyfill');
  } catch (e) {
    try {
      // eslint-disable-next-line global-require
      require('babel-core/polyfill');
    } catch (ee) {
      try {
        // eslint-disable-next-line global-require
        require('babel/polyfill');
      } catch (eee) {
        throw new Error('\n          For Node <= v0.12.x Babel polyfill is required.\n          Make sure it\'s installed in your \'node_modules/\' directory.\n          ' + eee + '\n        ');
      }
    }
  }
}

// Read more about the next line
// at https://github.com/shakacode/bootstrap-loader/pull/139
/* eslint-disable import/imports-first */
/* eslint-disable func-names, import/first */

module.exports = function () {};

/**
 * Bootstrap loader entry point
 *
 * @param {string} source - Path to dummy file with empty object.
 *                          Needed b/c we have to apply loader to some file.
 * @returns {string}
 */
module.exports.pitch = function (source) {
  if (this.cacheable) this.cacheable();

  var _ref = _loaderUtils2.default.getOptions(this) || {},
      extractStyles = _ref.extractStyles,
      configFilePath = _ref.configFilePath,
      bootstrapPath = _ref.bootstrapPath;

  if (configFilePath) {
    var fullPathToUserConfig = _path2.default.resolve(__dirname, configFilePath);
    if (!(0, _fileExists2.default)(fullPathToUserConfig)) {
      throw new Error('\n        Cannot find config file ' + fullPathToUserConfig + '. You might want to pass the full path.\n      ');
    }
  }

  var config = (0, _bootstrap2.default)({ extractStyles: extractStyles, customConfigFilePath: configFilePath });

  function isDebugEnabled() {
    if (config.loglevel === 'debug') {
      return true;
    }
    if (!process.env.DEBUG) {
      return false;
    }

    switch (process.env.DEBUG.toString().toLowerCase()) {
      case 'true':
      case 'yes':
      case '1':
        return true;
      default:
        return false;
    }
  }

  global.__DEBUG__ = isDebugEnabled();

  var whichWayDebugEnabledMsg = process.env.DEBUG ? 'DEBUG defined in your ENV.' : "your config log level set to 'debug'.";

  _logger2.default.debug('bootstrap-loader is in DEBUG mode because you have ' + whichWayDebugEnabledMsg);

  _logger2.default.debug('Using config file ' + config.configFilePath);

  _logger2.default.debug('Query from webpack config:', this.query || '*none*');

  var bootstrapVersion = config.bootstrapVersion;

  // Resolve `bootstrap` package
  var bootstrapNPMModule = bootstrapVersion === 3 ? 'bootstrap-sass' : 'bootstrap';

  _logger2.default.debug('Using Bootstrap module:', bootstrapNPMModule);

  config.bootstrapPath = bootstrapPath || (0, _resolveModule2.default)(bootstrapNPMModule);
  _logger2.default.debug('Bootstrap module location (abs): ' + config.bootstrapPath);
  if (!config.bootstrapPath) {
    var msg = 'Could not resolve module \'' + bootstrapNPMModule + '\' which must be installed when bootstrap version is configured to v' + bootstrapVersion + '.\nYou must install \'bootstrap\' for bootstrap v4 or \'bootstrap-sass\' for bootstrap v3.\nYou can also specify the location manually by specifying \'bootstrapPath\' in bootstrap-loader\'s query string.\nSee https://github.com/shakacode/bootstrap-loader/blob/master/README.md#usage.';
    throw new Error(msg);
  }

  config.bootstrapRelPath = _path2.default.relative(this.context, config.bootstrapPath);
  _logger2.default.debug('Bootstrap module location (rel): ' + config.bootstrapRelPath);

  _logger2.default.debug('Context:', this.context);
  _logger2.default.debug('Using Bootstrap version:', bootstrapVersion);

  if (!config.bootstrapPath) {
    throw new Error('\n      Could not find path to \'' + bootstrapNPMModule + '\' module.\n      Make sure it\'s installed in your \'node_modules/\' directory.\n    ');
  }
  var bootstrapNPMVersion = (0, _checkBootstrapVersion2.default)(bootstrapVersion, config.bootstrapPath);

  if (!bootstrapNPMVersion.allGood) {
    throw new Error('\n      Looks like you have wrong version of Bootstrap.\n      Loader wants: ' + bootstrapVersion + '.x.x\n      Installed version: ' + bootstrapNPMVersion.version + '\n    ');
  }

  _logger2.default.debug('Bootstrap NPM package version:', bootstrapNPMVersion.version);

  _logger2.default.debug('Normalized params:', '\n', config);

  var result = {};

  var dummySourceRel = _loaderUtils2.default.urlToRequest(_path2.default.relative(this.context, source));

  var bootstrapConfig = JSON.stringify(config);
  // Handle styles
  if (config.styles) {
    if (!(0, _getEnvProp2.default)('styleLoaders', config)) {
      throw new Error('\nCould not find \'styleLoaders\' in your config.\nYou can use default ones:\n  styleLoaders: [\'style\', \'css\', \'sass\']\n      ');
    }

    var styleLoadersWithSourceMapsAndResolveUrlLoader = (0, _processStyleLoaders2.default)({
      loaders: config.styleLoaders,
      disableSassSourceMap: config.disableSassSourceMap,
      disableResolveUrlLoader: config.disableResolveUrlLoader
    });

    var styleLoaders = config.extractStyles ? (0, _buildExtractStylesLoader2.default)(styleLoadersWithSourceMapsAndResolveUrlLoader) : (0, _joinLoaders2.default)(styleLoadersWithSourceMapsAndResolveUrlLoader);
    var bootstrapStylesLoader = _loaderUtils2.default.urlToRequest(_path2.default.relative(this.context, require.resolve(_loaderUtils2.default.urlToRequest('bootstrap.styles.loader.js')))) + '?' + bootstrapConfig + '!';
    var styles = styleLoaders + bootstrapStylesLoader + dummySourceRel;

    result.css = (0, _createRequire2.default)(styles);
  }

  // Handle scripts
  if (config.scripts) {
    var bootstrapScriptsLoader = _loaderUtils2.default.urlToRequest(_path2.default.relative(this.context, require.resolve(_loaderUtils2.default.urlToRequest('bootstrap.scripts.loader.js')))) + '?' + bootstrapConfig + '!';
    var scripts = bootstrapScriptsLoader + dummySourceRel;
    result.js = (0, _createRequire2.default)(scripts);
  }

  var resultOutput = Object.keys(result).map(function (key) {
    return 'module.exports.' + key + ' = ' + result[key] + '\n';
  }).join('');

  _logger2.default.debug('Requiring:', '\n', resultOutput);

  return resultOutput;
};