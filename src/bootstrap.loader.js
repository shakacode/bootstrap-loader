/* eslint func-names: 0 */

import loaderUtils from 'loader-utils';

import resolveModule from './utils/resolveModule';
import checkBootstrapVersion from './utils/checkBootstrapVersion';
import joinLoaders from './utils/joinLoaders';
import extractStylesLoader from './utils/extractStylesLoader';
import createLoader from './utils/createLoader';
import createRequire from './utils/createRequire';
import logger from './utils/logger';
import { bootstrapVersion, loglevel, createConfig } from './bootstrap.config';

module.exports = function() {};

module.exports.pitch = function(source) {
  if (!bootstrapVersion) {
    throw new Error(`
      I can't find Bootstrap version in your '.bootstraprc'.
      Make sure it's set to 3 or 4. Like this:
        bootstrapVersion: 4
    `);
  }

  if (this.cacheable) this.cacheable();

  global.__DEBUG__ = loglevel === 'debug' || process.env.DEBUG === '*';

  logger.debug(`Hey, we're in DEBUG mode! Yabba dabba doo!`);

  logger.debug('Usung Bootstrap version:', bootstrapVersion);

  // Resolve `bootstrap` package
  const bootstrapNPMModule = (
    bootstrapVersion === 3 ? 'bootstrap-sass' : 'bootstrap'
  );
  logger.debug('Usung Bootstrap module:', bootstrapNPMModule);

  const bootstrapPath = resolveModule(bootstrapNPMModule);

  if (!bootstrapPath) {
    throw new Error(`
      Could not find path to '${bootstrapNPMModule}' module.
      Make sure it's installed in your 'node_modules/' directory.
    `);
  }
  logger.debug(`Bootstrap module location:`, bootstrapPath);

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

  const config = createConfig({ bootstrapPath, extractStyles });
  logger.debug('Normalized params:', '\n', config);

  const result = [ createRequire(source) ];

  // Handle styles
  if (config.styles) {
    if (!config.styleLoaders) {
      throw new Error(`
        Could not find 'styleLoaders' in your config.
        You can use default ones:
          styleLoaders: ['style', 'css', 'scss']
      `);
    }
    const styleLoaders = (
      config.extractStyles ?
      extractStylesLoader(config.styleLoaders) :
      joinLoaders(config.styleLoaders)
    );
    const bootstrapLoader = createLoader('bootstrap.styles.loader', config);
    const styles = `${styleLoaders}${bootstrapLoader}${source}`;

    result.push(createRequire(styles));
  }

  // Handle scripts
  if (config.scripts) {
    const bootstrapLoader = createLoader('bootstrap.scripts.loader', config);
    const scripts = `${bootstrapLoader}${source}`;

    result.push(createRequire(scripts));
  }

  logger.debug('Requiring:', result);

  return result.join('\n');
};
