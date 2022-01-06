'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createConfig;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _stripJsonComments = require('strip-json-comments');

var _stripJsonComments2 = _interopRequireDefault(_stripJsonComments);

var _fileExists = require('./utils/fileExists');

var _fileExists2 = _interopRequireDefault(_fileExists);

var _selectModules = require('./utils/selectModules');

var _selectModules2 = _interopRequireDefault(_selectModules);

var _selectUserModules = require('./utils/selectUserModules');

var _selectUserModules2 = _interopRequireDefault(_selectUserModules);

var _getEnvProp = require('./utils/getEnvProp');

var _getEnvProp2 = _interopRequireDefault(_getEnvProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* ======= Fetching config */

var DEFAULT_VERSION = 3;
var SUPPORTED_VERSIONS = [3, 4];
var CONFIG_FILE = '.bootstraprc';

function resolveDefaultConfigPath(bootstrapVersion) {
  return _path2.default.resolve(__dirname, '../' + CONFIG_FILE + '-' + bootstrapVersion + '-default');
}

function parseConfigFile(configFilePath) {
  var configContent = (0, _stripJsonComments2.default)(_fs2.default.readFileSync(configFilePath, 'utf8'));
  try {
    return _jsYaml2.default.safeLoad(configContent);
  } catch (YAMLException) {
    throw new Error('Config file cannot be parsed: ' + configFilePath + '\'');
  }
}

function readDefaultConfig() {
  var configFilePath = resolveDefaultConfigPath(DEFAULT_VERSION);
  var defaultConfig = parseConfigFile(configFilePath);

  return {
    defaultConfig: defaultConfig,
    configFilePath: configFilePath
  };
}

// default location .bootstraprc
function defaultUserConfigPath() {
  return _path2.default.resolve(__dirname, '../../../' + CONFIG_FILE);
}

function readUserConfig(customConfigFilePath) {
  var userConfig = parseConfigFile(customConfigFilePath);

  var bootstrapVersion = userConfig.bootstrapVersion;


  if (!bootstrapVersion) {
    throw new Error('\nBootstrap version not found in your \'.bootstraprc\'.\nMake sure it\'s set to 3 or 4. Like this:\n  bootstrapVersion: 4\n    ');
  }

  if (SUPPORTED_VERSIONS.indexOf(parseInt(bootstrapVersion, 10)) === -1) {
    throw new Error('\nUnsupported Bootstrap version in your \'.bootstraprc\'.\nMake sure it\'s set to 3 or 4. Like this:\n  bootstrapVersion: 4\n    ');
  }

  var defaultConfigFilePath = resolveDefaultConfigPath(bootstrapVersion);
  var defaultConfig = parseConfigFile(defaultConfigFilePath);

  return {
    userConfig: userConfig,
    defaultConfig: defaultConfig
  };
}

/* ======= Exports */
function createConfig(_ref) {
  var extractStyles = _ref.extractStyles,
      customConfigFilePath = _ref.customConfigFilePath;

  // .bootstraprc-{3,4}-default, per the DEFAULT_VERSION
  // otherwise read user provided config file
  var userConfigFilePath = null;
  if (customConfigFilePath) {
    userConfigFilePath = _path2.default.resolve(__dirname, customConfigFilePath);
  } else {
    var defaultLocationUserConfigPath = defaultUserConfigPath();
    if ((0, _fileExists2.default)(defaultLocationUserConfigPath)) {
      userConfigFilePath = defaultLocationUserConfigPath;
    }
  }

  if (!userConfigFilePath) {
    var _readDefaultConfig = readDefaultConfig(),
        _defaultConfig = _readDefaultConfig.defaultConfig,
        _configFilePath = _readDefaultConfig.configFilePath;

    return {
      bootstrapVersion: parseInt(_defaultConfig.bootstrapVersion, 10),
      loglevel: _defaultConfig.loglevel,
      preBootstrapCustomizations: _defaultConfig.preBootstrapCustomizations,
      bootstrapCustomizations: _defaultConfig.bootstrapCustomizations,
      appStyles: _defaultConfig.appStyles,
      useCustomIconFontPath: _defaultConfig.useCustomIconFontPath,
      extractStyles: extractStyles || (0, _getEnvProp2.default)('extractStyles', _defaultConfig),
      styleLoaders: (0, _getEnvProp2.default)('styleLoaders', _defaultConfig),
      styles: (0, _selectModules2.default)(_defaultConfig.styles),
      scripts: (0, _selectModules2.default)(_defaultConfig.scripts),
      configFilePath: _configFilePath
    };
  }

  var configFilePath = userConfigFilePath;

  var _readUserConfig = readUserConfig(configFilePath),
      userConfig = _readUserConfig.userConfig,
      defaultConfig = _readUserConfig.defaultConfig;

  var configDir = _path2.default.dirname(configFilePath);
  var preBootstrapCustomizations = userConfig.preBootstrapCustomizations && _path2.default.resolve(configDir, userConfig.preBootstrapCustomizations);
  var bootstrapCustomizations = userConfig.bootstrapCustomizations && _path2.default.resolve(configDir, userConfig.bootstrapCustomizations);
  var appStyles = userConfig.appStyles && _path2.default.resolve(configDir, userConfig.appStyles);

  return {
    bootstrapVersion: parseInt(userConfig.bootstrapVersion, 10),
    loglevel: userConfig.loglevel,
    preBootstrapCustomizations: preBootstrapCustomizations,
    bootstrapCustomizations: bootstrapCustomizations,
    appStyles: appStyles,
    disableSassSourceMap: userConfig.disableSassSourceMap,
    disableResolveUrlLoader: userConfig.disableResolveUrlLoader,
    useCustomIconFontPath: userConfig.useCustomIconFontPath,
    extractStyles: extractStyles || (0, _getEnvProp2.default)('extractStyles', userConfig),
    styleLoaders: (0, _getEnvProp2.default)('styleLoaders', userConfig),
    styles: (0, _selectUserModules2.default)(userConfig.styles, defaultConfig.styles),
    scripts: (0, _selectUserModules2.default)(userConfig.scripts, defaultConfig.scripts),
    configFilePath: configFilePath
  };
}