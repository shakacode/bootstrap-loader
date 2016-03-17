/* eslint func-names: 0 */

import semver from 'semver';

// For Node <= v0.12.x Babel polyfill is required
if (semver.lt(process.version, '4.0.0') && !global._babelPolyfill) {
  try {
    require('babel-polyfill');
  } catch(e) {
    try {
      require('babel-core/polyfill');
    } catch (e) {
      try{
        require('babel/polyfill');
      } catch (e) {
        throw new Error(`
          For Node <= v0.12.x Babel polyfill is required.
          Make sure it's installed in your 'node_modules/' directory.
        `);
      }
    }
  }
}

import path from 'path';
import loaderUtils from 'loader-utils';

import resolveModule from './utils/resolveModule';
import checkBootstrapVersion from './utils/checkBootstrapVersion';
import processStyleLoaders from './utils/processStyleLoaders';
import joinLoaders from './utils/joinLoaders';
import buildExtractStylesLoader from './utils/buildExtractStylesLoader';
import createRequire from './utils/createRequire';
import logger from './utils/logger';
import { bootstrapVersion, loglevel, createConfig } from './bootstrap.config';

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

  global.__DEBUG__ = loglevel === 'debug' || process.env.DEBUG === '*';

  logger.debug(`Hey, we're in DEBUG mode! Yabba dabba doo!`);

  logger.debug('Context:', this.context);
  logger.debug('Using Bootstrap version:', bootstrapVersion);

  // Resolve `bootstrap` package
  const bootstrapNPMModule = (
    bootstrapVersion === 3 ? 'bootstrap-sass' : 'bootstrap'
  );
  logger.debug('Using Bootstrap module:', bootstrapNPMModule);

  const bootstrapPath = resolveModule(bootstrapNPMModule);

  if (!bootstrapPath) {
    throw new Error(`
      Could not find path to '${bootstrapNPMModule}' module.
      Make sure it's installed in your 'node_modules/' directory.
    `);
  }

  const bootstrapRelPath = path.relative(this.context, bootstrapPath);

  logger.debug(`Bootstrap module location (abs):`, bootstrapPath);
  logger.debug(`Bootstrap module location (rel):`, bootstrapRelPath);

  const bootstrapNPMVersion = (
    checkBootstrapVersion(bootstrapVersion, bootstrapPath)
  );

  if (!bootstrapNPMVersion.allGood) {
    throw new Error(`
      Looks like you have wrong version of Bootstrap.
      Loader wants: ${bootstrapVersion}.x.x
      Installed version: ${bootstrapNPMVersion.version}
    `);
  }
  logger.debug('Bootstrap NPM package version:', bootstrapNPMVersion.version);

  const { extractStyles } = loaderUtils.parseQuery(this.query);
  logger.debug('Query from webpack config:', this.query || '*none*');

  const config = (
    createConfig({ bootstrapPath, bootstrapRelPath, extractStyles })
  );
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
      loaderUtils.urlToRequest(
        path.relative(
          this.context,
          require.resolve(
            loaderUtils.urlToRequest('bootstrap.styles.loader.js')
          )
        )
      ) + '!'
    );
    const styles = styleLoaders + bootstrapStylesLoader + dummySourceRel;

    result.push(createRequire(styles));
  }

  // Handle scripts
  if (config.scripts) {
    const bootstrapScriptsLoader = (
      loaderUtils.urlToRequest(
        path.relative(
          this.context,
          require.resolve(
            loaderUtils.urlToRequest('bootstrap.scripts.loader.js')
          )
        )
      ) + '!'
    );
    const scripts = bootstrapScriptsLoader + dummySourceRel;

    result.push(createRequire(scripts));
  }

  const resultOutput = (
    result
      .map(loader => loader + '\n')
      .join('')
  );

  logger.debug('Requiring:', '\n', resultOutput);

  return resultOutput;
};
