'use strict';

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _processModules = require('./utils/processModules');

var _processModules2 = _interopRequireDefault(_processModules);

var _getFontsPath = require('./utils/getFontsPath');

var _getFontsPath2 = _interopRequireDefault(_getFontsPath);

var _createUserImport = require('./utils/createUserImport');

var _createUserImport2 = _interopRequireDefault(_createUserImport);

var _createBootstrapImport = require('./utils/createBootstrapImport');

var _createBootstrapImport2 = _interopRequireDefault(_createBootstrapImport);

var _logger = require('./utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Bootstrap SASS styles loader
 *
 * @returns {string}
 */
/* eslint func-names: 0 */
module.exports = function () {
  if (this.cacheable) this.cacheable();

  _logger2.default.debug('Styles input config:', '\n', this.query);

  var config = _loaderUtils2.default.getOptions(this) || {};
  var bootstrapVersion = parseInt(config.bootstrapVersion, 10);
  var styles = config.styles,
      bootstrapRelPath = config.bootstrapRelPath,
      useCustomIconFontPath = config.useCustomIconFontPath,
      preBootstrapCustomizations = config.preBootstrapCustomizations,
      bootstrapCustomizations = config.bootstrapCustomizations,
      appStyles = config.appStyles;


  var processedStyles = [];

  if (styles.indexOf('mixins') > -1) {
    processedStyles.push((0, _createBootstrapImport2.default)('mixins', bootstrapVersion, bootstrapRelPath));
  }

  if (preBootstrapCustomizations) {
    processedStyles.push((0, _createUserImport2.default)(preBootstrapCustomizations, this));
  }

  if (bootstrapVersion === 4) {
    processedStyles.push((0, _createBootstrapImport2.default)('functions', bootstrapVersion, bootstrapRelPath));
  }

  processedStyles.push((0, _createBootstrapImport2.default)('variables', bootstrapVersion, bootstrapRelPath));

  if (bootstrapVersion === 3 && !useCustomIconFontPath) {
    processedStyles.push('$icon-font-path: "' + (0, _getFontsPath2.default)(bootstrapRelPath, this) + '";');
  }

  if (bootstrapCustomizations) {
    processedStyles.push((0, _createUserImport2.default)(bootstrapCustomizations, this));
  }

  var bootstrapStyles = (0, _processModules2.default)(styles, bootstrapVersion, bootstrapRelPath);
  var userStyles = appStyles ? (0, _createUserImport2.default)(appStyles, this) : '';

  var stylesOutput = processedStyles.concat(bootstrapStyles, userStyles).map(function (style) {
    return style.replace(/\\/g, '/') + '\n';
  }).join('');

  _logger2.default.debug('Styles output:', '\n', stylesOutput);

  return stylesOutput;
};