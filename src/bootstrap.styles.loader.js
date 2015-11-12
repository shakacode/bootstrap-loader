/* eslint func-names: 0 */

import loaderUtils from 'loader-utils';

import processModules from './utils/processModules';
import getFontsPath from './utils/getFontsPath';
import createUserImport from './utils/createUserImport';
import createBootstrapImport from './utils/createBootstrapImport';

module.exports = function() {
  if (this.cacheable) this.cacheable();

  const query = loaderUtils.parseQuery(this.query);
  const bootstrapVersion = parseInt(query.bootstrapVersion, 10);
  const {
    styles,
    bootstrapPath,
    useFlexbox,
    preBootstrapCustomizations,
    bootstrapCustomizations,
  } = query;

  const processedStyles = [];

  if (bootstrapVersion === 4 && useFlexbox) {
    processedStyles.push('$enable-flex: true;');
  }

  if (preBootstrapCustomizations) {
    processedStyles.push(
      createUserImport(preBootstrapCustomizations, this)
    );
  }

  processedStyles.push(
    createBootstrapImport('variables', bootstrapVersion, bootstrapPath)
  );

  if (bootstrapVersion === 3) {
    processedStyles.push(
      `$icon-font-path: "${getFontsPath(bootstrapPath, this)}";`
    );
  }

  if (bootstrapCustomizations) {
    processedStyles.push(
      createUserImport(bootstrapCustomizations, this)
    );
  }

  return (
    processedStyles
      .join('\n')
      .concat(
        processModules(styles, bootstrapVersion, bootstrapPath)
      )
  );
};
