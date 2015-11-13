/* eslint func-names: 0 */

import processModules from './utils/processModules';

module.exports = function() {
  if (this.cacheable) this.cacheable();

  const config = global.__BOOTSTRAP_CONFIG__;
  const {
    scripts,
    bootstrapVersion,
    bootstrapPath,
  } = config;

  return processModules(scripts, bootstrapVersion, bootstrapPath, true);
};
