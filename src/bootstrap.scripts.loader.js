/* eslint func-names: 0 */
import loaderUtils from 'loader-utils';
import processModules from './utils/processModules';
import logger from './utils/logger';

/**
 * Bootstrap JS scripts loader
 *
 * @returns {string}
 */
module.exports = function() {
  if (this.cacheable) this.cacheable();

  logger.debug('Scripts input config:', '\n', this.query);

  const config = loaderUtils.getOptions(this) || {};
  const { scripts, bootstrapVersion, bootstrapRelPath } = config;

  const processedScripts = processModules(scripts, bootstrapVersion, bootstrapRelPath, true);

  const scriptsOutput = processedScripts.map(script => `${script}\n`).join('');

  logger.debug('Scripts output:', '\n', scriptsOutput);

  return scriptsOutput;
};
