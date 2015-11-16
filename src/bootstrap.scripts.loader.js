/* eslint func-names: 0 */

import processModules from './utils/processModules';
import logger from './utils/logger';

module.exports = function() {
  if (this.cacheable) this.cacheable();

  const config = global.__BOOTSTRAP_CONFIG__;
  const { scripts, bootstrapVersion, bootstrapRelPath } = config;

  const processedScripts = (
    processModules(scripts, bootstrapVersion, bootstrapRelPath, true)
  );

  const scriptsOutput = (
    processedScripts
      .map(script => script + '\n')
      .join('')
  );

  logger.debug('Scripts output:', '\n', scriptsOutput);

  return scriptsOutput;
};
