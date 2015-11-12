/* eslint func-names: 0 */
import loaderUtils from 'loader-utils';

import config from './bootstrap.config';
import createBootstrapRequire from './utils/createBootstrapRequire';

module.exports = function() {
  if (this.cacheable) this.cacheable();

  const { bootstrapPath } = loaderUtils.parseQuery(this.query);

  const scriptsModules = Object.keys(config.scripts);

  return (
    scriptsModules
      .filter(module => config.scripts[module])
      .map(module => createBootstrapRequire(module, bootstrapPath))
      .join('\n')
  );
};
