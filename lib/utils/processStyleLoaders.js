'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var loaders = _ref.loaders,
      disableSassSourceMap = _ref.disableSassSourceMap,
      disableResolveUrlLoader = _ref.disableResolveUrlLoader;

  if (!Array.isArray(loaders)) {
    throw new Error('\nSpecify your loaders as an array.\nDefault is [\'style\', \'css\', \'sass\']\n    ');
  }

  var loadersWithSuffix = ensureLoadersSuffix(loaders);

  if (disableSassSourceMap && disableResolveUrlLoader) {
    return loadersWithSuffix;
  }

  // We need to match user loaders in different formats:
  // 'sass', 'sass-loader', 'sass?someParam' etc.
  var getLoaderRegExp = function getLoaderRegExp(module) {
    return new RegExp('^' + (0, _escapeRegexp2.default)(module) + '(?:-loader)?(?:\\?.*)?$');
  };

  var sassLoaderRegExp = getLoaderRegExp('sass');
  var sassLoader = loadersWithSuffix.find(function (loader) {
    return sassLoaderRegExp.test(loader);
  });
  var sassLoaderIndex = loadersWithSuffix.indexOf(sassLoader);

  if (!disableSassSourceMap) {
    if (!sassLoader) {
      throw new Error('\n        I can\'t find \'sass-loader\'.\n        Add it to array of loaders in .bootstraprc.\n      ');
    }

    var sassLoaderQuery = sassLoader.split('?')[1];

    // We need to check if user's loader already contains sourceMap param
    // And if it's not there - inject it
    var sassLoaderWithSourceMap = void 0;
    if (sassLoaderQuery) {
      sassLoaderWithSourceMap = sassLoaderQuery.includes('sourceMap') ? sassLoader : sassLoader + '&sourceMap';
    } else {
      sassLoaderWithSourceMap = sassLoader + '?sourceMap';
    }

    // eslint-disable-next-line no-param-reassign
    loadersWithSuffix[sassLoaderIndex] = sassLoaderWithSourceMap;
  }

  if (!disableResolveUrlLoader) {
    var resolveUrlLoaderRegExp = getLoaderRegExp('resolve-url');
    var resolveUrlLoader = loadersWithSuffix.find(function (loader) {
      return resolveUrlLoaderRegExp.test(loader);
    });

    if (!resolveUrlLoader) {
      loadersWithSuffix.splice(sassLoaderIndex, 0, 'resolve-url-loader');
    }
  }

  return loadersWithSuffix;
};

var _escapeRegexp = require('escape-regexp');

var _escapeRegexp2 = _interopRequireDefault(_escapeRegexp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Ensures '-loader' suffix for loaders in config for webpack compatibility
var ensureLoadersSuffix = function ensureLoadersSuffix(loadersArray) {
  var loaderSuffixRegExp = new RegExp('^style-loader.*$|^css-loader.*$|^postcss-loader.*$|^sass-loader.*$|^resolve-url-loader.*$');
  var suffixReplaceRegExp = new RegExp('^style|^css|^postcss|^sass|^resolve-url');
  return loadersArray.map(function (loader) {
    if (!loaderSuffixRegExp.test(loader)) {
      return loader.replace(suffixReplaceRegExp, function (match) {
        return match + '-loader';
      });
    }
    return loader;
  });
};

/**
 * Injects 'resolve-url-loader' and 'sourceMap' param for 'sass-loader'
 *
 * @param {string[]} loaders
 * @returns {string[]}
 */
/*  */