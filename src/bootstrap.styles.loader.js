/* eslint func-names: 0 */
import loaderUtils from 'loader-utils';

import config from './bootstrap.config';
import createBootstrapImport from './utils/createBootstrapImport';

module.exports = function() {
  if (this.cacheable) this.cacheable();

  const { bootstrapPath } = loaderUtils.parseQuery(this.query);

  // const useFlexbox = config.flexbox;

  const stylesModules = Object.keys(config.styles);

  return (
    stylesModules
      .filter(module => config.styles[module])
      .map(module => createBootstrapImport(module, bootstrapPath))
      .join('\n')
  );
};
