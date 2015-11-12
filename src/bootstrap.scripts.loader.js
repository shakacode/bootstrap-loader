/* eslint func-names: 0 */

import loaderUtils from 'loader-utils';

import processModules from './utils/processModules';

module.exports = function() {
  if (this.cacheable) this.cacheable();

  const {
    scripts,
    bootstrapVersion,
    bootstrapPath,
  } = loaderUtils.parseQuery(this.query);

  return processModules(scripts, bootstrapVersion, bootstrapPath, true);
};
