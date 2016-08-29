/* eslint func-names: 0 */

import semver from 'semver';

// For Node <= v0.12.x Babel polyfill is required
if (semver.lt(process.version, '4.0.0') && !global._babelPolyfill) {
  try {
    require('babel-polyfill'); // eslint-disable-line
  } catch (e) {
    try {
      require('babel-core/polyfill'); // eslint-disable-line
    } catch (ee) {
      try {
        require('babel/polyfill'); // eslint-disable-line
      } catch (eee) {
        throw new Error(`
          For Node <= v0.12.x Babel polyfill is required.
          Make sure it's installed in your 'node_modules/' directory.
          ${eee}
        `);
      }
    }
  }
}

// Read more about the next line
// at https://github.com/shakacode/bootstrap-loader/pull/139
/* eslint-disable import/imports-first */
import path from 'path';
import loaderUtils from 'loader-utils';

import resolveModule from './utils/resolveModule';
import checkBootstrapVersion from './utils/checkBootstrapVersion';
import processStyleLoaders from './utils/processStyleLoaders';
import joinLoaders from './utils/joinLoaders';
import buildExtractStylesLoader from './utils/buildExtractStylesLoader';
import createRequire from './utils/createRequire';
import logger from './utils/logger';
import { createConfig, userConfigFileExists } from './bootstrap.config';

module.exports = function() {};

/**
 * Bootstrap loader entry point
 *
 * @param {string} source - Path to dummy file with empty object.
 *                          Needed b/c we have to apply loader to some file.
 * @returns {string}
 */
module.exports.pitch = function(source) {
  if (this.cacheable) this.cacheable();

  const { extractStyles, configFilePath } = loaderUtils.parseQuery(this.query);

  if (configFilePath) {
    const fullPathToUserConfig = path.resolve(__dirname, configFilePath);
    if (!userConfigFileExists(fullPathToUserConfig)) {
      throw new Error(`
        Cannot find config file ${fullPathToUserConfig}. You might want to pass the full path.
      `);
    }
  }

  const config = (
    createConfig({ extractStyles, configFilePath })
  );

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

  const whichWayDebugEnabledMsg = process.env.DEBUG
    ? 'DEBUG defined in your ENV.'
    : "your config log level set to 'debug'.";

  logger.debug(`Hey, we're in DEBUG mode because you have ${whichWayDebugEnabledMsg}`);

  logger.debug(`Using config file ${config.configFile}`);

  logger.debug('Query from webpack config:', this.query || '*none*');

  const bootstrapVersion = config.bootstrapVersion;

  // Resolve `bootstrap` package
  const bootstrapNPMModule = (
    bootstrapVersion === 3 ? 'bootstrap-sass' : 'bootstrap'
  );

  logger.debug('Using Bootstrap module:', bootstrapNPMModule);

  config.bootstrapPath = resolveModule(bootstrapNPMModule);
  logger.debug(`Bootstrap module location (abs): ${config.bootstrapPath}`);
  if (!config.bootstrapPath) {
    throw new Error(`
Could not find bootstrap version: '${bootstrapVersion}'. Did you install it?
The package is 'bootstrap' for bootstrap v4 and 'bootstrap-sass' for v3.
`);
  }

  config.bootstrapRelPath = path.relative(this.context, config.bootstrapPath);
  logger.debug(`Bootstrap module location (rel): ${config.bootstrapRelPath}`);

  logger.debug('Context:', this.context);
  logger.debug('Using Bootstrap version:', bootstrapVersion);

  if (!config.bootstrapPath) {
    throw new Error(`
      Could not find path to '${bootstrapNPMModule}' module.
      Make sure it's installed in your 'node_modules/' directory.
    `);
  }

  const bootstrapNPMVersion = (
    checkBootstrapVersion(bootstrapVersion, config.bootstrapPath)
  );

  if (!bootstrapNPMVersion.allGood) {
    throw new Error(`
      Looks like you have wrong version of Bootstrap.
      Loader wants: ${bootstrapVersion}.x.x
      Installed version: ${bootstrapNPMVersion.version}
    `);
  }

  logger.debug('Bootstrap NPM package version:', bootstrapNPMVersion.version);

  logger.debug('Normalized params:', '\n', config);

  global.__BOOTSTRAP_CONFIG__ = config;

  const result = [];

  const dummySourceRel = (
    loaderUtils.urlToRequest(path.relative(this.context, source))
  );

  // Handle styles
  if (config.styles) {
    if (!config.styleLoaders) {
      throw new Error(`
        Could not find 'styleLoaders' in your config.
        You can use default ones:
          styleLoaders: ['style', 'css', 'sass']
      `);
    }

    const styleLoadersWithSourceMapsAndResolveUrlLoader = (
      processStyleLoaders(config.styleLoaders)
    );

    const styleLoaders = (
      config.extractStyles ?
      buildExtractStylesLoader(styleLoadersWithSourceMapsAndResolveUrlLoader) :
      joinLoaders(styleLoadersWithSourceMapsAndResolveUrlLoader)
    );
    const bootstrapStylesLoader = (
      `${loaderUtils.urlToRequest(
        path.relative(
          this.context,
          require.resolve(
            loaderUtils.urlToRequest('bootstrap.styles.loader.js')
          )
        )
      )}!`
    );
    const styles = styleLoaders + bootstrapStylesLoader + dummySourceRel;

    result.push(createRequire(styles));
  }

  // Handle scripts
  if (config.scripts) {
    const bootstrapScriptsLoader = (
      `${loaderUtils.urlToRequest(
        path.relative(
          this.context,
          require.resolve(
            loaderUtils.urlToRequest('bootstrap.scripts.loader.js')
          )
        )
      )}!`
    );
    const scripts = bootstrapScriptsLoader + dummySourceRel;

    result.push(createRequire(scripts));
  }

  const resultOutput = (
    result
      .map(loader => `${loader}\n`)
      .join('')
  );

  logger.debug('Requiring:', '\n', resultOutput);

  return resultOutput;
};
